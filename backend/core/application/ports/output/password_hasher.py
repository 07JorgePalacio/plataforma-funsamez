from abc import ABC, abstractmethod

class PasswordHasher(ABC):
    @abstractmethod
    def hash(self, password: str) -> str:
        """Genera un hash seguro a partir de una contraseña en texto plano"""
        pass

    @abstractmethod
    def verify(self, password: str, hashed_password: str) -> bool:
        """Verifica si la contraseña coincide con el hash"""
        pass