import hashlib
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository

class LoginUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, email: str, password: str) -> User:
        # 1. Buscar usuario (El repo ya sabe buscar por 'correo_electronico')
        user = self.user_repository.get_by_email(email)
        
        if not user:
            raise ValueError("Credenciales inválidas")

        # 2. Verificar contraseña
        hashed_input = hashlib.sha256(password.encode()).hexdigest()

        # OJO: Aquí cambiamos user.password_hash por user.contrasena_hash
        if hashed_input != user.contrasena_hash:
            raise ValueError("Credenciales inválidas")

        if user.estado != 'activo':
            raise ValueError("El usuario está inactivo")

        return user