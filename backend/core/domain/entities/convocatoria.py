from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Convocatoria:
    titulo: str
    descripcion: str
    fecha_inicio: datetime
    fecha_fin: datetime
    cupos_disponibles: int
    id_usuario_creador: int
    id: Optional[int] = None
    estado: str = "abierta"
    habilidades_requeridas: str = "" 
    fecha_creacion: Optional[datetime] = None
    categorias: Optional[list] = None 
    horario: Optional[dict] = None

    def esta_activa(self) -> bool:
        ahora = datetime.now()
        return (
            self.estado == "abierta" and 
            self.fecha_inicio <= ahora <= self.fecha_fin and
            self.cupos_disponibles > 0
        )