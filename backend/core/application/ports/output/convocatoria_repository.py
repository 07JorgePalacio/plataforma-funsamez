from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.convocatoria import Convocatoria

class ConvocatoriaRepository(ABC):
    
    @abstractmethod
    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        pass

    @abstractmethod
    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        pass

    @abstractmethod
    def listar_todas(self) -> List[Convocatoria]:
        pass
    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        """Actualiza los campos especificados de una convocatoria"""
        pass
    
    @abstractmethod
    def eliminar(self, id: int) -> None:
        """Elimina una convocatoria por su ID"""
        pass