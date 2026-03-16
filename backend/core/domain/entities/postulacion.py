from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict

@dataclass
class Postulacion:
    """
    Entidad de Dominio: Postulación
    """
    # --- 1. Identificación ---
    id_usuario: int
    id_convocatoria: int
    id: Optional[int] = None
    
    # --- 2. Información Básica ---
    observaciones: Optional[str] = None
    motivo_rechazo: Optional[str] = None
    match_habilidades: Optional[int] = None
    match_disponibilidad: Optional[bool] = None 
    
    # --- 3. Estado ---
    estado: str = "en_revision"  # en_revision, aprobada, rechazada
    
    # --- 4. Tiempos ---
    fecha_postulacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None
    
    # --- 5. Historial (JSON) ---
    historial_estados: list = field(default_factory=list)