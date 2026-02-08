from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.container import Container
from core.adapters.api.rest.serializers import RegisterUserSerializer, LoginUserSerializer
from core.infrastructure.persistence.django.models import UsuarioModel

class RegisterUserView(APIView):
    def post(self, request):
        # 1. Validar formato de datos con el Serializer
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # --- VALIDACIONES DE INTEGRIDAD (UX) ---
            # Verificamos manualmente duplicados para devolver el error en el campo específico
            # y que el Frontend pueda poner el borde rojo al input correcto.
            
            repo = Container.get_user_repository()

            # A) Verificar Correo Duplicado
            if repo.get_by_email(data['email']):
                return Response(
                    {"email": ["Este correo electrónico ya está registrado."]}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # B) Verificar Cédula Duplicada
            if UsuarioModel.objects.filter(numero_identificacion=data['numero_identificacion']).exists():
                return Response(
                    {"numero_identificacion": ["Este número de identificación ya está registrado."]}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # 2. Ejecutar Caso de Uso (Si pasó las validaciones)
            use_case = Container.register_user_use_case()
            user = use_case.execute(
                nombre_completo=data['nombre_completo'],
                email=data['email'],
                password=data['password'],
                
                # Nuevos campos obligatorios
                tipo_documento=data['tipo_documento'],
                numero_identificacion=data['numero_identificacion'],
                fecha_nacimiento=data.get('fecha_nacimiento'),
                
                # Campos opcionales
                telefono=data.get('telefono'),
                direccion=data.get('direccion'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', [])
            )
            
            return Response({
                "message": "Voluntario registrado exitosamente",
                "user_id": user.id,
                "email": user.correo_electronico
            }, status=status.HTTP_201_CREATED)

        except ValueError as e:
            # Errores generales de negocio
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error registro: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginUserView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            use_case = Container.login_user_use_case()
            domain_user = use_case.execute(
                email=data['email'],
                password=data['password']
            )

            # Generar Token usando el modelo de Django
            user_model = UsuarioModel.objects.get(id=domain_user.id)
            refresh = RefreshToken.for_user(user_model)
            
            # Agregamos el rol al token para que el frontend sepa quién es
            refresh['role'] = domain_user.rol

            return Response({
                "message": "Inicio de sesión exitoso",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": domain_user.id,
                    "full_name": domain_user.nombre_completo,
                    "email": domain_user.correo_electronico,
                    "role": domain_user.rol
                }
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Credenciales inválidas
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"Error Login: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)