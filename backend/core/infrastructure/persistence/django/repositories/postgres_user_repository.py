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
                'disponibilidad': user.disponibilidad or {},
                'foto_perfil': user.foto_perfil
            }
        )
        return self._to_domain(usuario_model)

    def get_by_email(self, email: str) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(correo_electronico=email)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def obtener_por_id(self, id: int) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(id=id)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def actualizar(self, user_id: int, datos_actualizados: dict) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(id=user_id)

            for key, value in datos_actualizados.items():
                if hasattr(usuario_model, key):
                    setattr(usuario_model, key, value)
            usuario_model.save()
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def _to_domain(self, model: UsuarioModel) -> User:
        # Mapeo: Modelo Django -> Entidad (Estricto Orden Maestro)
        return User(
            nombre_completo=model.nombre_completo,
            correo_electronico=model.correo_electronico,
            contrasena_hash=model.password,
            tipo_documento=model.tipo_documento,
            numero_identificacion=model.numero_identificacion,
            fecha_nacimiento=str(model.fecha_nacimiento) if model.fecha_nacimiento else None,
            profesion=model.profesion,
            numero_telefono=model.numero_telefono,
            direccion=model.direccion,
            foto_perfil=model.foto_perfil,
            rol=model.rol,
            estado=model.estado,
            autenticacion_2fa_habilitada=model.autenticacion_2fa_habilitada,
            id=model.id,
            fecha_creacion=model.fecha_creacion,
            fecha_verificacion_correo=getattr(model, 'fecha_verificacion_correo', None),
            ultima_conexion=model.ultima_conexion,
            intereses=model.intereses or [],
            habilidades=model.habilidades or [],
            disponibilidad=model.disponibilidad or {}
        )