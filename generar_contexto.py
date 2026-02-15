import os
from datetime import datetime

# ==========================================
# ⚙️ CONFIGURACIÓN INTELIGENTE (SCALABLE)
# ==========================================
RUTAS_A_INCLUIR = [
    # --- 🐍 BACKEND (Infraestructura y Config) ---
    "backend/config/settings.py",
    "backend/config/urls.py",
    "backend/core/container.py",
    
    # --- 🐍 BACKEND (Lógica de Negocio - ESCANEO AUTOMÁTICO) ---
    "backend/core/domain/entities",
    "backend/core/application/ports/output",
    "backend/core/application/use_cases",
    
    # --- 🐍 BACKEND (Adaptadores y Base de Datos) ---
    "backend/core/infrastructure/persistence/django/models.py",
    "backend/core/infrastructure/persistence/django/repositories", 
    "backend/core/adapters/api/rest/serializers.py",
    "backend/core/adapters/api/rest/views", 
    "backend/core/adapters/api/urls.py",

    # --- ⚛️ FRONTEND (Core) ---
    "frontend/tailwind.config.js",
    "frontend/src/index.css",
    "frontend/src/App.jsx",
    "frontend/src/main.jsx",
    "frontend/src/context", 
    "frontend/src/services", 

    # --- ⚛️ FRONTEND (UI - ESCANEO AUTOMÁTICO) ---
    "frontend/src/pages",       
    "frontend/src/components",  
]

# Filtros: Solo leeremos estos tipos de archivo
EXTENSIONES_VALIDAS = {'.py', '.js', '.jsx', '.css', '.html'}

# Ignorar siempre estas carpetas
IGNORAR_CARPETAS = {'__pycache__', 'migrations', 'node_modules', 'dist', 'build', '.git'}

# ==========================================
# 🤖 LÓGICA DEL SCRIPT
# ==========================================

def generar_arbol(ruta_raiz, padding=""):
    """Genera el árbol visual de carpetas"""
    arbol = ""
    try:
        items = sorted(os.listdir(ruta_raiz))
    except PermissionError:
        return ""

    items_filtrados = [i for i in items if i not in IGNORAR_CARPETAS and i not in {'.venv', 'venv'}]
    
    for i, item in enumerate(items_filtrados):
        path = os.path.join(ruta_raiz, item)
        es_ultimo = (i == len(items_filtrados) - 1)
        conector = "└── " if es_ultimo else "├── "
        
        if os.path.isdir(path):
            arbol += f"{padding}{conector}{item}/\n"
            arbol += generar_arbol(path, padding + ("    " if es_ultimo else "│   "))
        else:
            arbol += f"{padding}{conector}{item}\n"
    return arbol

def leer_archivo(ruta):
    """Lee un archivo y devuelve su contenido formateado"""
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            contenido = f.read()
            ext = os.path.splitext(ruta)[1]
            lang = "python" if ext == ".py" else "javascript" if ext in [".js", ".jsx"] else "css" if ext == ".css" else "text"
            return f"### 📄 {ruta}\n```{lang}\n{contenido}\n```\n\n"
    except Exception as e:
        return f"> ⚠️ ERROR leyendo {ruta}: {e}\n\n"

def procesar_rutas(base_path):
    """Recorre la configuración y extrae el código"""
    resultado = ""  # <--- Variable definida aquí
    archivos_procesados = 0
    
    print("🔄 Escaneando rutas inteligentes...")

    for ruta_rel in RUTAS_A_INCLUIR:
        ruta_completa = os.path.join(base_path, ruta_rel)
        
        if not os.path.exists(ruta_completa):
            resultado += f"> ⚠️ NO ENCONTRADO: {ruta_rel}\n\n"
            print(f"   ❌ No existe: {ruta_rel}")
            continue

        # CASO 1: Es un archivo individual
        if os.path.isfile(ruta_completa):
            resultado += leer_archivo(ruta_rel)
            archivos_procesados += 1
        
        # CASO 2: Es una carpeta (MODO AUTOMÁTICO)
        elif os.path.isdir(ruta_completa):
            for root, dirs, files in os.walk(ruta_completa):
                # Filtrar carpetas ignoradas
                dirs[:] = [d for d in dirs if d not in IGNORAR_CARPETAS]
                
                for file in sorted(files):
                    if os.path.splitext(file)[1] in EXTENSIONES_VALIDAS:
                        # Reconstruir ruta relativa correcta
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, base_path).replace("\\", "/")
                        resultado += leer_archivo(rel_path)
                        archivos_procesados += 1

    return resultado, archivos_procesados  # <--- ¡CORREGIDO! Antes decía 'result'

def main():
    print("🤖 --- GENERADOR DE CONTEXTO INTELLIGENT (FUNSAMEZ) ---")
    
    cwd = os.getcwd()
    ruta_input = input(f"📂 Ruta del proyecto (Enter para '{cwd}'): ").strip()
    base_path = ruta_input if ruta_input else cwd

    if not os.path.exists(base_path):
        print("❌ Error: La ruta no existe.")
        return

    fecha = datetime.now().strftime("%Y-%m-%d_%H%M")
    nombre_archivo = f"CONTEXTO_FUNSAMEZ_{fecha}.md"
    output_path = os.path.join(base_path, nombre_archivo)

    # Procesar contenido
    contenido_codigo, total_archivos = procesar_rutas(base_path)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)\n")
        f.write(f"📅 Generado: {datetime.now()}\n")
        f.write(f"ℹ️ Modo: Escaneo Inteligente de Carpetas\n\n")
        
        f.write("## 1. ESTRUCTURA DE CARPETAS\n")
        f.write("```text\n")
        f.write(generar_arbol(base_path))
        f.write("```\n\n")

        f.write("## 2. CÓDIGO FUENTE SELECCIONADO\n\n")
        f.write(contenido_codigo)

    print(f"\n✅ ¡ÉXITO! Archivo generado: {nombre_archivo}")
    print(f"📊 Se incluyeron {total_archivos} archivos de código automáticamente.")

if __name__ == "__main__":
    main()