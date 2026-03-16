from rest_framework import serializers

class CampanaSerializer(serializers.Serializer):
    # --- 1. Identificación ---
    id = serializers.IntegerField(read_only=True)
    usuario_creador = serializers.IntegerField(read_only=True, source='id_usuario_creador', required=False)

    # --- 2. Información Básica ---
    titulo = serializers.CharField(max_length=255)
    descripcion = serializers.CharField(style={'base_template': 'textarea.html'})
    imagen_url = serializers.URLField(max_length=500, required=False, allow_blank=True, allow_null=True)

    # --- 3. Tiempos y Estado ---
    fecha_inicio = serializers.DateField(required=False)
    fecha_fin = serializers.DateField()
    estado = serializers.CharField(max_length=20, required=False)
    fecha_creacion = serializers.DateTimeField(read_only=True)
    fecha_actualizacion = serializers.DateTimeField(read_only=True)

    # --- 4. Financiero ---
    monto_objetivo = serializers.IntegerField(required=False, allow_null=True)
    recaudo_actual = serializers.IntegerField(read_only=True)
    permite_donacion_monetaria = serializers.BooleanField(default=True)
    permite_donacion_especie = serializers.BooleanField(default=True)

    # --- 5. Listas JSON ---
    objetivos = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    galeria_imagenes = serializers.ListField(child=serializers.URLField(), required=False, allow_empty=True)
    video_urls = serializers.ListField(child=serializers.URLField(), required=False, allow_empty=True)
    necesidades = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    categoria = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    tipo_impacto = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)

    # --- 6. Cálculos de Negocio (Enriquecidos en el Use Case) ---
    porcentaje_progreso = serializers.FloatField(read_only=True, required=False)
    dias_restantes = serializers.IntegerField(read_only=True, required=False)