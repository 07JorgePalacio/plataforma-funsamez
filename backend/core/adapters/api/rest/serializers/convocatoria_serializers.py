from rest_framework import serializers

class ConvocatoriaSerializer(serializers.Serializer):
    # --- 1. Identificación ---
    id = serializers.IntegerField(read_only=True)
    usuario_creador = serializers.IntegerField(read_only=True, source='id_usuario_creador', required=False)

    # --- 2. Información Básica ---
    titulo = serializers.CharField(max_length=255)
    descripcion = serializers.CharField(style={'base_template': 'textarea.html'}, required=False, allow_blank=True, allow_null=True)

    # --- 3. Logística ---
    ubicacion = serializers.CharField(max_length=255, required=False, allow_blank=True, allow_null=True)
    link_google_maps = serializers.URLField(max_length=500, required=False, allow_blank=True, allow_null=True)
    link_whatsapp = serializers.URLField(max_length=500, required=False, allow_blank=True, allow_null=True)
    modalidad = serializers.CharField(max_length=20, required=False)

    # --- 4. Tiempos y Cupos ---
    fecha_inicio = serializers.DateTimeField()
    fecha_fin = serializers.DateTimeField()
    cupos_disponibles = serializers.IntegerField(default=0)

    # --- 5. Estado ---
    estado = serializers.CharField(max_length=20, required=False)
    fecha_creacion = serializers.DateTimeField(read_only=True)

    # --- 6. Listas y JSON ---
    habilidades_requeridas = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    categorias = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)
    horario = serializers.DictField(required=False, allow_empty=True)
    beneficios = serializers.ListField(child=serializers.CharField(), required=False, allow_empty=True)

    # --- Cálculos de Negocio (Inyectados desde el Use Case o Repository) ---
    cupos_ocupados = serializers.IntegerField(read_only=True, required=False)
    dias_para_inicio = serializers.IntegerField(read_only=True, required=False)
    urgencia = serializers.CharField(read_only=True, required=False)
    porcentaje_cupos = serializers.FloatField(read_only=True, required=False)
    match_score = serializers.IntegerField(read_only=True, required=False)
    match_habilidades = serializers.IntegerField(read_only=True, required=False)
    match_disponibilidad = serializers.BooleanField(read_only=True, required=False)