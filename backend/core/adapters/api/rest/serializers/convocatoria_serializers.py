from rest_framework import serializers
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class ConvocatoriaSerializer(serializers.ModelSerializer):
    
    beneficios = serializers.ListField(
        child=serializers.CharField(), 
        required=False, 
        allow_empty=True
    )
    # Cálculos de Negocio (Inyectados desde el Use Case o Repository)
    cupos_ocupados = serializers.IntegerField(read_only=True)
    dias_para_inicio = serializers.IntegerField(read_only=True, required=False)
    urgencia = serializers.CharField(read_only=True, required=False)
    porcentaje_cupos = serializers.FloatField(read_only=True, required=False)
    match_score = serializers.IntegerField(read_only=True, required=False)
    match_habilidades = serializers.IntegerField(read_only=True, required=False)
    match_disponibilidad = serializers.BooleanField(read_only=True, required=False)
    
    class Meta:
        model = ConvocatoriaModel
        fields = [
            # 1. Identificación y Base
            'id', 'usuario_creador',
            'titulo', 'descripcion',
            'ubicacion', 'link_google_maps', 'link_whatsapp', 'modalidad', 
            # 2. Tiempos y Estado
            'fecha_inicio', 'fecha_fin', 'estado', 'fecha_creacion',
            # 3. Cupos y Requisitos
            'cupos_disponibles', 'habilidades_requeridas', 'categorias', 'horario', 'beneficios',
            # 4. Campos Calculados (Personalizados)
            'cupos_ocupados', 'dias_para_inicio', 'urgencia', 'porcentaje_cupos', 'match_score', 'match_habilidades', 'match_disponibilidad'
        ]
        read_only_fields = [
            'id', 'fecha_creacion', 'estado', 'usuario_creador', 
            'cupos_ocupados', 'dias_para_inicio', 'urgencia', 'porcentaje_cupos', 'match_score', 'match_habilidades', 'match_disponibilidad'
        ]