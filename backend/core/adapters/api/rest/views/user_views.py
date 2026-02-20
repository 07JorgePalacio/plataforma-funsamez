from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from core.container import Container
from core.adapters.api.rest.serializers.user_serializers import RegisterUserSerializer, LoginUserSerializer

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            user_entity = Container.register_user_use_case().execute(
                nombre_completo=data['nombre_completo'],
                email=data['email'],
                password=data['password'],
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                telefono=data.get('telefono'),
                direccion=data.get('direccion'),
                fecha_nacimiento=data.get('fecha_nacimiento'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', []),
                disponibilidad=data.get('disponibilidad', {})
            )

            return Response({
                "message": "Usuario registrado exitosamente",
                "user": {
                    "id": user_entity.id,
                    "full_name": user_entity.nombre_completo,
                    "email": user_entity.correo_electronico,
                    "role": user_entity.rol
                }
            }, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 1. Delegar TODA la lógica de negocio al Caso de Uso
            user_entity = Container.login_user_use_case().execute(
                email=data['email'],
                password=data['password']
            )

            # 2. Generar tokens JWT manualmente 
            refresh = RefreshToken()
            refresh['user_id'] = user_entity.id
            refresh['role'] = user_entity.rol

            return Response({
                "message": "Inicio de sesión exitoso",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": user_entity.id,
                    "full_name": user_entity.nombre_completo,
                    "email": user_entity.correo_electronico,
                    "role": user_entity.rol
                }
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Si el caso de uso lanza un ValueError por credenciales inválidas
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"❌ ERROR LOGIN: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)