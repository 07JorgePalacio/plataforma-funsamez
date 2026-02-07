from django.db import models
from django.utils import timezone

class UsuarioModel(models.Model):
    """
    Modelo de Infraestructura (Django ORM).
    Representa la tabla 'public.usuario' de la base de datos PostgreSQL.
    """
    
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('suspendido', 'Suspendido'),
    ]

    # 1. AGREGAR ESTO AQUÍ ARRIBA (LAS OPCIONES)
    TIPO_DOCUMENTO_CHOICES = [
        ('CC', 'Cédula de Ciudadanía'),
        ('TI', 'Tarjeta de Identidad'),
        ('CE', 'Cédula de Extranjería'),
        ('PPT', 'Permiso especial de permanencia'),
        ('PAS', 'Pasaporte'),
    ]
    # -------------------------------------------

    nombre_completo = models.CharField(max_length=100)
    correo_electronico = models.EmailField(unique=True, max_length=255)
    contrasena_hash = models.CharField(max_length=255)
    numero_telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    rol = models.CharField(max_length=20, default='voluntario')

    estado = models.CharField(
        max_length=20, 
        choices=ESTADO_CHOICES, 
        default='activo'
    )
    
    autenticacion_2fa_habilitada = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_verificacion_correo = models.DateTimeField(null=True, blank=True)
    ultima_conexion = models.DateTimeField(null=True, blank=True)
    
    # Campos del Perfil
    fecha_nacimiento = models.DateField(null=True, blank=True)
    
    # 2. AGREGAR ESTO AQUÍ (EL CAMPO NUEVO)
    tipo_documento = models.CharField(
        max_length=10, 
        choices=TIPO_DOCUMENTO_CHOICES, 
        default='CC'
    )
    # -------------------------------------------

    numero_identificacion = models.CharField(max_length=20, unique=True, null=True, blank=True)
    profesion = models.CharField(max_length=100, null=True, blank=True)
    
    # Listas guardadas como JSON
    intereses = models.JSONField(default=list, blank=True) 
    habilidades = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = 'usuario'
        managed = True 
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.correo_electronico