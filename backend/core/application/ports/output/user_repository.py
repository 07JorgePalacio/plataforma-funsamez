from abc import ABC, abstractmethod
from typing import Optional
from core.domain.entities.user import User

class UserRepository(ABC):
    """
    Puerto de Salida (Interface).
    Define el contrato que cualquier base de datos debe cumplir.
    La capa de Aplicación usará esta clase, no la implementación real de Django.
    """

    @abstractmethod
    def save(self, user: User) -> User:
        """
        Debe guardar un usuario (sea nuevo o existente) y devolverlo actualizado
        (por ejemplo, con el ID asignado por la DB).
        """
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        """
        Debe buscar un usuario por su email.
        Devuelve la entidad User si existe, o None si no.
        """
        pass
    
    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        """
        Debe buscar un usuario por su ID interno.
        """
        pass