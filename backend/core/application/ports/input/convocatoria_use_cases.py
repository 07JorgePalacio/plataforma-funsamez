from abc import ABC, abstractmethod
from typing import List
from core.domain.entities.convocatoria import Convocatoria

class CrearConvocatoriaInputPort(ABC):
    @abstractmethod
    def execute(self, **kwargs) -> Convocatoria: pass

class ListarConvocatoriasInputPort(ABC):
    @abstractmethod
    def execute(self, estado: str = None) -> List[Convocatoria]: pass

class ActualizarConvocatoriaInputPort(ABC):
    @abstractmethod
    def execute(self, id: int, datos: dict) -> Convocatoria: pass

class EliminarConvocatoriaInputPort(ABC):
    @abstractmethod
    def execute(self, id: int) -> None: pass