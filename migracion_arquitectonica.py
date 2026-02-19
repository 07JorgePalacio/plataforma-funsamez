#!/usr/bin/env python3
"""
🦅 SCRIPT DE MIGRACIÓN ARQUITECTÓNICA - FUNSAMEZ
Automatiza las tareas repetitivas de la refactorización

Autor: Claude - Arquitecto de Software Principal
Fecha: 19 de Febrero de 2026
"""

import os
import shutil
from pathlib import Path

# ==========================================
# CONFIGURACIÓN
# ==========================================
BACKEND_ROOT = Path("backend/core")

# ==========================================
# FASE 2: REORGANIZAR USE CASES
# ==========================================
def reorganizar_use_cases():
    """
    Mueve los archivos de use_cases a sus respectivas carpetas por módulo
    """
    print("🔄 FASE 2: Reorganizando Use Cases...")
    
    use_cases_root = BACKEND_ROOT / "application" / "use_cases"
    
    # Crear carpetas por módulo
    modulos = ["user", "campana", "convocatoria", "postulacion"]
    for modulo in modulos:
        modulo_path = use_cases_root / modulo
        modulo_path.mkdir(exist_ok=True)
        print(f"  ✅ Carpeta creada: {modulo_path}")
    
    # Mapa de archivos a mover
    movimientos = {
        # USERS
        "register_user.py": "user/register_user.py",
        "login_user.py": "user/login_user.py",
        
        # CAMPAÑAS
        "crear_campana.py": "campana/crear_campana.py",
        "actualizar_campana.py": "campana/actualizar_campana.py",
        "listar_campanas.py": "campana/listar_campanas.py",
        "eliminar_campana.py": "campana/eliminar_campana.py",
        
        # CONVOCATORIAS
        "crear_convocatoria.py": "convocatoria/crear_convocatoria.py",
        "actualizar_convocatoria.py": "convocatoria/actualizar_convocatoria.py",
        "listar_convocatorias.py": "convocatoria/listar_convocatorias.py",
        "eliminar_convocatoria.py": "convocatoria/eliminar_convocatoria.py",
        
        # POSTULACIONES
        "postular_voluntario.py": "postulacion/postular_voluntario.py",
        "listar_mis_postulaciones.py": "postulacion/listar_mis_postulaciones.py",
    }
    
    for origen, destino in movimientos.items():
        origen_path = use_cases_root / origen
        destino_path = use_cases_root / destino
        
        if origen_path.exists():
            shutil.move(str(origen_path), str(destino_path))
            print(f"  📦 Movido: {origen} → {destino}")
        else:
            print(f"  ⚠️  No encontrado: {origen}")
    
    print("✅ FASE 2 COMPLETADA\n")


# ==========================================
# FASE 3: ESTANDARIZAR MÉTODOS
# ==========================================
def estandarizar_metodos():
    """
    Cambia 'ejecutar' por 'execute' en todos los use cases
    """
    print("🔄 FASE 3: Estandarizando métodos (ejecutar → execute)...")
    
    use_cases_root = BACKEND_ROOT / "application" / "use_cases"
    
    # Buscar todos los archivos .py recursivamente
    archivos_py = list(use_cases_root.rglob("*.py"))
    
    for archivo in archivos_py:
        if archivo.name == "__init__.py":
            continue
            
        with open(archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
        
        # Buscar y reemplazar
        if "def ejecutar(" in contenido:
            nuevo_contenido = contenido.replace("def ejecutar(", "def execute(")
            
            with open(archivo, 'w', encoding='utf-8') as f:
                f.write(nuevo_contenido)
            
            print(f"  ✏️  Actualizado: {archivo.relative_to(BACKEND_ROOT)}")
    
    print("✅ FASE 3 COMPLETADA\n")


# ==========================================
# FASE 5: SEPARAR SERIALIZERS
# ==========================================
def separar_serializers():
    """
    Divide serializers.py en archivos separados por módulo
    """
    print("🔄 FASE 5: Separando serializers...")
    
    serializers_root = BACKEND_ROOT / "adapters" / "api" / "rest"
    serializers_dir = serializers_root / "serializers"
    
    # Crear carpeta serializers
    serializers_dir.mkdir(exist_ok=True)
    print(f"  ✅ Carpeta creada: {serializers_dir}")
    
    # Leer el archivo original
    original_file = serializers_root / "serializers.py"
    
    if not original_file.exists():
        print("  ⚠️  serializers.py no encontrado")
        return
    
    with open(original_file, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Extraer imports comunes
    imports_comunes = """from rest_framework import serializers
"""
    
    # ===== USER SERIALIZERS =====
    user_content = imports_comunes + """
class RegisterUserSerializer(serializers.Serializer):
    # 1. Credenciales y Datos Básicos
    nombre_completo = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)
    
    # 2. Identificación Personal (Obligatorios)
    tipo_documento = serializers.CharField(required=True, max_length=10)
    numero_identificacion = serializers.CharField(required=True, max_length=20)
    fecha_nacimiento = serializers.DateField(required=True)

    # 3. Datos de Contacto y Perfil (Opcionales)
    telefono = serializers.CharField(required=False, allow_blank=True)
    direccion = serializers.CharField(required=False, allow_blank=True)
    profesion = serializers.CharField(required=False, allow_blank=True)
    
    # 4. Listas (Arrays)
    intereses = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    habilidades = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    disponibilidad = serializers.DictField(required=False, allow_empty=True)

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
"""
    
    with open(serializers_dir / "user_serializers.py", 'w', encoding='utf-8') as f:
        f.write(user_content)
    print("  📝 Creado: user_serializers.py")
    
    # ===== CONVOCATORIA SERIALIZERS =====
    # (Se extraería del archivo original, pero por brevedad lo dejamos como ejemplo)
    
    # ===== CAMPANA SERIALIZERS =====
    # (Similar)
    
    # ===== POSTULACION SERIALIZERS =====
    # (Similar)
    
    # Crear __init__.py
    init_content = """from .user_serializers import RegisterUserSerializer, LoginUserSerializer
from .campana_serializers import CampanaSerializer
from .convocatoria_serializers import ConvocatoriaSerializer
from .postulacion_serializers import PostularVoluntarioSerializer

__all__ = [
    'RegisterUserSerializer',
    'LoginUserSerializer',
    'CampanaSerializer',
    'ConvocatoriaSerializer',
    'PostularVoluntarioSerializer',
]
"""
    
    with open(serializers_dir / "__init__.py", 'w', encoding='utf-8') as f:
        f.write(init_content)
    print("  📝 Creado: __init__.py")
    
    print("✅ FASE 5 COMPLETADA (parcial - revisar manualmente)\n")


# ==========================================
# SCRIPT PRINCIPAL
# ==========================================
def main():
    print("=" * 60)
    print("🦅 MIGRACIÓN ARQUITECTÓNICA - FUNSAMEZ")
    print("=" * 60)
    print()
    
    print("ADVERTENCIA: Este script modifica archivos.")
    print("Asegúrate de tener un backup (git commit) antes de continuar.")
    print()
    
    respuesta = input("¿Deseas continuar? (s/n): ")
    
    if respuesta.lower() != 's':
        print("❌ Operación cancelada.")
        return
    
    print()
    print("Iniciando migración...\n")
    
    # Ejecutar fases
    try:
        reorganizar_use_cases()
        estandarizar_metodos()
        # separar_serializers()  # Comentada porque requiere trabajo manual
        
        print("=" * 60)
        print("✅ MIGRACIÓN COMPLETADA")
        print("=" * 60)
        print()
        print("SIGUIENTE PASO:")
        print("1. Revisar los cambios con 'git diff'")
        print("2. Probar que todo funcione correctamente")
        print("3. Completar las fases restantes manualmente")
        print("4. Hacer commit: git commit -m 'Refactor: Arquitectura Hexagonal estandarizada'")
        
    except Exception as e:
        print(f"❌ ERROR: {e}")
        print("Revierte los cambios con 'git checkout .'")


if __name__ == "__main__":
    main()
