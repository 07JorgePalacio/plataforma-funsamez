from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.container import Container
from core.adapters.api.rest.serializers import CampanaSerializer

class CrearCampanaView(APIView):
    permission_classes = [IsAuthenticated] # Solo admins/usuarios logueados crean

    def post(self, request):
        # 1. Validar datos con Serializer
        serializer = CampanaSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            try:
                # 2. Llamar al Caso de Uso a través del Contenedor
                nueva_campana = Container.crear_campana_use_case.ejecutar(
                    titulo=data['titulo'],
                    descripcion=data['descripcion'],
                    fecha_inicio=data['fecha_inicio'],
                    fecha_fin=data['fecha_fin'],
                    id_usuario=request.user.id, # El usuario del token JWT
                    monto_objetivo=data['monto_objetivo'],
                    permite_monetaria=data['permite_donacion_monetaria'],
                    permite_especie=data['permite_donacion_especie'],
                    categoria=data.get('categoria', ''),
                    tipo_impacto=data.get('tipo_impacto', ''),
                    imagen_url=data.get('imagen_url', ''),
                    objetivos=data.get('objetivos', []),
                    galeria=data.get('galeria_imagenes', []),
                    necesidades=data.get('necesidades', [])
                )
                
                # 3. Responder
                return Response(
                    {"mensaje": "Campaña creada exitosamente", "id": nueva_campana.id},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListarCampanasView(APIView):
    permission_classes = [AllowAny] # Público (para que los donantes vean)

    def get(self, request):
        try:
            # 1. Llamar al Caso de Uso
            campanas = Container.listar_campanas_use_case.ejecutar()
            
            # 2. Serializar la lista de entidades
            serializer = CampanaSerializer(campanas, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DetalleCampanaView(APIView):
    permission_classes = [IsAuthenticated] # Solo admins editan/borran

    def put(self, request, pk):
        try:
            # Enviamos request.data directo al caso de uso
            # (Podríamos validar con serializer aquí también si queremos ser estrictos)
            campana_actualizada = Container.actualizar_campana_use_case.ejecutar(pk, request.data)
            
            # Devolvemos los datos actualizados
            serializer = CampanaSerializer(campana_actualizada)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_campana_use_case.ejecutar(pk)
            return Response({"mensaje": "Campaña eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)