# postgres_user_repository.py
from core.application.ports.output.user_repository import UserRepository
from core.domain.entities.user import User
from core.infrastructure.persistence.django.models import Usuario

class PostgresUserRepository(UserRepository):

    def save(self, user: User) -> User:
        usuario = Usuario.objects.create(
            nombre_completo=user.nombre_completo,
            correo_electronico=user.correo_electronico,
            contrasena_hash=user.contrasena_hash,
            estado=user.estado
        )
        user.id = usuario.id
        return user

    def find_by_email(self, email: str):
        try:
            u = Usuario.objects.get(correo_electronico=email)
            return User(
                id=u.id,
                nombre_completo=u.nombre_completo,
                correo_electronico=u.correo_electronico,
                contrasena_hash=u.contrasena_hash,
                estado=u.estado,
                fecha_creacion=u.fecha_creacion
            )
        except Usuario.DoesNotExist:
            return None
