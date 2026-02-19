from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict

@dataclass
class Postulacion:
    """
    Entidad de Dominio: Postulación
    Representa la solicitud de un voluntario para unirse a una convocatoria.
    """
    
    # --- 1. Identificación ---
    id: Optional[int] = None
    id_usuario: Optional[int] = None
    id_convocatoria: Optional[int] = None
    
    # --- 2. Información Básica ---
    observaciones: Optional[str] = None
    motivo_rechazo: Optional[str] = None
    
    # --- 3. Logística/Configuración ---
    estado: str = "en_revision"  # en_revision, aprobada, rechazada
    
    # --- 4. Tiempos ---
    fecha_postulacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None
    
    # --- 5. Listas y JSON ---
    # Trazabiliad de quien cambio el estado
    historial_estados: List[Dict] = field(default_factory=list)