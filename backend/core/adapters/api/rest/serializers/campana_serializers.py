from rest_framework import serializers
from core.infrastructure.persistence.django.models import CampanaModel

class CampanaSerializer(serializers.ModelSerializer):
    
    objetivos = serializers.ListField(
        child=serializers.CharField(), 
        required=False, 
        allow_empty=True
    )
    galeria_imagenes = serializers.ListField(
        child=serializers.URLField(), 
        required=False, 
        allow_empty=True
    )

    necesidades = serializers.ListField(
        child=serializers.CharField(), 
        required=False, 
        allow_empty=True
    )
    
    categoria = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        allow_empty=True
    )
    
    tipo_impacto = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        allow_empty=True
    )

    class Meta:
        model = CampanaModel
        fields = [
            # 1. Identificación
            'id', 'usuario_creador',
            # 2. Info Básica
            'titulo', 'descripcion', 'imagen_url',
            # 3. Tiempos y Estado
            'fecha_inicio', 'fecha_fin', 'estado', 'fecha_creacion', 'fecha_actualizacion',
            # 4. Financiero
            'monto_objetivo', 'recaudo_actual', 
            'permite_donacion_monetaria', 'permite_donacion_especie',
            # 5. Listas JSON
            'objetivos', 'galeria_imagenes', 'necesidades', 'categoria', 'tipo_impacto'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'usuario_creador', 'recaudo_actual']