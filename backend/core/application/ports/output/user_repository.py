from abc import ABC, abstractmethod
from typing import Optional
from src.domain.entities import Usuario

class UserRepository(ABC):
    
    @abstractmethod
    def guardar(self, usuario: Usuario) -> Usuario:
        """Guarda un usuario nuevo o actualiza uno existente"""
        pass

    @abstractmethod
    def buscar_por_email(self, email: str) -> Optional[Usuario]:
        """Busca un usuario por su correo electrónico"""
        pass
    
    @abstractmethod
    def buscar_por_id(self, id: int) -> Optional[Usuario]:
        """Busca un usuario por su ID"""
        pass