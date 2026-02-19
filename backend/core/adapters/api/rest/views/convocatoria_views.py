from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers import ConvocatoriaSerializer
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConvocatoriaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        
        try:
            nueva_convocatoria = Container.crear_convocatoria_use_case.ejecutar(
                # 1. Info Básica
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                # 2. Tiempos y Cupos
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id,
                # 3. Logística
                ubicacion=data.get('ubicacion', ''),
                link_whatsapp=data.get('link_whatsapp', ''),
                modalidad=data.get('modalidad', 'presencial'), 
                # 4. JSON/Listas
                habilidades=data.get('habilidades_requeridas', ''),
                categorias=data.get('categorias', []), 
                horario=data.get('horario', {}),
                beneficios=data.get('beneficios', []) 
            )

            response_data = {
                "id": nueva_convocatoria.id,
                "titulo": nueva_convocatoria.titulo,
                "mensaje": "Convocatoria creada exitosamente"
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarConvocatoriasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            convocatorias = Container.listar_convocatorias_use_case.ejecutar()
            serializer = ConvocatoriaSerializer(convocatorias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetalleConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        """Editar convocatoria completa"""
        try:
            # 1. BUSCAR INSTANCIA
            convocatoria_db = ConvocatoriaModel.objects.get(id=pk)

            # 2. Validar
            serializer = ConvocatoriaSerializer(instance=convocatoria_db, data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            datos_limpios = serializer.validated_data
            
            # 3. Caso de Uso
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case.ejecutar(pk, datos_limpios)
            
            response_serializer = ConvocatoriaSerializer(convocatoria_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
            
        except ConvocatoriaModel.DoesNotExist:
             return Response({"error": "Convocatoria no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """Cambio de estado puntual"""
        try:
            nuevo_estado = request.data.get('estado')
            if nuevo_estado not in ['abierta', 'pausada', 'cerrada']:
                return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)
            
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case.ejecutar(pk, {'estado': nuevo_estado})
            
            return Response({
                "mensaje": f"Estado actualizado a {nuevo_estado}",
                "estado": convocatoria_actualizada.estado
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_convocatoria_use_case.ejecutar(pk)
            return Response({"mensaje": "Convocatoria eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)