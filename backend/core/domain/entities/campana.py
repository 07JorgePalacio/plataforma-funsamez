from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional, List

@dataclass
class Campana:
    titulo: str
    descripcion: str
    fecha_inicio: datetime
    fecha_fin: date
    id_usuario_creador: int
    
    # Configuración de Donación
    monto_objetivo: int
    permite_donacion_monetaria: bool
    permite_donacion_especie: bool

    # Campos Lógicos
    id: Optional[int] = None
    recaudo_actual: int = 0
    imagen_url: str = ""     # FOTO PRINCIPAL (Portada)
    estado: str = "activa"
    fecha_creacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None

    # Campos listados
    objetivos: List[str] = field(default_factory=list) 
    galeria_imagenes: List[str] = field(default_factory=list)
    necesidades: List[str] = field(default_factory=list)
    categoria: List[str] = field(default_factory=list)
    tipo_impacto: List[str] = field(default_factory=list)

    @property
    def porcentaje_progreso(self) -> float:
        if self.monto_objetivo <= 0:
            return 0.0
        return min((self.recaudo_actual / self.monto_objetivo) * 100, 100.0)

    @property
    def dias_restantes(self) -> int:
        if not self.fecha_fin:
            return 0
        delta = self.fecha_fin - date.today()
        return max(delta.days, 0)