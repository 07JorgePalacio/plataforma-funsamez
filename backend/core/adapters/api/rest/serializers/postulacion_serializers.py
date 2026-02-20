from rest_framework import serializers

class PostularVoluntarioSerializer(serializers.Serializer):  
    # --- 1. Identificación ---
    # Lo envía React en el body cuando el usuario hace clic.
    id_convocatoria = serializers.IntegerField(required=True)
    
    # --- 2. Información Básica ---
    # Opcional, por si el frontend luego quiere enviar un comentario.
    observaciones = serializers.CharField(required=False, allow_blank=True)