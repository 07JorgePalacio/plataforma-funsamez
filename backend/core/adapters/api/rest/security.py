from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from core.infrastructure.persistence.django.models import UsuarioModel

class FunsamezJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        """
        Interpreta el token y busca al usuario en la tabla 'usuario' de PostgreSQL.
        """
        try:
            user_id = validated_token['user_id']
            # Buscamos en TU modelo
            user = UsuarioModel.objects.get(id=user_id)
            return user
        except UsuarioModel.DoesNotExist:
            raise AuthenticationFailed('Usuario no encontrado en BD Funsamez', code='user_not_found')