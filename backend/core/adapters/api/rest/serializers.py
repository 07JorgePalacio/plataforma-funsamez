from rest_framework import serializers
from core.infrastructure.persistence.django.models import ConvocatoriaModel
from core.infrastructure.persistence.django.models import CampanaModel

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
    disponibilidad = serializers.DictField(required=False, allow_empty=True)

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class ConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConvocatoriaModel
        fields = [
            'id', 'titulo', 'descripcion',
            'ubicacion', 'link_whatsapp',
            'fecha_inicio', 
            'fecha_fin', 'cupos_disponibles', 'estado', 
            'habilidades_requeridas', 'fecha_creacion', 'usuario_creador',
            'categorias', 'horario'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'estado', 'usuario_creador']

class CampanaSerializer(serializers.ModelSerializer):
    # Validamos que sean listas de texto
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

    class Meta:
        model = CampanaModel
        fields = [
            'id', 'titulo', 'descripcion', 'fecha_fin', 
            'monto_objetivo', 'recaudo_actual', 
            'imagen_url', 'objetivos', 'galeria_imagenes',
            'categoria', 'tipo_impacto',
            'permite_donacion_monetaria', 'permite_donacion_especie',
            'estado', 'usuario_creador', 'fecha_creacion'
        ]
        read_only_fields = ['id', 'fecha_creacion', 'usuario_creador', 'recaudo_actual']