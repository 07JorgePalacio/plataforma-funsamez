from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository
from core.application.ports.output.password_hasher import PasswordHasher
from core.domain.exceptions.user_exceptions import CredencialesInvalidasError, UsuarioInactivoError

class LoginUser:
    def __init__(self, user_repository: UserRepository, password_hasher: PasswordHasher):
        self.user_repository = user_repository
        self.password_hasher = password_hasher # 👈 Inyectamos la interface #TODO: Validación de contraseña desacoplada

    def execute(self, email: str, password: str) -> User:
        user = self.user_repository.get_by_email(email)
        
        if not user or not self.password_hasher.verify(password, user.contrasena_hash):
            raise CredencialesInvalidasError()

        if user.estado != 'activo':
            raise UsuarioInactivoError()

        return user