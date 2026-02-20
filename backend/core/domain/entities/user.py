from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime

@dataclass
class User:
    """
    Entidad de Dominio: Usuario
    """
    # 1. CAMPOS OBLIGATORIOS
    nombre_completo: str
    correo_electronico: str
    contrasena_hash: str

    # 2. CAMPOS OPCIONALES
    id: Optional[int] = None
    numero_telefono: Optional[str] = None
    direccion: Optional[str] = None
    
    rol: str = 'voluntario' 
    estado: str = 'activo'
    autenticacion_2fa_habilitada: bool = False
    
    fecha_creacion: Optional[datetime] = None
    ultima_conexion: Optional[datetime] = None
    fecha_nacimiento: Optional[str] = None
    tipo_documento: str = 'CC' 
    
    numero_identificacion: Optional[str] = None
    profesion: Optional[str] = None
    intereses: Optional[List[str]] = None
    habilidades: Optional[List[str]] = None
    disponibilidad: Optional[dict] = None