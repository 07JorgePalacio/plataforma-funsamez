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