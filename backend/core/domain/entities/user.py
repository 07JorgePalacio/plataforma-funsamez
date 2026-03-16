from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime

@dataclass
class User:
    """
    Entidad de Dominio: Usuario
    """
    # --- 1. Identificación y Credenciales ---
    nombre_completo: str
    correo_electronico: str
    contrasena_hash: str

    # --- 2. Información Personal ---
    tipo_documento: str = 'CC'
    numero_identificacion: Optional[str] = None
    fecha_nacimiento: Optional[str] = None
    profesion: Optional[str] = None

    # --- 3. Datos de Contacto ---
    numero_telefono: Optional[str] = None
    direccion: Optional[str] = None
    foto_perfil: Optional[str] = None

    # --- 4. Configuración y Estado ---
    rol: str = 'voluntario'
    estado: str = 'activo'
    autenticacion_2fa_habilitada: bool = False

    # --- 5. Metadatos y Tiempos ---
    id: Optional[int] = None
    fecha_creacion: Optional[datetime] = None
    fecha_verificacion_correo: Optional[datetime] = None
    ultima_conexion: Optional[datetime] = None

    # --- 6. Perfil del Voluntario (Listas/Dicts) ---
    intereses: Optional[List[str]] = None
    habilidades: Optional[List[str]] = None
    disponibilidad: Optional[dict] = None