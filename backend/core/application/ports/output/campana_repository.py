from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.campana import Campana

class CampanaRepository(ABC):
    """Puerto de Salida para la Entidad Campaña"""
    
    @abstractmethod
    def crear(self, campana: Campana) -> Campana:
        pass

    @abstractmethod
    def obtener_por_id(self, id: int) -> Optional[Campana]:
        pass

    @abstractmethod
    def obtener_todas(self) -> List[Campana]:
        pass

    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Campana:
        """Actualiza los campos especificados de una campaña"""
        pass

    @abstractmethod
    def eliminar(self, id: int) -> None:
        pass