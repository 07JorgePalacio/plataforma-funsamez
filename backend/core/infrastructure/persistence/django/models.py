from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# ==========================================
#  1. USUARIOS (AUTHENTICATION)
# ==========================================

class UsuarioManager(BaseUserManager):
    """Manager personalizado para UsuarioModel"""
    
    def create_user(self, correo_electronico, password=None, **extra_fields):
        if not correo_electronico:
            raise ValueError('El usuario debe tener un correo electrónico')
        
        correo_electronico = self.normalize_email(correo_electronico)
        user = self.model(correo_electronico=correo_electronico, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, correo_electronico, password=None, **extra_fields):
        extra_fields.setdefault('rol', 'administrador')
        extra_fields.setdefault('estado', 'activo')
        return self.create_user(correo_electronico, password, **extra_fields)

class UsuarioModel(AbstractBaseUser):
    """
    Modelo de Infraestructura (Django ORM).
    Representa la tabla 'public.usuario'.
    """
    
    # --- 1. Identificación y Credenciales ---
    nombre_completo = models.CharField(max_length=100)
    correo_electronico = models.EmailField(unique=True, max_length=255)
    # 'password' viene de AbstractBaseUser
    
    # --- 2. Información Personal ---
    TIPO_DOCUMENTO_CHOICES = [
        ('CC', 'Cédula de Ciudadanía'), ('TI', 'Tarjeta de Identidad'),
        ('CE', 'Cédula de Extranjería'), ('PPT', 'Permiso especial'), ('PAS', 'Pasaporte'),
    ]
    tipo_documento = models.CharField(max_length=10, choices=TIPO_DOCUMENTO_CHOICES, default='CC')
    numero_identificacion = models.CharField(max_length=20, unique=True, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    profesion = models.CharField(max_length=100, null=True, blank=True)

    # --- 3. Contacto ---
    numero_telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)

    # --- 4. Configuración y Estado ---
    rol = models.CharField(max_length=20, default='voluntario')
    ESTADO_CHOICES = [('activo', 'Activo'), ('inactivo', 'Inactivo'), ('suspendido', 'Suspendido')]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    autenticacion_2fa_habilitada = models.BooleanField(default=False)
    
    # --- 5. Tiempos ---
    fecha_creacion = models.DateTimeField(default=timezone.now)
    fecha_verificacion_correo = models.DateTimeField(null=True, blank=True)
    ultima_conexion = models.DateTimeField(null=True, blank=True)
    
    # --- 6. Listas y JSON ---
    intereses = models.JSONField(default=list, blank=True) 
    habilidades = models.JSONField(default=list, blank=True)
    disponibilidad = models.JSONField(default=dict, blank=True)

    # Configuración Django Auth
    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['nombre_completo']
    objects = UsuarioManager()

    @property
    def is_staff(self): return self.rol == 'administrador'
    @property
    def is_active(self): return self.estado == 'activo'
    def has_perm(self, perm, obj=None): return self.rol == 'administrador'
    def has_module_perms(self, app_label): return self.rol == 'administrador'

    class Meta:
        db_table = 'usuario'
        managed = True 
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self): return self.correo_electronico


# ==========================================
#  2. CONVOCATORIAS
# ==========================================

class ConvocatoriaModel(models.Model):
    """
    Modelo de Infraestructura. Tabla 'public.convocatoria'.
    """

    # --- 1. Identificación ---
    usuario_creador = models.ForeignKey(
        'UsuarioModel', 
        on_delete=models.CASCADE, 
        db_column='id_usuario_creador', 
        related_name='convocatorias_creadas'
    )

    # --- 2. Información Básica ---
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)

    # --- 3. Logística ---
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    link_whatsapp = models.URLField(max_length=500, blank=True, null=True)
    
    MODALIDAD_CHOICES = [('presencial', 'Presencial'), ('virtual', 'Virtual')]
    modalidad = models.CharField(max_length=20, choices=MODALIDAD_CHOICES, default='presencial')

    # --- 4. Tiempos y Cupos ---
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    cupos_disponibles = models.IntegerField(default=0)

    # --- 5. Estado ---
    ESTADOS = [('abierta', 'Abierta'), ('cerrada', 'Cerrada'), ('finalizada', 'Finalizada')]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='abierta')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    # --- 6. Listas y JSON ---
    habilidades_requeridas = models.TextField(blank=True, null=True)
    categorias = models.JSONField(default=list, blank=True) 
    horario = models.JSONField(default=dict, blank=True)
    beneficios = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = 'convocatoria'
        managed = True 


# ==========================================
#  3. CAMPAÑAS (DONACIONES)
# ==========================================

class CampanaModel(models.Model):
    """
    Modelo de Infraestructura. Tabla 'public.campana'.
    """

    # --- 1. Identificación ---
    usuario_creador = models.ForeignKey(
        UsuarioModel, 
        on_delete=models.CASCADE, 
        related_name="campanas"
    )
    
    # --- 2. Información Básica ---
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen_url = models.URLField(max_length=500, blank=True, null=True)

    # --- 3. Tiempos y Estado ---
    fecha_inicio = models.DateField(default=timezone.now)
    fecha_fin = models.DateField()
    
    ESTADOS = [
        ('activa', 'Activa'), ('pausada', 'Pausada'), 
        ('completada', 'Completada'), ('cancelada', 'Cancelada')
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='activa')
    
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    # --- 4. Financiero y Configuración ---
    monto_objetivo = models.BigIntegerField(null=True, blank=True)
    recaudo_actual = models.BigIntegerField(default=0)
    permite_donacion_monetaria = models.BooleanField(default=True)
    permite_donacion_especie = models.BooleanField(default=True)

    # --- 5. Listas y JSON ---
    objetivos = models.JSONField(default=list, blank=True) 
    galeria_imagenes = models.JSONField(default=list, blank=True)
    necesidades = models.JSONField(default=list, blank=True)
    categoria = models.JSONField(default=list, blank=True)
    tipo_impacto = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = 'campana'
        ordering = ['-fecha_creacion']

    def __str__(self):
        return self.titulo