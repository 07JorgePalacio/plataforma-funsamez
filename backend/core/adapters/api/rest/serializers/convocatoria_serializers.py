from rest_framework import serializers
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class ConvocatoriaSerializer(serializers.ModelSerializer):
    
    beneficios = serializers.ListField(
        child=serializers.CharField(), 
        required=False, 
        allow_empty=True
    )
    
    class Meta:
        model = ConvocatoriaModel
        fields = [
            # 1. Identificación
            'id', 'usuario_creador',
            # 2. Info Básica
            'titulo', 'descripcion',
            # 3. Logística
            'ubicacion', 'link_whatsapp', 'modalidad', 
            # 4. Tiempos y Cupos
            'fecha_inicio', 'fecha_fin', 'cupos_disponibles',
            # 5. Estado
            'estado', 'fecha_creacion',
            # 6. JSON/Listas
            'habilidades_requeridas', 'categorias', 'horario', 'beneficios'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'estado', 'usuario_creador']