from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.postulacion import Postulacion

class PostulacionRepository(ABC):
    """Puerto de Salida para la Entidad Postulación"""
    
    @abstractmethod
    def crear(self, postulacion: Postulacion) -> Postulacion:
        pass

    @abstractmethod
    def obtener_por_usuario_y_convocatoria(self, id_usuario: int, id_convocatoria: int) -> Optional[Postulacion]:
        pass

    @abstractmethod
    def listar_por_voluntario(self, id_usuario: int) -> List[Postulacion]:
        pass

    @abstractmethod
    def actualizar(self, postulacion: Postulacion) -> Postulacion:
        pass

    @abstractmethod
    def listar_todas(self) -> List[Postulacion]:
        """Obtiene todas las postulaciones del sistema (Para Admin)"""
        pass

    @abstractmethod
    def obtener_por_id(self, id_postulacion: int) -> Optional[Postulacion]:
        """Obtiene una postulación específica por su ID primario"""
        pass

    @abstractmethod
    def eliminar(self, id_postulacion: int) -> bool:
        """Elimina una postulación físicamente de la base de datos"""
        pass