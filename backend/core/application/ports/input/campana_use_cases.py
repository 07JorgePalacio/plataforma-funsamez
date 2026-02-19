from abc import ABC, abstractmethod
from typing import List
from core.domain.entities.campana import Campana

class CrearCampanaInputPort(ABC):
    @abstractmethod
    def execute(self, **kwargs) -> Campana: pass

class ListarCampanasInputPort(ABC):
    @abstractmethod
    def execute(self) -> List[Campana]: pass

class ActualizarCampanaInputPort(ABC):
    @abstractmethod
    def execute(self, id: int, datos: dict) -> Campana: pass

class EliminarCampanaInputPort(ABC):
    @abstractmethod
    def execute(self, id: int) -> None: pass