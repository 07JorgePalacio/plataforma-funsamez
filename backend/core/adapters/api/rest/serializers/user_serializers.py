from rest_framework import serializers

class RegisterUserSerializer(serializers.Serializer):
    # --- 1. Identificación y Credenciales ---
    nombre_completo = serializers.CharField(max_length=100)
    correo_electronico = serializers.EmailField()
    contrasena = serializers.CharField(min_length=8, write_only=True)
    
    # --- 2. Datos de Contacto ---
    numero_telefono = serializers.CharField(required=False, allow_blank=True)
    direccion = serializers.CharField(required=False, allow_blank=True)

    # --- 3. Perfil del Voluntario ---
    fecha_nacimiento = serializers.DateField(required=True)
    tipo_documento = serializers.CharField(required=True, max_length=10)
    numero_identificacion = serializers.CharField(required=True, max_length=20)
    profesion = serializers.CharField(required=False, allow_blank=True)
    intereses = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    habilidades = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    disponibilidad = serializers.DictField(required=False, allow_empty=True)

class LoginUserSerializer(serializers.Serializer):
    correo_electronico = serializers.EmailField()
    contrasena = serializers.CharField(write_only=True)

# ==========================================
#  SERIALIZADOR: ACTUALIZAR PERFIL
# ==========================================
class ActualizarPerfilSerializer(serializers.Serializer):
    # --- 1. Identificación y Credenciales ---
    nombre_completo = serializers.CharField(max_length=100, required=False, allow_null=True)
    
    # --- 2. Datos de Contacto ---
    numero_telefono = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    direccion = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    
    # --- 3. Perfil del Voluntario ---
    fecha_nacimiento = serializers.DateField(required=False, allow_null=True)
    tipo_documento = serializers.CharField(required=False, max_length=10, allow_null=True)
    numero_identificacion = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    profesion = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    intereses = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    habilidades = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    disponibilidad = serializers.DictField(required=False, allow_empty=True)