from dataclasses import dataclass
from typing import Optional
from datetime import datetime

@dataclass
class Notificacion:
    """
    Entidad de Dominio: Notificación
    """
    id_usuario: int
    titulo: str
    mensaje: str
    tipo: str = 'info'  # 'success', 'error', 'warning', 'info'
    
    id: Optional[int] = None
    referencia_id: Optional[int] = None
    leida: bool = False
    fecha_creacion: Optional[datetime] = None