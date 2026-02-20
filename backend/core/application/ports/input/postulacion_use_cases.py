from abc import ABC, abstractmethod
from typing import List
from core.domain.entities.postulacion import Postulacion

class PostularVoluntarioInputPort(ABC):
    @abstractmethod
    def execute(self, id_usuario: int, id_convocatoria: int, observaciones: str = "") -> Postulacion: pass

class ListarMisPostulacionesInputPort(ABC):
    @abstractmethod
    def execute(self, id_usuario: int) -> List[Postulacion]: pass