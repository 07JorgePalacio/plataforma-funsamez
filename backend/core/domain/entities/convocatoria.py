from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List, Dict, Any

@dataclass
class Convocatoria:
    # --- 1. Identificación ---
    id_usuario_creador: int
    id: Optional[int] = None

    # --- 2. Información Básica ---
    titulo: str = ""
    descripcion: str = ""

    # --- 3. Logística ---
    ubicacion: str = ""
    link_whatsapp: str = ""
    modalidad: str = "presencial" # 🟢 Parte del problema (Aseguramos default)

    # --- 4. Tiempos y Cupos ---
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    cupos_disponibles: int = 0

    # --- 5. Estado ---
    estado: str = "abierta"
    fecha_creacion: Optional[datetime] = None

    # --- 6. Listas y JSON (Al final por estándar) ---
    habilidades_requeridas: str = "" 
    categorias: List[str] = None 
    horario: Dict[str, Any] = None
    beneficios: List[str] = None # 🟢 Parte del problema (Aseguramos que exista el campo)

    def esta_activa(self) -> bool:
        ahora = datetime.now()
        if not self.fecha_inicio or not self.fecha_fin:
            return False
        return (
            self.estado == "abierta" and 
            self.fecha_inicio <= ahora <= self.fecha_fin and
            self.cupos_disponibles > 0
        )