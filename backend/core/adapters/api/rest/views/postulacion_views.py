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
            import traceback
            print("🔥 [DEBUG] ERROR CRÍTICO EN POSTULACIÓN:")
            traceback.print_exc()
            return Response({
                "error": "Ocurrió un error interno en el servidor.",
                "detalle_tecnico": str(e)
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

class ListarTodasPostulacionesView(APIView):
    """
    Vista (Controlador) para listar TODAS las postulaciones (Uso de Admin).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        caso_de_uso = Container.listar_todas_postulaciones_use_case
        
        try:
            postulaciones = caso_de_uso().execute()
            
            respuesta = []
            for post in postulaciones:
                respuesta.append({
                    "id": post.id,
                    "id_usuario": post.id_usuario,
                    "nombre_usuario": getattr(post, 'nombre_usuario', f"Voluntario #{post.id_usuario}"), 
                    "correo_usuario": getattr(post, 'correo_usuario', 'No registrado'),
                    "telefono_usuario": getattr(post, 'telefono_usuario', 'No registrado'),
                    "documento_usuario": getattr(post, 'documento_usuario', 'No registrado'),
                    "habilidades_usuario": getattr(post, 'habilidades_usuario', []),
                    "disponibilidad_usuario": getattr(post, 'disponibilidad_usuario', {}),
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
                "error": "Ocurrió un error al obtener las postulaciones.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CambiarEstadoPostulacionView(APIView):
    """
    Vista (Controlador) para que el Admin apruebe, rechace o ponga en espera una postulación.
    Usamos PATCH porque es una actualización parcial.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        nuevo_estado = request.data.get('estado')
        motivo_rechazo = request.data.get('motivo_rechazo', None)
        
        if not nuevo_estado:
            return Response({"error": "El campo 'estado' es obligatorio."}, status=status.HTTP_400_BAD_REQUEST)
            
        caso_de_uso = Container.cambiar_estado_postulacion_use_case
        
        try:
            post = caso_de_uso().execute(
                id_postulacion=pk,
                nuevo_estado=nuevo_estado,
                motivo_rechazo=motivo_rechazo
            )
            
            return Response({
                "mensaje": f"Estado actualizado a {post.estado}",
                "estado": post.estado
            }, status=status.HTTP_200_OK)
            
        except ValueError as e: # Captura PostulacionNoEncontradaError y validaciones de estado
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Error interno del servidor.", "detalle": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EliminarPostulacionView(APIView):
    """
    Vista (Controlador) para que el Admin elimine físicamente una postulación del historial.
    Usamos el método DELETE.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        caso_de_uso = Container.eliminar_postulacion_use_case
        
        try:
            caso_de_uso().execute(id_postulacion=pk)
            return Response({
                "mensaje": "La postulación fue eliminada del historial permanentemente."
            }, status=status.HTTP_200_OK)
            
        except ValueError as e: # Captura PostulacionNoEncontradaError
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error al intentar eliminar la postulación.", 
                "detalle": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)