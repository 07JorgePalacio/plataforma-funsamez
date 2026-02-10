from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

# Imports correctos
from core.container import Container
from core.adapters.api.rest.serializers import RegisterUserSerializer, LoginUserSerializer
from core.infrastructure.persistence.django.models import UsuarioModel

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # Crear usuario usando el manager
            user_model = UsuarioModel.objects.create_user(
                correo_electronico=data['email'],
                password=data['password'],  # ⬅️ set_password se llama automáticamente
                nombre_completo=data['full_name'],
                numero_telefono=data.get('phone_number'),
                direccion=data.get('address'),
                rol=data.get('role', 'voluntario'),
                fecha_nacimiento=data.get('fecha_nacimiento'),
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', [])
            )

            return Response({
                "message": "Usuario registrado exitosamente",
                "user": {
                    "id": user_model.id,
                    "full_name": user_model.nombre_completo,
                    "email": user_model.correo_electronico,
                    "role": user_model.rol
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"❌ ERROR REGISTRO: {e}")
            return Response({"error": "Error al crear el usuario"}, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 1. Buscar usuario en BD
            try:
                user_model = UsuarioModel.objects.get(correo_electronico=data['email'])
            except UsuarioModel.DoesNotExist:
                return Response({"non_field_errors": ["Credenciales inválidas"]}, status=status.HTTP_401_UNAUTHORIZED)
            
            # 2. Verificar contraseña usando check_password de Django
            if not user_model.check_password(data['password']):
                return Response({"non_field_errors": ["Credenciales inválidas"]}, status=status.HTTP_401_UNAUTHORIZED)

            # 3. Generar tokens JWT
            refresh = RefreshToken.for_user(user_model)
            refresh['role'] = user_model.rol

            return Response({
                "message": "Inicio de sesión exitoso",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": user_model.id,
                    "full_name": user_model.nombre_completo,
                    "email": user_model.correo_electronico,
                    "role": user_model.rol
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"❌ ERROR LOGIN: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)