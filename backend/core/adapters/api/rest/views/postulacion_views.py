from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers.postulacion_serializers import PostularVoluntarioSerializer

class PostularVoluntarioView(APIView):
    """
    Vista (Controlador) para postularse a una convocatoria.
    Es un coordinador tonto: recibe HTTP, limpia con serializer y llama al Caso de Uso.
    """
    
    # Exigimos que el usuario tenga un token JWT válido 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. El Serializer limpia y valida formatos (Entrada)
        serializer = PostularVoluntarioSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                "error": "Datos inválidos", 
                "detalles": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        datos_limpios = serializer.validated_data
        
        # 2. Extraemos información vital
        id_usuario = request.user.id  
        id_convocatoria = datos_limpios.get('id_convocatoria')
        observaciones = datos_limpios.get('observaciones', '')
        
        # 3. Llamamos al cerebro (Caso de Uso) a través del Container
        caso_de_uso = Container.postular_voluntario_use_case
        
        try:
            nueva_postulacion = caso_de_uso().execute(
                id_usuario=id_usuario,
                id_convocatoria=id_convocatoria,
                observaciones=observaciones
            )
            
            # 4. Respondemos al mundo
            return Response({
                "mensaje": "¡Te has postulado exitosamente a la convocatoria!",
                "postulacion_id": nueva_postulacion.id,
                "estado": nueva_postulacion.estado
            }, status=status.HTTP_201_CREATED)
            
        except ValueError as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno en el servidor."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class MisPostulacionesView(APIView):
    """
    Vista (Controlador) para listar las postulaciones del usuario logueado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id_usuario = request.user.id  # Extraemos el ID del token
        caso_de_uso = Container.listar_mis_postulaciones_use_case
        
        try:
            # Traemos la lista de Entidades Puras
            postulaciones = caso_de_uso().execute(id_usuario)
            
            # Formateamos la respuesta para el frontend
            respuesta = []
            for post in postulaciones:
                respuesta.append({
                    "id": post.id,
                    "id_convocatoria": post.id_convocatoria,
                    "estado": post.estado,
                    "fecha_postulacion": post.fecha_postulacion,
                    "observaciones": post.observaciones,
                    "motivo_rechazo": post.motivo_rechazo,
                    "historial_estados": post.historial_estados
                })
                
            return Response(respuesta, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al obtener tus postulaciones.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)