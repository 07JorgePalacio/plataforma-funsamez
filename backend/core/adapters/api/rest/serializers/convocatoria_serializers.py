from rest_framework import serializers
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class ConvocatoriaSerializer(serializers.ModelSerializer):
    
    beneficios = serializers.ListField(
        child=serializers.CharField(), 
        required=False, 
        allow_empty=True
    )
    cupos_ocupados = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = ConvocatoriaModel
        fields = [
            'id', 'usuario_creador',
            'titulo', 'descripcion',
            'ubicacion', 'link_google_maps', 'link_whatsapp', 'modalidad', 
            'fecha_inicio', 'fecha_fin', 'cupos_disponibles', 'cupos_ocupados',
            'estado', 'fecha_creacion',
            'habilidades_requeridas', 'categorias', 'horario', 'beneficios'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'estado', 'usuario_creador', 'cupos_ocupados']