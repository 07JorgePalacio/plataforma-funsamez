import json
import urllib.request
import urllib.error

# --- CONFIGURACIÓN ---
BASE_URL = "http://127.0.0.1:8000/api"
EMAIL = "admin@funsamez.org"
PASSWORD = "12345678" # <--- Asegúrate que sea la correcta

def color_print(msg, color="Blanco"):
    codes = {'Verde': '\033[92m', 'Rojo': '\033[91m', 'Amarillo': '\033[93m', 'Cyan': '\033[96m', 'Reset': '\033[0m'}
    print(f"{codes.get(color, '')}{msg}{codes['Reset']}")

def run_test():
    # 1. LOGIN
    color_print("\n1️⃣  Iniciando sesión...", "Cyan")
    login_data = json.dumps({"email": EMAIL, "password": PASSWORD}).encode("utf-8")
    
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/users/login/", 
            data=login_data, 
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req) as response:
            res_json = json.loads(response.read().decode())
            token = res_json['tokens']['access']
            color_print("✅ Login Exitoso.", "Verde")
            print(f"   Token: {token[:15]}...")
    except urllib.error.HTTPError as e:
        color_print(f"❌ Error Login: {e.read().decode()}", "Rojo")
        return

    # 2. CREAR CONVOCATORIA
    color_print("\n2️⃣  Creando Convocatoria...", "Cyan")
    conv_data = json.dumps({
        "titulo": "Campaña Visual CMD",
        "descripcion": "Prueba desde script Python",
        "fecha_inicio": "2026-09-01T08:00:00Z",
        "fecha_fin": "2026-09-01T16:00:00Z",
        "cupos_disponibles": 10,
        "habilidades_requeridas": "Python, Testing"
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            f"{BASE_URL}/convocatorias/crear/",
            data=conv_data,
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {token}'
            }
        )
        with urllib.request.urlopen(req) as response:
            res_json = json.loads(response.read().decode())
            color_print("🎉 ¡ÉXITO TOTAL!", "Verde")
            print(json.dumps(res_json, indent=2))
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        color_print(f"❌ Error al Crear ({e.code}):", "Rojo")
        print(error_body)

if __name__ == "__main__":
    run_test()