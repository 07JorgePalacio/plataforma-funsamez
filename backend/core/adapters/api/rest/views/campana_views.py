from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.container import Container
from core.adapters.api.rest.serializers.campana_serializers import CampanaSerializer

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
            nueva_campana = Container.crear_campana_use_case().execute(
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
            campanas = Container.listar_campanas_use_case().execute()
            serializer = CampanaSerializer(campanas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DetalleCampanaView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            # 1. VALIDAR DATOS (sin buscar la instancia)
            serializer = CampanaSerializer(data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            datos_limpios = serializer.validated_data

            # 2. EJECUTAR CASO DE USO (él se encarga de buscar y validar)
            campana_actualizada = Container.actualizar_campana_use_case().execute(pk, datos_limpios)
            
            # 3. SERIALIZAR RESPUESTA
            response_serializer = CampanaSerializer(campana_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        except ValueError as e:
            # El use case lanza ValueError si no encuentra la campaña
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_campana_use_case().execute(pk)
            return Response({"mensaje": "Campaña eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)