from rest_framework import serializers
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class RegisterUserSerializer(serializers.Serializer):
    # 1. Credenciales y Datos Básicos
    nombre_completo = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)
    
    # 2. Identificación Personal (Obligatorios)
    tipo_documento = serializers.CharField(required=True, max_length=10)
    numero_identificacion = serializers.CharField(required=True, max_length=20)
    fecha_nacimiento = serializers.DateField(required=True)

    # 3. Datos de Contacto y Perfil (Opcionales)
    telefono = serializers.CharField(required=False, allow_blank=True)
    direccion = serializers.CharField(required=False, allow_blank=True)
    profesion = serializers.CharField(required=False, allow_blank=True)
    
    # 4. Listas (Arrays)
    intereses = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )
    habilidades = serializers.ListField(
        child=serializers.CharField(), required=False, allow_empty=True
    )

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class ConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConvocatoriaModel
        fields = [
            'id', 'titulo', 'descripcion', 'fecha_inicio', 
            'fecha_fin', 'cupos_disponibles', 'estado', 
            'habilidades_requeridas', 'fecha_creacion', 'usuario_creador'  # ⬅️ AGREGAR
        ]
        read_only_fields = ['id', 'fecha_creacion', 'estado', 'usuario_creador']  # ⬅️ AGREGAR