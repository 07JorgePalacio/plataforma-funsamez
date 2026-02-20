from typing import Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository
from core.infrastructure.persistence.django.models import UsuarioModel

class PostgresUserRepository(UserRepository):
    def save(self, user: User) -> User:
        # Mapeo: Entidad -> Modelo Django
        usuario_model, created = UsuarioModel.objects.update_or_create(
            correo_electronico=user.correo_electronico,
            defaults={
                'nombre_completo': user.nombre_completo,
                'password': user.contrasena_hash,
                'numero_telefono': user.numero_telefono,
                'direccion': user.direccion,
                'rol': user.rol,
                'estado': user.estado,
                'autenticacion_2fa_habilitada': user.autenticacion_2fa_habilitada,
                'fecha_nacimiento': user.fecha_nacimiento,
                'tipo_documento': user.tipo_documento, 
                'numero_identificacion': user.numero_identificacion,
                'profesion': user.profesion,
                'intereses': user.intereses or [],
                'habilidades': user.habilidades or [],
                'disponibilidad': user.disponibilidad or {}
            }
        )
        return self._to_domain(usuario_model)

    def get_by_email(self, email: str) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(correo_electronico=email)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def get_by_id(self, id: int) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(id=id)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def _to_domain(self, model: UsuarioModel) -> User:
        # Mapeo: Modelo Django -> Entidad
        return User(
            id=model.id,
            nombre_completo=model.nombre_completo,
            correo_electronico=model.correo_electronico,
            contrasena_hash=model.password,
            numero_telefono=model.numero_telefono,
            direccion=model.direccion,
            rol=model.rol,
            estado=model.estado,
            autenticacion_2fa_habilitada=model.autenticacion_2fa_habilitada,
            fecha_creacion=model.fecha_creacion,
            ultima_conexion=model.ultima_conexion,
            
            # Campos Nuevos
            fecha_nacimiento=str(model.fecha_nacimiento) if model.fecha_nacimiento else None,
            tipo_documento=model.tipo_documento, 
            numero_identificacion=model.numero_identificacion,
            profesion=model.profesion,
            intereses=model.intereses,
            habilidades=model.habilidades,
            disponibilidad=model.disponibilidad
        )