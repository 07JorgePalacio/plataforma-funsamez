from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional, List

@dataclass
class Campana:
    # 1. Identificación
    id_usuario_creador: int
    id: Optional[int] = None

    # 2. Información Básica & Portada
    titulo: str = ""
    descripcion: str = ""
    imagen_url: str = "" # Foto Principal

    # 3. Tiempos y Estado
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[date] = None
    estado: str = "activa"
    fecha_creacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None

    # 4. Configuración Financiera / Donaciones
    monto_objetivo: int = 0
    recaudo_actual: int = 0
    permite_donacion_monetaria: bool = True
    permite_donacion_especie: bool = True

    # 5. Listas y JSON (Al final)
    objetivos: List[str] = field(default_factory=list) 
    galeria_imagenes: List[str] = field(default_factory=list)
    necesidades: List[str] = field(default_factory=list)
    categoria: List[str] = field(default_factory=list)
    tipo_impacto: List[str] = field(default_factory=list)