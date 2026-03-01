from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container

class ListarNotificacionesView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        id_usuario = request.user.id
        caso_de_uso = Container.listar_notificaciones_use_case
        
        try:
            notificaciones = caso_de_uso().execute(id_usuario)
            return Response(notificaciones, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al obtener las notificaciones.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MarcarNotificacionLeidaView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        caso_de_uso = Container.marcar_notificacion_leida_use_case
        
        try:
            caso_de_uso().execute(id_notificacion=pk)
            return Response({
                "mensaje": "Notificación marcada como leída."
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al actualizar la notificación.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EliminarNotificacionView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        caso_de_uso = Container.eliminar_notificacion_use_case
        
        try:
            caso_de_uso().execute(id_notificacion=pk)
            return Response({
                "mensaje": "Notificación eliminada exitosamente."
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al eliminar la notificación.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EliminarTodasNotificacionesView(APIView):
    """
    Vista (Controlador) para eliminar TODAS las notificaciones del usuario logueado.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        id_usuario = request.user.id
        caso_de_uso = Container.eliminar_todas_notificaciones_use_case
        
        try:
            cantidad = caso_de_uso().execute(id_usuario)
            return Response({
                "mensaje": f"Se eliminaron {cantidad} notificaciones exitosamente."
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al intentar vaciar las notificaciones.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)