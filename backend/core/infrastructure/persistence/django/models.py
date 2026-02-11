from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone

# --- CUSTOM USER MANAGER ---
class UsuarioManager(BaseUserManager):
    """Manager personalizado para UsuarioModel"""
    
    def create_user(self, correo_electronico, password=None, **extra_fields):
        """Crea y guarda un usuario regular"""
        if not correo_electronico:
            raise ValueError('El usuario debe tener un correo electrónico')
        
        correo_electronico = self.normalize_email(correo_electronico)
        user = self.model(correo_electronico=correo_electronico, **extra_fields)
        user.set_password(password)  # Esto hashea la contraseña
        user.save(using=self._db)
        return user
    
    def create_superuser(self, correo_electronico, password=None, **extra_fields):
        """Crea y guarda un superusuario"""
        extra_fields.setdefault('rol', 'administrador')
        extra_fields.setdefault('estado', 'activo')
        return self.create_user(correo_electronico, password, **extra_fields)


# --- USUARIO MODEL (MODIFICADO) ---
class UsuarioModel(AbstractBaseUser):  # ⬅️ CAMBIO AQUÍ: Hereda de AbstractBaseUser
    """
    Modelo de Infraestructura (Django ORM).
    Representa la tabla 'public.usuario' de la base de datos PostgreSQL.
    """
    
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('suspendido', 'Suspendido'),
    ]

    TIPO_DOCUMENTO_CHOICES = [
        ('CC', 'Cédula de Ciudadanía'),
        ('TI', 'Tarjeta de Identidad'),
        ('CE', 'Cédula de Extranjería'),
        ('PPT', 'Permiso especial de permanencia'),
        ('PAS', 'Pasaporte'),
    ]

    nombre_completo = models.CharField(max_length=100)
    correo_electronico = models.EmailField(unique=True, max_length=255)
    # contrasena_hash se reemplaza por password (campo de AbstractBaseUser)
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
    tipo_documento = models.CharField(
        max_length=10, 
        choices=TIPO_DOCUMENTO_CHOICES, 
        default='CC'
    )
    numero_identificacion = models.CharField(max_length=20, unique=True, null=True, blank=True)
    profesion = models.CharField(max_length=100, null=True, blank=True)
    
    # Listas guardadas como JSON
    intereses = models.JSONField(default=list, blank=True) 
    habilidades = models.JSONField(default=list, blank=True)

    # ⬇️ CONFIGURACIÓN REQUERIDA POR ABSTRACTBASEUSER ⬇️
    USERNAME_FIELD = 'correo_electronico'  # Campo que se usa para login
    REQUIRED_FIELDS = ['nombre_completo']  # Campos requeridos además del email
    
    objects = UsuarioManager()  # ⬅️ IMPORTANTE: Usar el manager personalizado
    
    # ⬇️ MÉTODOS REQUERIDOS POR DJANGO ADMIN ⬇️
    @property
    def is_staff(self):
        """Los administradores pueden acceder al admin de Django"""
        return self.rol == 'administrador'
    
    @property
    def is_active(self):
        """Usuario activo si su estado es 'activo'"""
        return self.estado == 'activo'
    
    def has_perm(self, perm, obj=None):
        """Los administradores tienen todos los permisos"""
        return self.rol == 'administrador'
    
    def has_module_perms(self, app_label):
        """Los administradores pueden ver todos los módulos"""
        return self.rol == 'administrador'

    class Meta:
        db_table = 'usuario'
        managed = True 
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.correo_electronico
    
    @property
    def contrasena_hash(self):
        """Alias para compatibilidad con código existente"""
        return self.password
    
    @contrasena_hash.setter
    def contrasena_hash(self, value):
        """Setter para compatibilidad con código existente"""
        self.password = value
    
class ConvocatoriaModel(models.Model):
    """
    Modelo de Infraestructura (Django ORM).
    Representa la tabla 'public.convocatoria' de la base de datos PostgreSQL.
    """

    usuario_creador = models.ForeignKey(
        'UsuarioModel', 
        on_delete=models.CASCADE, 
        db_column='id_usuario_creador', 
        related_name='convocatorias_creadas'
    )
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    cupos_disponibles = models.IntegerField(default=0)
    
    ESTADOS = [
        ('abierta', 'Abierta'),         
        ('cerrada', 'Cerrada'),
        ('finalizada', 'Finalizada'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='abierta')
    habilidades_requeridas = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'convocatoria'
        managed = True 