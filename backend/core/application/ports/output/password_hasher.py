from abc import ABC, abstractmethod

class PasswordHasher(ABC):
    @abstractmethod
    def verify(self, password: str, hashed_password: str) -> bool:
        """Verifica si la contraseña coincide con el hash"""
        pass