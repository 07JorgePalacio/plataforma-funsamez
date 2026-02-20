#!/usr/bin/env python3
"""
🦅 SCRIPT DE CORRECCIONES POST-CIRUGÍA - FUNSAMEZ
Aplica automáticamente las correcciones de los 6 errores críticos detectados

Autor: Claude - Arquitecto de Software Principal
Fecha: 19 de Febrero de 2026
"""

import os
from pathlib import Path

# ==========================================
# CONFIGURACIÓN
# ==========================================
BACKEND_ROOT = Path("backend/core")

# ==========================================
# CORRECCIÓN #1: Firmas de actualizar()
# ==========================================
def corregir_firma_actualizar_campana():
    """
    Cambia la firma del método actualizar en la interface
    de actualizar(campana: Campana) a actualizar(id: int, datos: dict)
    """
    print("🔧 CORRECCIÓN #1: Actualizando firma de actualizar() en campana_repository.py...")
    
    file_path = BACKEND_ROOT / "application" / "ports" / "output" / "campana_repository.py"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Buscar y reemplazar
    contenido_viejo = """    @abstractmethod
    def actualizar(self, campana: Campana) -> Campana:
        pass"""
    
    contenido_nuevo = """    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Campana:
        \"\"\"Actualiza los campos especificados de una campaña\"\"\"
        pass"""
    
    if contenido_viejo in contenido:
        contenido = contenido.replace(contenido_viejo, contenido_nuevo)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(contenido)
        
        print("  ✅ Firma actualizada correctamente")
    else:
        print("  ⚠️  No se encontró la firma exacta (posiblemente ya corregida)")


# ==========================================
# CORRECCIÓN #2: Agregar obtener_por_id()
# ==========================================
def agregar_obtener_por_id_campana():
    """
    Agrega el método obtener_por_id() faltante en PostgresCampanaRepository
    """
    print("🔧 CORRECCIÓN #2: Agregando obtener_por_id() en postgres_campana_repository.py...")
    
    file_path = BACKEND_ROOT / "infrastructure" / "persistence" / "django" / "repositories" / "postgres_campana_repository.py"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lineas = f.readlines()
    
    # Buscar la línea después del método crear (después de return self._to_domain(modelo))
    metodo_nuevo = """
    def obtener_por_id(self, id: int) -> Optional[Campana]:
        \"\"\"Obtiene una campaña por su ID\"\"\"
        try:
            modelo = CampanaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except CampanaModel.DoesNotExist:
            return None

"""
    
    # Buscar dónde insertar (después del método crear)
    for i, linea in enumerate(lineas):
        if "return self._to_domain(modelo)" in linea and i < 60:  # Dentro del método crear
            # Insertar después de esta línea
            lineas.insert(i + 1, metodo_nuevo)
            print("  ✅ Método obtener_por_id() agregado correctamente")
            break
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lineas)


# ==========================================
# CORRECCIÓN #3: Estandarizar nombres
# ==========================================
def estandarizar_nombres_metodos():
    """
    Cambia listar_todas() a obtener_todas() en la interface
    """
    print("🔧 CORRECCIÓN #3: Estandarizando nombres (listar_todas → obtener_todas)...")
    
    file_path = BACKEND_ROOT / "application" / "ports" / "output" / "campana_repository.py"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Reemplazar
    contenido = contenido.replace("def listar_todas(", "def obtener_todas(")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    print("  ✅ Nombres estandarizados correctamente")


# ==========================================
# CORRECCIÓN #4: Eliminar acceso a Models
# ==========================================
def corregir_vistas_campana():
    """
    Elimina el acceso directo a CampanaModel en las vistas
    """
    print("🔧 CORRECCIÓN #4: Corrigiendo acceso directo a Models en campana_views.py...")
    
    file_path = BACKEND_ROOT / "adapters" / "api" / "rest" / "views" / "campana_views.py"
    
    # Contenido correcto del método put
    metodo_put_correcto = '''    def put(self, request, pk):
        """Editar campaña con validación robusta"""
        try:
            # 1. VALIDAR DATOS (sin buscar la instancia)
            serializer = CampanaSerializer(data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            datos_limpios = serializer.validated_data

            # 2. EJECUTAR CASO DE USO (él se encarga de buscar y validar)
            campana_actualizada = Container.actualizar_campana_use_case().execute(pk, datos_limpios)
            
            # 3. SERIALIZAR RESPUESTA
            response_serializer = CampanaSerializer(campana_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        except ValueError as e:
            # El use case lanza ValueError si no encuentra la campaña
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
'''
    
    print("  ⚠️  CORRECCIÓN MANUAL REQUERIDA")
    print("     Reemplaza el método put() en campana_views.py (líneas 67-89)")
    print("     con el código corregido que está en el informe.")


def corregir_vistas_convocatoria():
    """
    Elimina el acceso directo a ConvocatoriaModel en las vistas
    """
    print("🔧 CORRECCIÓN #4b: Corrigiendo acceso directo a Models en convocatoria_views.py...")
    
    print("  ⚠️  CORRECCIÓN MANUAL REQUERIDA")
    print("     Reemplaza el método put() en convocatoria_views.py (líneas 68-90)")
    print("     con el código corregido que está en el informe.")


# ==========================================
# CORRECCIÓN #5: Completar interfaces
# ==========================================
def completar_interface_convocatoria():
    """
    Agrega los métodos faltantes en la interface de ConvocatoriaRepository
    """
    print("🔧 CORRECCIÓN #5: Completando interface de convocatoria_repository.py...")
    
    file_path = BACKEND_ROOT / "application" / "ports" / "output" / "convocatoria_repository.py"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Verificar si ya están los métodos
    if "def actualizar(" in contenido and "def eliminar(" in contenido:
        print("  ✅ Interface ya está completa")
        return
    
    # Agregar métodos faltantes antes del último pass
    metodos_nuevos = """
    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        \"\"\"Actualiza los campos especificados de una convocatoria\"\"\"
        pass
    
    @abstractmethod
    def eliminar(self, id: int) -> None:
        \"\"\"Elimina una convocatoria por su ID\"\"\"
        pass"""
    
    # Insertar antes del último pass
    contenido = contenido.rstrip()
    contenido += metodos_nuevos
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    print("  ✅ Métodos actualizar() y eliminar() agregados a la interface")


# ==========================================
# SCRIPT PRINCIPAL
# ==========================================
def main():
    print("=" * 70)
    print("🦅 CORRECCIONES POST-CIRUGÍA - FUNSAMEZ")
    print("=" * 70)
    print()
    
    print("ADVERTENCIA: Este script modifica archivos.")
    print("Asegúrate de tener un backup (git commit) antes de continuar.")
    print()
    
    respuesta = input("¿Deseas aplicar las correcciones automáticas? (s/n): ")
    
    if respuesta.lower() != 's':
        print("❌ Operación cancelada.")
        return
    
    print()
    print("Aplicando correcciones...\n")
    
    try:
        # Aplicar correcciones automáticas
        corregir_firma_actualizar_campana()
        agregar_obtener_por_id_campana()
        estandarizar_nombres_metodos()
        completar_interface_convocatoria()
        
        print()
        print("=" * 70)
        print("✅ CORRECCIONES AUTOMÁTICAS COMPLETADAS")
        print("=" * 70)
        print()
        print("⚠️  CORRECCIONES MANUALES PENDIENTES:")
        print()
        corregir_vistas_campana()
        print()
        corregir_vistas_convocatoria()
        print()
        print("=" * 70)
        print("📝 SIGUIENTE PASO:")
        print("1. Revisar los cambios con 'git diff'")
        print("2. Aplicar las correcciones manuales (vistas)")
        print("3. Probar que todo funcione correctamente")
        print("4. Hacer commit: git commit -m 'Fix: Correcciones post-cirugía arquitectónica'")
        
    except Exception as e:
        print(f"❌ ERROR: {e}")
        print("Revierte los cambios con 'git checkout .'")


if __name__ == "__main__":
    main()
