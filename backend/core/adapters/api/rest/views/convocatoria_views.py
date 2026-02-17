from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.container import Container
from core.adapters.api.rest.serializers import ConvocatoriaSerializer

# ⚠️ NOTA: Ya NO importamos ConvocatoriaModel. La vista es agnóstica a la BD.

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. Validación de Entrada (Input Validation)
        serializer = ConvocatoriaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 2. Delegación al Caso de Uso (Application Layer)
            nueva_convocatoria = Container.crear_convocatoria_use_case.ejecutar(
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id,
                habilidades=data.get('habilidades_requeridas', ''),
                ubicacion=data.get('ubicacion', ''),
                link_whatsapp=data.get('link_whatsapp', ''),
                categorias=data.get('categorias', []), 
                horario=data.get('horario', {})        
            )

            # 3. Respuesta
            response_data = {
                "id": nueva_convocatoria.id,
                "titulo": nueva_convocatoria.titulo,
                "mensaje": "Convocatoria creada exitosamente"
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            # Errores de Negocio (Ej: Fechas incoherentes)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"❌ Error Interno: {e}")
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarConvocatoriasView(APIView):
    permission_classes = [IsAuthenticated] # O AllowAny si quieres que sea pública

    def get(self, request):
        try:
            # 1. Llamar al Caso de Uso (Cerebro)
            # Ya no llamamos al repositorio directo, respetamos las capas.
            convocatorias = Container.listar_convocatorias_use_case.ejecutar()
            
            # 2. Serializar las Entidades de Dominio
            serializer = ConvocatoriaSerializer(convocatorias, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"❌ Error al listar: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetalleConvocatoriaView(APIView):
    """
    Maneja operaciones sobre una convocatoria específica usando Clean Architecture.
    """
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        """Editar convocatoria completa"""
        try:
            # Enviamos los datos crudos o validados al Caso de Uso de Actualizar
            # El caso de uso se encarga de llamar al repositorio
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case.ejecutar(pk, request.data)
            
            # Convertimos la Entidad de retorno a JSON
            serializer = ConvocatoriaSerializer(convocatoria_actualizada)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            # Si el ID no existe, el repo lanzará error (o podemos manejarlo más fino)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """Cambiar estado (pausar, publicar, cerrar)"""
        try:
            nuevo_estado = request.data.get('estado')
            if nuevo_estado not in ['abierta', 'pausada', 'cerrada']:
                return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)

            # Reutilizamos el Caso de Uso 'Actualizar' pasando solo el campo que cambió
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case.ejecutar(pk, {'estado': nuevo_estado})
            
            return Response({
                "mensaje": f"Estado actualizado a {nuevo_estado}",
                "estado": convocatoria_actualizada.estado
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Eliminar convocatoria"""
        try:
            # Delegamos la eliminación al Caso de Uso
            Container.eliminar_convocatoria_use_case.ejecutar(pk)
            return Response({"mensaje": "Convocatoria eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)