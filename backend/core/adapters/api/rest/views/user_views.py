from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import json
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from core.container import Container
from core.adapters.api.rest.serializers.user_serializers import RegisterUserSerializer, LoginUserSerializer, ActualizarPerfilSerializer
from core.domain.exceptions.user_exceptions import (
    EmailDuplicadoError,
    UsuarioMenorDeEdadError,
    FormatoEmailInvalidoError,
    CredencialesInvalidasError,
    UsuarioInactivoError,
    UsuarioNoEncontradoError
)

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
                email=data['correo_electronico'],
                password=data['contrasena'],
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                telefono=data.get('numero_telefono'),
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
                    "nombre_completo": user_entity.nombre_completo,
                    "correo_electronico": user_entity.correo_electronico,
                    "rol": user_entity.rol
                }
            }, status=status.HTTP_201_CREATED)

        # ==========================================
        #  CAPTURA DE EXCEPCIONES DE NEGOCIO
        # ==========================================
        except EmailDuplicadoError as e:
            # Atrapa el error de email duplicado y devuelve un 400
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        except UsuarioMenorDeEdadError as e:
            # Atrapa el error de minoría de edad y devuelve un 400
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        except FormatoEmailInvalidoError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as e:
            # Atrapa errores genéricos de validación (ej. formato de email inválido)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(f"❌ ERROR REGISTRO: {e}")
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
                email=data['correo_electronico'],
                password=data['contrasena']
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
                    "nombre_completo": user_entity.nombre_completo,
                    "correo_electronico": user_entity.correo_electronico,
                    "rol": user_entity.rol,
                    "numero_telefono": user_entity.numero_telefono,
                    "numero_identificacion": user_entity.numero_identificacion,
                    "profesion": user_entity.profesion,
                    "direccion": user_entity.direccion,
                    "fecha_nacimiento": str(user_entity.fecha_nacimiento) if user_entity.fecha_nacimiento else None,
                    "tipo_documento": user_entity.tipo_documento,
                    "intereses": user_entity.intereses or [],
                    "habilidades": user_entity.habilidades or [],
                    "disponibilidad": user_entity.disponibilidad or {},
                    "foto_perfil": user_entity.foto_perfil
                }
            }, status=status.HTTP_200_OK)

        except (CredencialesInvalidasError, UsuarioInactivoError) as e:
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_401_UNAUTHORIZED)
        except ValueError as e:
            # Fallback de seguridad
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"❌ ERROR LOGIN: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ==========================================
#  VISTA: ACTUALIZAR PERFIL
# ==========================================
class ActualizarPerfilView(APIView):
    permission_classes = [IsAuthenticated] # 🔒 Protegido: Solo usuarios logueados
    parser_classes = [MultiPartParser, FormParser, JSONParser] # 📂 Permite recibir FormData e Imágenes

    def patch(self, request):
        # 1. Extraemos los datos a un diccionario mutable (Adaptador manejando HTTP)
        data = request.data.dict() if hasattr(request.data, 'dict') else request.data.copy()

        # 2. Deserializamos el JSON string de disponibilidad a un diccionario real
        if 'disponibilidad' in data and isinstance(data['disponibilidad'], str):
            try:
                data['disponibilidad'] = json.loads(data['disponibilidad'])
            except json.JSONDecodeError:
                data['disponibilidad'] = {}

        # 3. Recuperamos las listas completas (FormData solo guarda el último elemento por defecto)
        if hasattr(request.data, 'getlist'):
            if 'intereses' in request.data:
                data['intereses'] = request.data.getlist('intereses')
            if 'habilidades' in request.data:
                data['habilidades'] = request.data.getlist('habilidades')

        # 4. Sanitización: Convertir strings vacíos en None (Evita errores en DateFields y otros)
        for key, value in data.items():
            if value == "" or value == "null" or value == "undefined":
                data[key] = None

        # 5. Validamos con los datos ya limpios
        serializer = ActualizarPerfilSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Extraemos el ID del usuario directamente del token JWT por seguridad
            user_id = request.user.id 
            
            user_entity = Container.actualizar_perfil_usuario_use_case().execute(
                user_id=user_id,
                datos_actualizados=serializer.validated_data
            )

            return Response({
                "message": "Perfil actualizado exitosamente",
                "user": {
                    "id": user_entity.id,
                    "nombre_completo": user_entity.nombre_completo,
                    "correo_electronico": user_entity.correo_electronico,
                    "rol": user_entity.rol,
                    "numero_telefono": user_entity.numero_telefono,
                    "numero_identificacion": user_entity.numero_identificacion,
                    "profesion": user_entity.profesion,
                    "direccion": user_entity.direccion,
                    "fecha_nacimiento": str(user_entity.fecha_nacimiento) if user_entity.fecha_nacimiento else None,
                    "tipo_documento": user_entity.tipo_documento,
                    "intereses": user_entity.intereses or [],
                    "habilidades": user_entity.habilidades or [],
                    "disponibilidad": user_entity.disponibilidad or {},
                    "foto_perfil": user_entity.foto_perfil
                }
            }, status=status.HTTP_200_OK)

        except UsuarioNoEncontradoError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"❌ ERROR ACTUALIZAR PERFIL: {e}")
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)