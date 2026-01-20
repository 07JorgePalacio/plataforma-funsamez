# core/domain/entities/user.py
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class User:
    id: Optional[int]
    nombre_completo: str
    correo_electronico: str
    contrasena_hash: str
    estado: str = "activo"
    fecha_creacion: Optional[datetime] = None
