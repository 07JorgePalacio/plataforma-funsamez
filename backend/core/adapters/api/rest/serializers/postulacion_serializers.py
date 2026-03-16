from rest_framework import serializers

class PostularVoluntarioSerializer(serializers.Serializer):  
    # --- 1. Identificación ---
    id_convocatoria = serializers.IntegerField(required=True)
    
    # --- 2. Información Básica ---
    observaciones = serializers.CharField(required=False, allow_blank=True)

class PostulacionResponseSerializer(serializers.Serializer):
    """
    DTO Puro (Data Transfer Object).
    Documenta la estructura exacta que el Use Case orquesta y envía al Frontend.
    Cero acoplamiento con la Base de Datos.
    """
    # --- 1. Identificación y Foráneos ---
    id = serializers.IntegerField()
    id_usuario = serializers.IntegerField()
    id_convocatoria = serializers.IntegerField()
    titulo_convocatoria = serializers.CharField()
    nombre_usuario = serializers.CharField()
    correo_usuario = serializers.EmailField()
    telefono_usuario = serializers.CharField()
    documento_usuario = serializers.CharField()
    habilidades_usuario = serializers.ListField(child=serializers.CharField())
    disponibilidad_usuario = serializers.DictField()
    
    # --- 2. Datos Propios ---
    observaciones = serializers.CharField(allow_null=True)
    motivo_rechazo = serializers.CharField(allow_null=True)
    match_habilidades = serializers.IntegerField(allow_null=True)
    match_disponibilidad = serializers.BooleanField(allow_null=True)
    estado = serializers.CharField()
    fecha_postulacion = serializers.DateTimeField()
    fecha_actualizacion = serializers.DateTimeField(allow_null=True)
    historial_estados = serializers.ListField()
    
    # --- 3. Datos Calculados ---
    estado_convocatoria = serializers.CharField()
    es_activa = serializers.BooleanField()