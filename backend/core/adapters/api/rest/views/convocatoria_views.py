from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers import ConvocatoriaSerializer

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConvocatoriaSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            nueva_convocatoria = Container.crear_convocatoria_use_case.ejecutar(
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id,
                habilidades=data.get('habilidades_requeridas', '')
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
            print(f"❌ Error Interno: {e}") # Dejamos un print pequeño por si acaso
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarConvocatoriasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # 1. Pedimos todas las convocatorias al repositorio
            convocatorias = Container.convocatoria_repository.listar_todas()
            
            # 2. Las empaquetamos en una lista de diccionarios para el Frontend
            data = []
            for c in convocatorias:
                data.append({
                    "id": c.id,
                    "titulo": c.titulo,
                    "descripcion": c.descripcion,
                    "fecha_inicio": c.fecha_inicio.isoformat() if c.fecha_inicio else None,
                    "fecha_fin": c.fecha_fin.isoformat() if c.fecha_fin else None,
                    "cupos_disponibles": c.cupos_disponibles,
                    "estado": c.estado,
                    "habilidades_requeridas": c.habilidades_requeridas,
                    "fecha_creacion": c.fecha_creacion.isoformat() if c.fecha_creacion else None
                })
                
            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"❌ Error al listar convocatorias: {e}")
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)