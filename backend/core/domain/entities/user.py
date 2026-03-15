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
    rol: str = 'voluntario'
    estado: str = 'activo'
    
    # --- 2. Datos de Contacto ---
    numero_telefono: Optional[str] = None
    direccion: Optional[str] = None
    
    # --- 3. Perfil del Voluntario ---
    fecha_nacimiento: Optional[str] = None
    tipo_documento: str = 'CC'
    numero_identificacion: Optional[str] = None
    profesion: Optional[str] = None
    intereses: Optional[List[str]] = None
    habilidades: Optional[List[str]] = None
    disponibilidad: Optional[dict] = None
    foto_perfil: Optional[str] = None
    
    # --- 4. Seguridad y Metadatos ---
    id: Optional[int] = None
    autenticacion_2fa_habilitada: bool = False
    fecha_creacion: Optional[datetime] = None
    ultima_conexion: Optional[datetime] = None