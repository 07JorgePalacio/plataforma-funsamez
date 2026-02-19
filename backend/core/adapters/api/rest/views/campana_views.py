from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.container import Container
from core.adapters.api.rest.serializers import CampanaSerializer
from core.infrastructure.persistence.django.models import CampanaModel

class CrearCampanaView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        # 1. Validar entrada
        serializer = CampanaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        data = serializer.validated_data
        
        try:
            # 2. Ejecutar Caso de Uso con datos limpios
            nueva_campana = Container.crear_campana_use_case.ejecutar(
                # Básicos
                titulo=data['titulo'],
                descripcion=data['descripcion'],
                # Tiempos
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                # Identificación
                id_usuario=request.user.id,
                # Financiero
                monto_objetivo=data.get('monto_objetivo', 0),
                permite_monetaria=data.get('permite_donacion_monetaria', True),
                permite_especie=data.get('permite_donacion_especie', True),
                # Listas / JSON
                imagen_url=data.get('imagen_url', ''),
                categoria=data.get('categoria', []),
                tipo_impacto=data.get('tipo_impacto', []),
                objetivos=data.get('objetivos', []),
                galeria=data.get('galeria_imagenes', []),
                necesidades=data.get('necesidades', [])
            )
            
            return Response(
                {"mensaje": "Campaña creada exitosamente", "id": nueva_campana.id},
                status=status.HTTP_201_CREATED
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarCampanasView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        try:
            campanas = Container.listar_campanas_use_case.ejecutar()
            serializer = CampanaSerializer(campanas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DetalleCampanaView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        """Editar convocatoria completa con validación robusta"""
        try:
            # 1. BUSCAR LA INSTANCIA
            campana_db = CampanaModel.objects.get(id=pk)
            
            # 2. VALIDAR
            serializer = CampanaSerializer(instance=campana_db, data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            datos_limpios = serializer.validated_data

            # 3. EJECUTAR CASO DE USO
            campana_actualizada = Container.actualizar_campana_use_case.ejecutar(pk, datos_limpios)
            
            response_serializer = CampanaSerializer(campana_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        except CampanaModel.DoesNotExist:
            return Response({"error": "Campaña no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_campana_use_case.ejecutar(pk)
            return Response({"mensaje": "Campaña eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)