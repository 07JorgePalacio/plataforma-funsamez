import os
from datetime import datetime

# --- CONFIGURACIÓN: LA LISTA DE ORO (Actualizada con Módulo Convocatorias) ---
ARCHIVOS_CLAVE = [
    # 🐍 BACKEND - CONFIGURACIÓN GLOBAL
    "backend/config/settings.py",
    "backend/config/urls.py",
    "backend/core/container.py",               # <--- Modificado (Inyección de dependencias)

    # 🐍 BACKEND - DOMINIO (ENTIDADES)
    "backend/core/domain/entities/user.py",
    "backend/core/domain/entities/convocatoria.py",  # <--- NUEVO

    # 🐍 BACKEND - PUERTOS (INTERFACES)
    "backend/core/application/ports/output/user_repository.py",
    "backend/core/application/ports/output/convocatoria_repository.py", # <--- NUEVO

    # 🐍 BACKEND - CASOS DE USO (LÓGICA)
    "backend/core/application/use_cases/register_user.py",
    "backend/core/application/use_cases/login_user.py",
    "backend/core/application/use_cases/crear_convocatoria.py", # <--- NUEVO

    # 🐍 BACKEND - INFRAESTRUCTURA (BASE DE DATOS)
    "backend/core/infrastructure/persistence/django/models.py", # <--- Modificado (Tabla Convocatoria)
    "backend/core/infrastructure/persistence/django/repositories/postgres_user_repository.py",
    "backend/core/infrastructure/persistence/django/repositories/postgres_convocatoria_repository.py", # <--- NUEVO

    # 🐍 BACKEND - API REST (ADAPTADORES)
    "backend/core/adapters/api/rest/serializers.py", # <--- Modificado (Serializer Convocatoria)
    "backend/core/adapters/api/rest/views/user_views.py",
    "backend/core/adapters/api/rest/views/convocatoria_views.py", # <--- NUEVO
    "backend/core/adapters/api/urls.py",             # <--- Modificado (Rutas API)

    # ⚛️ FRONTEND - CONFIGURACIÓN Y ESTILOS
    "frontend/tailwind.config.js",
    "frontend/src/index.css",
    "frontend/src/App.jsx",

    # ⚛️ FRONTEND - PÁGINAS (VISTAS)
    "frontend/src/pages/LoginPage.jsx",
    "frontend/src/pages/RegisterPage.jsx",
    "frontend/src/pages/DashboardPage.jsx",

    # ⚛️ FRONTEND - COMPONENTES (DASHBOARDS)
    "frontend/src/components/AdminDashboard.jsx",
    "frontend/src/components/VolunteerDashboard.jsx",
]

# Carpetas a ignorar para el árbol visual
IGNORE_DIRS = {'node_modules', '.git', '__pycache__', 'venv', '.venv', 'dist', 'build', '.idea', '.vscode'}

def generar_arbol(ruta_raiz, padding=""):
    arbol = ""
    try:
        items = sorted(os.listdir(ruta_raiz))
    except PermissionError:
        return ""

    # Separar carpetas y archivos para ordenar visualmente
    items_filtrados = [i for i in items if i not in IGNORE_DIRS]
    
    for i, item in enumerate(items_filtrados):
        ruta_completa = os.path.join(ruta_raiz, item)
        es_ultimo = (i == len(items_filtrados) - 1)
        conector = "└── " if es_ultimo else "├── "
        
        if os.path.isdir(ruta_completa):
            arbol += f"{padding}{conector}{item}/\n"
            arbol += generar_arbol(ruta_completa, padding + ("    " if es_ultimo else "│   "))
        else:
            # Opcional: Solo mostrar archivos relevantes en el árbol para no saturar
            arbol += f"{padding}{conector}{item}\n"
            
    return arbol

def main():
    print("🤖 --- GENERADOR DE CONTEXTO FUNSAMEZ (SPRINT 2 - Convocatorias) ---")
    
    ruta_input = input(f"📂 Ruta del proyecto (Enter para usar '{os.getcwd()}'): ").strip()
    base_path = ruta_input if ruta_input else os.getcwd()

    if not os.path.exists(base_path):
        print("❌ Error: La ruta no existe.")
        return

    fecha = datetime.now().strftime("%Y-%m-%d_%H%M")
    nombre_archivo = f"CONTEXTO_FUNSAMEZ_{fecha}.md"
    output_path = os.path.join(base_path, nombre_archivo)

    print("🔄 Leyendo archivos...")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)\n")
        f.write(f"📅 Generado: {datetime.now()}\n\n")
        
        # 1. ÁRBOL DE CARPETAS
        f.write("## 1. ESTRUCTURA DE CARPETAS ACTUAL\n")
        f.write("```text\n")
        f.write(generar_arbol(base_path))
        f.write("```\n\n")

        # 2. CONTENIDO DE ARCHIVOS
        f.write("## 2. CÓDIGO FUENTE (ARCHIVOS CLAVE)\n\n")
        
        encontrados = 0
        faltantes = 0

        for archivo_rel in ARCHIVOS_CLAVE:
            ruta_completa = os.path.join(base_path, archivo_rel)
            
            if os.path.exists(ruta_completa):
                f.write(f"### 📄 {archivo_rel}\n")
                ext = archivo_rel.split('.')[-1]
                lang = "python" if ext == "py" else "javascript" if ext in ["js", "jsx"] else "css" if ext == "css" else "text"
                
                f.write(f"```{lang}\n")
                try:
                    with open(ruta_completa, 'r', encoding='utf-8') as source:
                        f.write(source.read())
                except Exception as e:
                    f.write(f"Error leyendo: {e}")
                f.write("\n```\n\n")
                encontrados += 1
            else:
                faltantes += 1
                f.write(f"> ⚠️ NO ENCONTRADO: {archivo_rel}\n\n")

    print(f"\n✅ LISTO: {nombre_archivo}")
    print(f"📊 Archivos procesados: {encontrados} | Faltantes: {faltantes}")

if __name__ == "__main__":
    main()