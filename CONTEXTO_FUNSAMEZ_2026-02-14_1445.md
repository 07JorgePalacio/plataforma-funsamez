# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)
📅 Generado: 2026-02-14 14:45:37.591360
ℹ️ Modo: Escaneo Inteligente de Carpetas

## 1. ESTRUCTURA DE CARPETAS
```text
├── .gitignore
├── CONTEXTO_FUNSAMEZ_2026-02-14_1445.md
├── README.md
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── adapters/
│   │   │   ├── __init__.py
│   │   │   ├── api/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── rest/
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── security.py
│   │   │   │   │   ├── serializers.py
│   │   │   │   │   └── views/
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── convocatoria_views.py
│   │   │   │   │       └── user_views.py
│   │   │   │   └── urls.py
│   │   │   └── cli/
│   │   │       └── __init__.py
│   │   ├── application/
│   │   │   ├── __init__.py
│   │   │   ├── ports/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── input/
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   └── user_use_cases.py
│   │   │   │   └── output/
│   │   │   │       ├── __init__.py
│   │   │   │       ├── convocatoria_repository.py
│   │   │   │       └── user_repository.py
│   │   │   └── use_cases/
│   │   │       ├── crear_convocatoria.py
│   │   │       ├── login_user.py
│   │   │       └── register_user.py
│   │   ├── container.py
│   │   ├── domain/
│   │   │   ├── __init__.py
│   │   │   ├── entities/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── convocatoria.py
│   │   │   │   └── user.py
│   │   │   ├── exceptions/
│   │   │   │   └── __init__.py
│   │   │   └── value_objects/
│   │   │       └── __init__.py
│   │   └── infrastructure/
│   │       ├── external_services/
│   │       │   └── __init__.py
│   │       └── persistence/
│   │           ├── __init__.py
│   │           └── django/
│   │               ├── __init__.py
│   │               ├── apps.py
│   │               ├── models.py
│   │               └── repositories/
│   │                   ├── __init__.py
│   │                   ├── postgres_convocatoria_repository.py
│   │                   └── postgres_user_repository.py
│   └── manage.py
├── docs/
├── frontend/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── TimePickerMD3.jsx
│   │   │   └── VolunteerDashboard.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── AdminConvocationsPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── services/
│   │       └── convocatoriaService.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── generar_contexto.py
└── probar_todo.py
```

## 2. CÓDIGO FUENTE SELECCIONADO

### 📄 backend/config/settings.py
```python
"""
Django settings for plataforma_funsamez project.
"""

from pathlib import Path
import os
from datetime import timedelta

# 1. BASE_DIR: Calculamos la ruta raíz (backend/)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# 2. SEGURIDAD
SECRET_KEY = 'django-insecure-tu-clave-secreta-cambiala-en-produccion'
DEBUG = True
ALLOWED_HOSTS = []

# 3. APLICACIONES INSTALADAS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Local apps (infraestructura real)
    'core.infrastructure.persistence.django.apps.PersistenceConfig', 
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 4. RUTAS PRINCIPALES
ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# 5. BASE DE DATOS (PostgreSQL)
# OJO: Cambia la contraseña 'tu_contraseña' por la que pusiste en pgAdmin4
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'funsamez_db',    
        'USER': 'postgres',        
        'PASSWORD': '123456', 
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# 6. VALIDACIÓN DE CONTRASEÑAS
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 7. IDIOMA Y ZONA HORARIA (Colombia)
LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

# 8. ARCHIVOS ESTÁTICOS (CSS, JS, Imágenes)
STATIC_URL = 'static/'

# Tipo de campo para claves primarias
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Modelo de Usuario Personalizado (para JWT)
AUTH_USER_MODEL = 'persistence.UsuarioModel'  # Apunta a tu modelo personalizado

# --- CONFIGURACIÓN DE LIBRERÍAS EXTERNAS ---

# CONFIGURACIÓN DE DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    
}

# CONFIGURACIÓN DE JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),  # El token dura 1 día (para desarrollo)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7), # La renovación dura 7 días
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',), # Así se enviará desde React: "Bearer <token>"
}

# PERMITIR QUE REACT SE CONECTE
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

# --- AJUSTE DE FECHAS ---
REST_FRAMEWORK['DATETIME_INPUT_FORMATS'] = [
    '%Y-%m-%dT%H:%M:%SZ',  # Formato con Z (PowerShell)
    '%Y-%m-%dT%H:%M:%S',   # Formato ISO estándar
    '%Y-%m-%d %H:%M:%S',   # Formato clásico
    'iso-8601',
]
```

### 📄 backend/config/urls.py
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Conectamos nuestras rutas de adaptadores aquí:
    path('api/', include('core.adapters.api.urls')),
]
```

### 📄 backend/core/container.py
```python
from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.application.use_cases.register_user import RegisterUser
from core.application.use_cases.login_user import LoginUser
from core.infrastructure.persistence.django.repositories.postgres_convocatoria_repository import PostgresConvocatoriaRepository
from core.application.use_cases.crear_convocatoria import CrearConvocatoriaUseCase

class Container:
    """
    Contenedor de Inyección de Dependencias (Manual).
    Aquí se ensamblan las piezas de la arquitectura.
    Actúa como una 'Fábrica' de casos de uso.
    """
    
    # 1. Instanciamos el Repositorio Concreto (Infraestructura)
    # Como PostgresUserRepository no tiene estado, podemos usar una misma instancia.
    _user_repository = PostgresUserRepository()

    @staticmethod
    def get_user_repository():
        return Container._user_repository

    @staticmethod
    def register_user_use_case() -> RegisterUser:
        """
        Fabrica el Caso de Uso 'Registrar Usuario' inyectándole el repositorio real.
        """
        return RegisterUser(user_repository=Container._user_repository)
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        """
        Fabrica el Caso de Uso 'Login' inyectándole el repositorio.
        """
        return LoginUser(user_repository=Container._user_repository)
    
    # --- Módulo de Convocatorias ---
    
    # 1. Instanciamos el Repositorio (Infraestructura)
    convocatoria_repository = PostgresConvocatoriaRepository()

    # 2. Inyectamos el Repositorio en el Caso de Uso (Aplicación)
    crear_convocatoria_use_case = CrearConvocatoriaUseCase(repository=convocatoria_repository)
```

### 📄 backend/core/domain/entities/__init__.py
```python

```

### 📄 backend/core/domain/entities/convocatoria.py
```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Convocatoria:
    titulo: str
    descripcion: str
    fecha_inicio: datetime
    fecha_fin: datetime
    cupos_disponibles: int
    id_usuario_creador: int
    ubicacion: str = "" 
    link_whatsapp: str = ""
    id: Optional[int] = None
    estado: str = "abierta"
    habilidades_requeridas: str = "" 
    fecha_creacion: Optional[datetime] = None
    categorias: Optional[list] = None 
    horario: Optional[dict] = None

    def esta_activa(self) -> bool:
        ahora = datetime.now()
        return (
            self.estado == "abierta" and 
            self.fecha_inicio <= ahora <= self.fecha_fin and
            self.cupos_disponibles > 0
        )
```

### 📄 backend/core/domain/entities/user.py
```python
from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime

@dataclass
class User:
    """
    Entidad de Dominio: Usuario
    """
    # 1. CAMPOS OBLIGATORIOS
    nombre_completo: str
    correo_electronico: str
    contrasena_hash: str

    # 2. CAMPOS OPCIONALES
    id: Optional[int] = None
    numero_telefono: Optional[str] = None
    direccion: Optional[str] = None
    
    rol: str = 'voluntario' 
    estado: str = 'activo'
    autenticacion_2fa_habilitada: bool = False
    
    fecha_creacion: Optional[datetime] = None
    ultima_conexion: Optional[datetime] = None
    fecha_nacimiento: Optional[str] = None
    tipo_documento: str = 'CC' 
    
    numero_identificacion: Optional[str] = None
    profesion: Optional[str] = None
    intereses: Optional[List[str]] = None
    habilidades: Optional[List[str]] = None
    disponibilidad: Optional[dict] = None

    def check_password(self, raw_password: str) -> bool:
        return False
```

### 📄 backend/core/application/ports/output/__init__.py
```python

```

### 📄 backend/core/application/ports/output/convocatoria_repository.py
```python
from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.convocatoria import Convocatoria

class ConvocatoriaRepository(ABC):
    
    @abstractmethod
    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        pass

    @abstractmethod
    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        pass

    @abstractmethod
    def listar_todas(self) -> List[Convocatoria]:
        pass
```

### 📄 backend/core/application/ports/output/user_repository.py
```python
from abc import ABC, abstractmethod
from typing import Optional
from core.domain.entities.user import User

class UserRepository(ABC):
    """
    Puerto de Salida (Interface).
    Define el contrato que cualquier base de datos debe cumplir.
    La capa de Aplicación usará esta clase, no la implementación real de Django.
    """

    @abstractmethod
    def save(self, user: User) -> User:
        """
        Debe guardar un usuario (sea nuevo o existente) y devolverlo actualizado
        (por ejemplo, con el ID asignado por la DB).
        """
        pass

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        """
        Debe buscar un usuario por su email.
        Devuelve la entidad User si existe, o None si no.
        """
        pass
    
    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        """
        Debe buscar un usuario por su ID interno.
        """
        pass
```

### 📄 backend/core/application/use_cases/crear_convocatoria.py
```python
from datetime import datetime
from core.domain.entities.convocatoria import Convocatoria
from typing import List, Dict, Any
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def ejecutar(self, titulo: str, descripcion: str, fecha_inicio: datetime, 
                 fecha_fin: datetime, cupos: int, id_usuario: int, habilidades: str,
                 ubicacion: str = "", link_whatsapp: str = "",
                 categorias: List[str] = None, horario: Dict[str, Any] = None) -> Convocatoria:
        
        if fecha_inicio >= fecha_fin:
            raise ValueError("La fecha de inicio debe ser anterior a la fecha de fin.")
            
        if cupos <= 0:
            raise ValueError("Debe haber al menos 1 cupo disponible.")

        # 2. Crear la Entidad
        nueva_convocatoria = Convocatoria(
            id=None, # Se genera en BD
            titulo=titulo,
            descripcion=descripcion,
            ubicacion=ubicacion,
            link_whatsapp=link_whatsapp,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos,
            id_usuario_creador=id_usuario,
            habilidades_requeridas=habilidades,
            categorias=categorias or [],
            horario=horario or {}        
        )

        # 3. Persistir usando el Puerto
        return self.repository.crear(nueva_convocatoria)
```

### 📄 backend/core/application/use_cases/login_user.py
```python
import hashlib
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository

class LoginUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, email: str, password: str) -> User:
        # 1. Buscar usuario (El repo ya sabe buscar por 'correo_electronico')
        user = self.user_repository.get_by_email(email)
        
        if not user:
            raise ValueError("Credenciales inválidas")

        # 2. Verificar contraseña
        hashed_input = hashlib.sha256(password.encode()).hexdigest()

        # OJO: Aquí cambiamos user.password_hash por user.contrasena_hash
        if hashed_input != user.contrasena_hash:
            raise ValueError("Credenciales inválidas")

        if user.estado != 'activo':
            raise ValueError("El usuario está inactivo")

        return user
```

### 📄 backend/core/application/use_cases/register_user.py
```python
import hashlib
from typing import List, Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository

class RegisterUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, 
                nombre_completo: str, 
                email: str, 
                password: str, 
                tipo_documento: str,
                numero_identificacion: str, 
                telefono: Optional[str] = None, 
                direccion: Optional[str] = None,
                fecha_nacimiento: Optional[str] = None, 
                profesion: Optional[str] = None, 
                intereses: List[str] = None, 
                habilidades: List[str] = None,
                disponibilidad: dict = None  
                ) -> User:
        
        # 1. Verificar si el CORREO ya existe
        if self.user_repository.get_by_email(email):
            raise ValueError("El correo electrónico ya está registrado")

        # 2. Hashear contraseña
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # 3. Crear Entidad
        new_user = User(
            nombre_completo=nombre_completo,
            correo_electronico=email,
            contrasena_hash=hashed_password,
            numero_telefono=telefono,
            direccion=direccion,
            rol="voluntario",
            
            # Campos de perfil
            fecha_nacimiento=fecha_nacimiento,
            tipo_documento=tipo_documento,       
            numero_identificacion=numero_identificacion,
            profesion=profesion,
            intereses=intereses or [],
            habilidades=habilidades or [],
            disponibilidad=disponibilidad or {} 
        )

        # 4. Guardar
        return self.user_repository.save(new_user)
```

### 📄 backend/core/infrastructure/persistence/django/models.py
```python
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


# --- USUARIO MODEL ---
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
    disponibilidad = models.JSONField(default=dict, blank=True)

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
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    link_whatsapp = models.URLField(max_length=500, blank=True, null=True)
    
    ESTADOS = [
        ('abierta', 'Abierta'),         
        ('cerrada', 'Cerrada'),
        ('finalizada', 'Finalizada'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='abierta')
    habilidades_requeridas = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    # Listas guardadas como JSON
    categorias = models.JSONField(default=list, blank=True) 
    horario = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'convocatoria'
        managed = True 
```

### 📄 backend/core/infrastructure/persistence/django/repositories/__init__.py
```python

```

### 📄 backend/core/infrastructure/persistence/django/repositories/postgres_convocatoria_repository.py
```python
from typing import List, Optional
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.entities.convocatoria import Convocatoria
from core.infrastructure.persistence.django.models import ConvocatoriaModel, UsuarioModel

class PostgresConvocatoriaRepository(ConvocatoriaRepository):

    def _to_domain(self, model: ConvocatoriaModel) -> Convocatoria:
        """Helper para convertir de Django Model -> Entidad de Dominio"""
        return Convocatoria(
            id=model.id,
            titulo=model.titulo,
            descripcion=model.descripcion,
            ubicacion=model.ubicacion or "",
            link_whatsapp=model.link_whatsapp or "",
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            cupos_disponibles=model.cupos_disponibles,
            id_usuario_creador=model.usuario_creador.id,
            estado=model.estado,
            habilidades_requeridas=model.habilidades_requeridas,
            categorias=model.categorias, 
            horario=model.horario,       
            fecha_creacion=model.fecha_creacion
        )

    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        # Buscamos la instancia del usuario creador
        usuario_db = UsuarioModel.objects.get(id=convocatoria.id_usuario_creador)
        
        # Creamos el registro en BD
        modelo = ConvocatoriaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=convocatoria.titulo,
            descripcion=convocatoria.descripcion,
            ubicacion=convocatoria.ubicacion,
            link_whatsapp=convocatoria.link_whatsapp,
            fecha_inicio=convocatoria.fecha_inicio,
            fecha_fin=convocatoria.fecha_fin,
            cupos_disponibles=convocatoria.cupos_disponibles,
            estado=convocatoria.estado,
            habilidades_requeridas=convocatoria.habilidades_requeridas,
            categorias=convocatoria.categorias, 
            horario=convocatoria.horario        
        )
        return self._to_domain(modelo)

    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except ConvocatoriaModel.DoesNotExist:
            return None

    def listar_todas(self) -> List[Convocatoria]:
        modelos = ConvocatoriaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in modelos]
```

### 📄 backend/core/infrastructure/persistence/django/repositories/postgres_user_repository.py
```python
from typing import Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository
from core.infrastructure.persistence.django.models import UsuarioModel

class PostgresUserRepository(UserRepository):
    def save(self, user: User) -> User:
        # Mapeo: Entidad -> Modelo Django
        usuario_model, created = UsuarioModel.objects.update_or_create(
            correo_electronico=user.correo_electronico,
            defaults={
                'nombre_completo': user.nombre_completo,
                'contrasena_hash': user.contrasena_hash,
                'numero_telefono': user.numero_telefono,
                'direccion': user.direccion,
                'rol': user.rol,
                'estado': user.estado,
                'autenticacion_2fa_habilitada': user.autenticacion_2fa_habilitada,
                'fecha_nacimiento': user.fecha_nacimiento,
                'tipo_documento': user.tipo_documento, 
                'numero_identificacion': user.numero_identificacion,
                'profesion': user.profesion,
                'intereses': user.intereses or [],
                'habilidades': user.habilidades or [],
                'disponibilidad': user.disponibilidad or {}
            }
        )
        return self._to_domain(usuario_model)

    def get_by_email(self, email: str) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(correo_electronico=email)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def get_by_id(self, id: int) -> Optional[User]:
        try:
            usuario_model = UsuarioModel.objects.get(id=id)
            return self._to_domain(usuario_model)
        except UsuarioModel.DoesNotExist:
            return None

    def _to_domain(self, model: UsuarioModel) -> User:
        # Mapeo: Modelo Django -> Entidad
        return User(
            id=model.id,
            nombre_completo=model.nombre_completo,
            correo_electronico=model.correo_electronico,
            contrasena_hash=model.contrasena_hash,
            numero_telefono=model.numero_telefono,
            direccion=model.direccion,
            rol=model.rol,
            estado=model.estado,
            autenticacion_2fa_habilitada=model.autenticacion_2fa_habilitada,
            fecha_creacion=model.fecha_creacion,
            ultima_conexion=model.ultima_conexion,
            
            # Campos Nuevos
            fecha_nacimiento=str(model.fecha_nacimiento) if model.fecha_nacimiento else None,
            tipo_documento=model.tipo_documento, 
            numero_identificacion=model.numero_identificacion,
            profesion=model.profesion,
            intereses=model.intereses,
            habilidades=model.habilidades,
            disponibilidad=model.disponibilidad
        )
```

### 📄 backend/core/adapters/api/rest/serializers.py
```python
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
        read_only_fields = ['id', 'fecha_creacion', 'estado', 'usuario_creador']  # ⬅️ AGREGAR
```

### 📄 backend/core/adapters/api/rest/views/__init__.py
```python

```

### 📄 backend/core/adapters/api/rest/views/convocatoria_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers import ConvocatoriaSerializer
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConvocatoriaSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            nueva_convocatoria = Container.crear_convocatoria_use_case.ejecutar(
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id,
                habilidades=data.get('habilidades_requeridas', ''),
                ubicacion=data.get('ubicacion', ''),
                link_whatsapp=data.get('link_whatsapp', ''),
                categorias=data.get('categorias', []), 
                horario=data.get('horario', {})        
            )

            response_data = {
                "id": nueva_convocatoria.id,
                "titulo": nueva_convocatoria.titulo,
                "mensaje": "Convocatoria creada exitosamente"
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"❌ Error Interno: {e}") # Dejamos un print pequeño por si acaso
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarConvocatoriasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # 1. Pedimos todas las convocatorias al repositorio
            convocatorias = Container.convocatoria_repository.listar_todas()
            
            # 2. Las empaquetamos en una lista de diccionarios para el Frontend
            data = []
            for c in convocatorias:
                data.append({
                    "id": c.id,
                    "titulo": c.titulo,
                    "descripcion": c.descripcion,
                    "ubicacion": c.ubicacion,
                    "link_whatsapp": c.link_whatsapp,
                    "fecha_inicio": c.fecha_inicio.isoformat() if c.fecha_inicio else None,
                    "fecha_fin": c.fecha_fin.isoformat() if c.fecha_fin else None,
                    "cupos_disponibles": c.cupos_disponibles,
                    "estado": c.estado,
                    "habilidades_requeridas": c.habilidades_requeridas,
                    "fecha_creacion": c.fecha_creacion.isoformat() if c.fecha_creacion else None,
                    "categorias": c.categorias, 
                    "horario": c.horario
                })
                
            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"❌ Error al listar convocatorias: {e}")
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetalleConvocatoriaView(APIView):
    """
    Maneja operaciones sobre una convocatoria específica:
    - PUT: Actualizar datos completos (Editar)
    - PATCH: Actualizar estado (Pausar/Activar/Cerrar)
    - DELETE: Eliminar
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return ConvocatoriaModel.objects.get(pk=pk)
        except ConvocatoriaModel.DoesNotExist:
            return None

    def put(self, request, pk):
        """Editar convocatoria completa"""
        modelo = self.get_object(pk)
        if not modelo:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)

        # Usamos el serializer para validar y guardar
        serializer = ConvocatoriaSerializer(modelo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """Cambiar estado (pausar, publicar, cerrar)"""
        modelo = self.get_object(pk)
        if not modelo:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)

        nuevo_estado = request.data.get('estado')
        if nuevo_estado in ['abierta', 'pausada', 'cerrada']:
            modelo.estado = nuevo_estado
            modelo.save()
            return Response({"mensaje": f"Estado actualizado a {nuevo_estado}"})
        
        return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Eliminar convocatoria"""
        modelo = self.get_object(pk)
        if not modelo:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
        modelo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

### 📄 backend/core/adapters/api/rest/views/user_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

# Imports correctos
from core.container import Container
from core.adapters.api.rest.serializers import RegisterUserSerializer, LoginUserSerializer
from core.infrastructure.persistence.django.models import UsuarioModel

# backend/core/adapters/api/rest/views/user_views.py

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # Crear usuario usando el manager
            user_model = UsuarioModel.objects.create_user(
                correo_electronico=data['email'],
                password=data['password'],
                nombre_completo=data['nombre_completo'], 
                numero_telefono=data.get('telefono'),    
                direccion=data.get('direccion'),         
                rol='voluntario', # Por defecto es voluntario en el registro público
                fecha_nacimiento=data.get('fecha_nacimiento'),
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', []),
                disponibilidad=data.get('disponibilidad', {})
            )

            return Response({
                "message": "Usuario registrado exitosamente",
                "user": {
                    "id": user_model.id,
                    "full_name": user_model.nombre_completo,
                    "email": user_model.correo_electronico,
                    "role": user_model.rol
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"❌ ERROR REGISTRO: {e}")
            # Devolver un error genérico pero informativo para no exponer detalles internos
            return Response({"error": f"Error interno al crear usuario: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 1. Buscar usuario en BD
            try:
                user_model = UsuarioModel.objects.get(correo_electronico=data['email'])
            except UsuarioModel.DoesNotExist:
                return Response({"non_field_errors": ["Credenciales inválidas"]}, status=status.HTTP_401_UNAUTHORIZED)
            
            # 2. Verificar contraseña usando check_password de Django
            if not user_model.check_password(data['password']):
                return Response({"non_field_errors": ["Credenciales inválidas"]}, status=status.HTTP_401_UNAUTHORIZED)

            # 3. Generar tokens JWT
            refresh = RefreshToken.for_user(user_model)
            refresh['role'] = user_model.rol

            return Response({
                "message": "Inicio de sesión exitoso",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": user_model.id,
                    "full_name": user_model.nombre_completo,
                    "email": user_model.correo_electronico,
                    "role": user_model.rol
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"❌ ERROR LOGIN: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/urls.py
```python
from django.urls import path
from core.adapters.api.rest.views.user_views import RegisterUserView, LoginUserView
from core.adapters.api.rest.views.convocatoria_views import CrearConvocatoriaView, ListarConvocatoriasView, DetalleConvocatoriaView

urlpatterns = [
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
    
    path('convocatorias/crear/', CrearConvocatoriaView.as_view(), name='crear_convocatoria'),
    path('convocatorias/', ListarConvocatoriasView.as_view(), name='listar_convocatorias'),
    path('convocatorias/<int:pk>/', DetalleConvocatoriaView.as_view(), name='detalle_convocatoria'),
]
```

### 📄 frontend/tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Material Design 3 - FUNSAMEZ Brand Colors
                primary: {
                    DEFAULT: '#C5A059',
                    light: '#D9BC7F',
                    dark: '#A68540',
                    container: '#FFEFD4',
                    'on-container': '#2B1700',
                },
                secondary: {
                    DEFAULT: '#2E5A88',
                    light: '#5A82AD',
                    dark: '#1E3D5C',
                    container: '#D3E4FF',
                    'on-container': '#001C38',
                },
                surface: {
                    DEFAULT: '#FFFBFF',
                    dark: '#1F1B16',
                    container: '#F3EDE7',
                    'container-high': '#EDE7E1',
                    'container-highest': '#E7E1DB',
                },
                error: {
                    DEFAULT: '#BA1A1A',
                    container: '#FFDAD6',
                    'on-container': '#410002',
                },
                success: {
                    DEFAULT: '#386A20',
                    container: '#B8F397',
                },
                warning: {
                    DEFAULT: '#7E5700',
                    container: '#FFDEA6',
                },
                outline: '#7D7667',
                'outline-variant': '#CEC5B4',
                'on-surface': '#1F1B16',
                'on-surface-variant': '#4D4639',
            },
            fontFamily: {
                sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
            },
            fontSize: {
                // Material 3 Type Scale
                'display-large': ['57px', { lineHeight: '64px', letterSpacing: '-0.25px' }],
                'display-medium': ['45px', { lineHeight: '52px', letterSpacing: '0px' }],
                'display-small': ['36px', { lineHeight: '44px', letterSpacing: '0px' }],
                'headline-large': ['32px', { lineHeight: '40px', letterSpacing: '0px' }],
                'headline-medium': ['28px', { lineHeight: '36px', letterSpacing: '0px' }],
                'headline-small': ['24px', { lineHeight: '32px', letterSpacing: '0px' }],
                'title-large': ['22px', { lineHeight: '28px', letterSpacing: '0px' }],
                'title-medium': ['16px', { lineHeight: '24px', letterSpacing: '0.15px', fontWeight: '500' }],
                'title-small': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
                'label-large': ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
                'label-medium': ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
                'label-small': ['11px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
                'body-large': ['16px', { lineHeight: '24px', letterSpacing: '0.5px' }],
                'body-medium': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
                'body-small': ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
            },
            borderRadius: {
                'none': '0',
                'sm': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '28px',
                'full': '9999px',
            },
            boxShadow: {
                'elevation-1': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                'elevation-2': '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                'elevation-3': '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
                'elevation-4': '0px 2px 3px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
                'elevation-5': '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
        },
    },
    plugins: [],
}

```

### 📄 frontend/src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Material Design 3 Base Styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply font-sans text-on-surface bg-surface antialiased;
  }
  
  ::selection {
    @apply bg-primary/30;
  }
}

/* Material Design 3 Component Styles */
@layer components {
  /* Filled Button (Primary) */
  .btn-filled {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 
           bg-primary text-white font-medium text-label-large
           rounded-full transition-all duration-200
           hover:bg-primary-dark hover:shadow-elevation-2
           active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none;
  }
  
  /* Outlined Button (Secondary) */
  .btn-outlined {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3
           border-2 border-outline text-on-surface font-medium text-label-large
           rounded-full transition-all duration-200
           hover:bg-on-surface/5 hover:border-on-surface
           active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none;
  }
  
  /* Text Button */
  .btn-text {
    @apply inline-flex items-center justify-center gap-2 px-4 py-2
           text-primary font-medium text-label-large
           rounded-full transition-all duration-200
           hover:bg-primary/10
           active:scale-[0.98];
  }
  
  /* Tonal Button */
  .btn-tonal {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3
           bg-primary-container text-primary-on-container font-medium text-label-large
           rounded-full transition-all duration-200
           hover:shadow-elevation-1
           active:scale-[0.98];
  }
  
  /* Material Card */
  .card {
    @apply bg-surface-container rounded-2xl p-6 shadow-elevation-1
           transition-all duration-300;
  }
  
  .card-elevated {
    @apply bg-surface rounded-2xl p-6 shadow-elevation-2
           hover:shadow-elevation-3 transition-all duration-300;
  }
  
  .card-filled {
    @apply bg-surface-container-highest rounded-2xl p-6
           transition-all duration-300;
  }
  
  /* Input Fields */
  .input-outlined {
    @apply w-full px-4 py-3 border-2 border-outline-variant rounded-lg
           bg-transparent text-on-surface placeholder:text-on-surface-variant
           transition-all duration-200
           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20;
  }
  
  .input-filled {
    @apply w-full px-4 py-3 rounded-t-lg border-b-2 border-outline-variant
           bg-surface-container-highest text-on-surface
           placeholder:text-on-surface-variant
           transition-all duration-200
           focus:outline-none focus:border-primary focus:bg-surface-container;
  }
  
  /* Chips */
  .chip {
    @apply inline-flex items-center gap-1.5 px-4 py-2
           bg-surface-container-high text-on-surface
           rounded-full text-label-large
           transition-all duration-200 cursor-pointer
           hover:bg-surface-container-highest;
  }
  
  .chip-selected {
    @apply bg-secondary-container text-secondary-on-container;
  }
  
  /* Status Badges */
  .badge-pending {
    @apply inline-flex items-center gap-1.5 px-3 py-1
           bg-warning-container text-warning rounded-full text-label-medium;
  }
  
  .badge-success {
    @apply inline-flex items-center gap-1.5 px-3 py-1
           bg-success-container text-success rounded-full text-label-medium;
  }
  
  .badge-error {
    @apply inline-flex items-center gap-1.5 px-3 py-1
           bg-error-container text-error rounded-full text-label-medium;
  }
  
  /* Navigation Rail (Desktop) */
  .nav-rail {
    @apply fixed left-0 top-0 h-screen w-20 bg-surface-container
           flex flex-col items-center py-6 gap-3 z-50
           border-r border-outline-variant;
  }
  
  .nav-rail-item {
    @apply flex flex-col items-center gap-1 p-3 rounded-xl
           text-on-surface-variant transition-all duration-200
           hover:bg-surface-container-high
           cursor-pointer w-16;
  }
  
  .nav-rail-item.active {
    @apply bg-secondary-container text-secondary;
  }
  
  /* Navigation Bar (Mobile) */
  .nav-bar {
    @apply fixed bottom-0 left-0 right-0 h-20 bg-surface-container
           flex items-center justify-around px-4 z-50
           border-t border-outline-variant;
  }
  
  .nav-bar-item {
    @apply flex flex-col items-center gap-1 p-2 rounded-xl
           text-on-surface-variant transition-all duration-200
           hover:bg-surface-container-high cursor-pointer;
  }
  
  .nav-bar-item.active {
    @apply text-primary;
  }
  
  .nav-bar-item.active .nav-bar-indicator {
    @apply bg-secondary-container;
  }
  
  /* Dialog/Modal */
  .dialog-overlay {
    @apply fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm
           animate-fade-in;
  }
  
  .dialog {
    @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
           bg-surface rounded-3xl p-6 z-[101] shadow-elevation-5
           w-[90vw] max-w-md max-h-[85vh] overflow-auto
           animate-scale-in;
  }
  
  /* Progress Bar */
  .progress-track {
    @apply w-full h-2 bg-surface-container-highest rounded-full overflow-hidden;
  }
  
  .progress-fill {
    @apply h-full bg-primary rounded-full transition-all duration-500;
  }
  
  /* Toast Notification */
  .toast {
    @apply fixed bottom-24 left-1/2 -translate-x-1/2 z-[200]
           bg-on-surface text-surface px-6 py-4 rounded-lg
           shadow-elevation-3 animate-slide-up
           flex items-center gap-3;
  }
}

/* Utility Classes */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .gradient-hero {
    background: linear-gradient(
      135deg,
      rgba(197, 160, 89, 0.9) 0%,
      rgba(46, 90, 136, 0.85) 100%
    );

    .gpu-accelerated {
    /* Mueve el elemento a su propia capa de composición */
    transform: translateZ(0); 
    /* Avisa al navegador qué propiedades cambiarán */
    will-change: transform, opacity;
    /* Evita parpadeos en bordes durante la animación */
    backface-visibility: hidden;
  }
  }
  
  .glass {
    @apply bg-white/80 backdrop-blur-md;
  }
  
  .glass-dark {
    @apply bg-black/60 backdrop-blur-md;
  }
}

```

### 📄 frontend/src/App.jsx
```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // <--- IMPORTAR
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminConvocationsPage from './pages/AdminConvocationsPage';

function App() {
  return (
    <AppProvider> {/* <--- ENVOLVER TODO AQUÍ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/convocatorias" element={<AdminConvocationsPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider> // <--- CIERRE
  );
}

export default App;
```

### 📄 frontend/src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

### 📄 frontend/src/context/AppContext.jsx
```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerConvocatorias } from '../services/convocatoriaService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp debe ser usado dentro de un AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Iniciamos la lista vacía
    const [convocations, setConvocations] = useState([]);

    // --- FUNCIÓN PARA TRAER DATOS REALES (CORREGIDA) ---
    const fetchConvocations = async () => {
        try {
            const data = await obtenerConvocatorias();
            
            console.log('📦 Datos recibidos del backend:', data);
            
            // ✅ MANTENER TODOS LOS DATOS DEL BACKEND
            // Agregamos traducciones al inglés para la UI, pero conservamos los campos originales
            const formattedData = data.map(item => ({
                // --- IDs y Estados ---
                id: item.id,
                status: item.estado === 'abierta' ? 'published' : item.estado === 'cerrada' ? 'closed' : item.estado,
                
                // --- CAMPOS DEL BACKEND (originales en español) ---
                titulo: item.titulo,
                descripcion: item.descripcion,
                ubicacion: item.ubicacion,                      // ✅ Mantener
                link_whatsapp: item.link_whatsapp,              // ✅ Mantener
                fecha_inicio: item.fecha_inicio,                // ✅ Mantener completa
                fecha_fin: item.fecha_fin,                      // ✅ Mantener completa
                cupos_disponibles: item.cupos_disponibles,
                estado: item.estado,
                habilidades_requeridas: item.habilidades_requeridas,  // ✅ Mantener
                fecha_creacion: item.fecha_creacion,
                categorias: item.categorias || [],              // ✅ Mantener
                horario: item.horario || {},                    // ✅ Mantener
                
                // --- TRADUCCIONES AL INGLÉS (para UI de listado) ---
                title: item.titulo,
                description: item.descripcion || 'Sin descripción',
                location: item.ubicacion || 'No especificada',  // ✅ Usar dato real
                spots: item.cupos_disponibles,
                startDate: item.fecha_inicio ? item.fecha_inicio.split('T')[0] : '',
                endDate: item.fecha_fin ? item.fecha_fin.split('T')[0] : '',
                
                // --- CAMPOS CALCULADOS/EXTRA ---
                applicants: 0,  // En futuro conectar con postulaciones reales
                locationType: 'presencial',
                commitment: 'Ver detalles'
            }));
            
            console.log('✅ Datos formateados para el contexto:', formattedData);
            setConvocations(formattedData);
        } catch (error) {
            console.error("❌ Error al cargar convocatorias reales:", error);
        }
    };

    // Esto se ejecuta automáticamente cuando entras a la plataforma
    useEffect(() => {
        // Solo llamamos al backend si hay un token (usuario logueado)
        if (localStorage.getItem('access_token')) {
            fetchConvocations();
        }
    }, []);

    // --- Funciones Auxiliares (Actualizadas para refrescar la lista) ---
    const addConvocation = () => {
        fetchConvocations(); // Recarga la lista desde el backend
    };

    const updateConvocation = (id, data) => {
        // Mock visual mientras hacemos el endpoint de editar
        setConvocations(convocations.map(c => c.id === id ? { ...c, ...data } : c));
    };

    const deleteConvocation = (id) => {
        // Mock visual mientras hacemos el endpoint de eliminar
        setConvocations(convocations.filter(c => c.id !== id));
    };

    const pauseConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: c.status === 'paused' ? 'published' : 'paused' } : c
        ));
    };

    const publishConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: 'published' } : c
        ));
    };

    const closeConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: 'closed' } : c
        ));
    };

    const getActiveConvocations = () => {
        return convocations.filter(c => c.status !== 'closed');
    };

    const getClosedConvocations = () => {
        return convocations.filter(c => c.status === 'closed');
    };

    const value = {
        convocations,
        fetchConvocations, // Exportamos esta función por si necesitamos recargar manualmente
        addConvocation,
        updateConvocation,
        deleteConvocation,
        pauseConvocation,
        publishConvocation,
        closeConvocation,
        getActiveConvocations,
        getClosedConvocations
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

```

### 📄 frontend/src/services/convocatoriaService.js
```javascript
import axios from 'axios'; // ✅ CORREGIDO: Importación directa

// Ajusta la URL si es necesario
const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. CREAR
export const crearConvocatoria = async (formData) => {
    // Convertir array de skills a string para la BD
    const habilidadesString = Array.isArray(formData.skills) 
        ? formData.skills.join(', ') 
        : formData.skills;

    // Payload LIMPIO: Cada dato en su campo correspondiente
    const payload = {
        titulo: formData.title,
        descripcion: formData.description,
        ubicacion: formData.location,           // <--- Campo exclusivo
        link_whatsapp: formData.whatsappGroupLink, // <--- Campo exclusivo
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario
    };

    try {
        const response = await axios.post(`${API_URL}/crear/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. OBTENER LISTA
export const obtenerConvocatorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al obtener convocatorias');
    }
};

// 3. ACTUALIZAR (Para Editar) - FALTABA ESTA
export const actualizarConvocatoria = async (id, formData) => {
    // Misma lógica de limpieza para editar
    const habilidadesString = Array.isArray(formData.skills) 
        ? formData.skills.join(', ') 
        : formData.skills;

    const payload = {
        titulo: formData.title,
        descripcion: formData.description,
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario
    };

    try {
        const response = await axios.put(`${API_URL}/${id}/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar');
    }
};

// 4. CAMBIAR ESTADO (Para Pausar/Cerrar) - FALTABA ESTA
export const cambiarEstadoConvocatoria = async (id, nuevoEstado) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/`, { estado: nuevoEstado }, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cambiar estado');
    }
};

// 5. ELIMINAR - FALTABA ESTA
export const eliminarConvocatoria = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};
```

### 📄 frontend/src/pages/AdminConvocationsPage.jsx
```javascript
import { useState, useEffect } from 'react';
import { 
    crearConvocatoria, 
    actualizarConvocatoria, 
    cambiarEstadoConvocatoria, 
    eliminarConvocatoria 
} from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout';
import TimePickerMD3 from '../components/TimePickerMD3';
import {
    Plus, Edit, Trash2, X, Save, MapPin, Users,
    Briefcase, Pause, Play, Archive, Search, Filter, ChevronDown, 
    Check, ChevronUp, Clock3, RotateCcw, AlertCircle, ArrowUpDown, 
    ChevronLeft, ChevronRight, CalendarDays, Copy
} from 'lucide-react';

// --- LISTAS MAESTRAS ---
const CATEGORIAS_INTERES = [
  "Educación Infantil", "Medio Ambiente", "Adulto Mayor", 
  "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", 
  "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial",
  "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"
];

const HABILIDADES_OPCIONES = [
  "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva",
  "Inglés Básico", "Inglés Avanzado", "Excel / Office", 
  "Diseño Gráfico", "Programación / IT", 
  "Primeros Auxilios", "Fotografía y Video", "Redacción", 
  "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía",
  "Conducción", "Cocina", "Manualidades"
];

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// --- FUNCIÓN MAPPER: Convierte datos del Backend al formato del Formulario ---
const mapBackendToForm = (convocation) => {
    if (!convocation) return null;
    
    // Procesar habilidades (string → array o mantener array)
    let skillsArray = [];
    if (convocation.habilidades_requeridas) {
        skillsArray = typeof convocation.habilidades_requeridas === 'string'
            ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean)
            : convocation.habilidades_requeridas;
    }
    
    // Procesar horario para determinar tipo y extraer datos
    const horarioData = convocation.horario || {};
    let tipoHorario = 'unico';
    let fechaEvento = '';
    let horaInicio = '';
    let horaFin = '';
    
    if (horarioData.tipo === 'unico' && horarioData.fecha) {
        tipoHorario = 'unico';
        fechaEvento = horarioData.fecha;
        horaInicio = horarioData.horaInicio || '';
        horaFin = horarioData.horaFin || '';
    } else if (Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
        tipoHorario = 'recurrente';
    }
    
    return {
        title: convocation.titulo || '',
        description: convocation.descripcion || '',
        location: convocation.ubicacion || '',
        locationType: 'presencial',
        spots: convocation.cupos_disponibles || 1,
        whatsappGroupLink: convocation.link_whatsapp || '',
        startDate: convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '',
        endDate: convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '',
        categorias: convocation.categorias || [],
        skills: skillsArray,
        requirements: [],
        benefits: [],
        tipoHorario: tipoHorario,
        fechaEvento: fechaEvento,
        horaInicio: horaInicio,
        horaFin: horaFin,
        horario: horarioData
    };
};

// --- COMPONENTE DEL FORMULARIO (MODAL) ---
function ConvocationFormModal({ convocation, onSave, onClose }) {
    // 1. VALORES POR DEFECTO
    const initialValues = {
        title: '', description: '', 
        location: '', locationType: 'presencial', spots: 1, whatsappGroupLink: '',
        startDate: '', endDate: '',
        categorias: [], skills: [],
        requirements: [], benefits: [], 
        tipoHorario: 'unico', 
        fechaEvento: '', horaInicio: '', horaFin: '',
        horario: {} 
    };

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);

    // 🔥 CARGA DE DATOS: El mapeo ya se hace en handleEdit/handleReplicate
    useEffect(() => {
        console.log('🎨 ===== FORMULARIO: useEffect Ejecutado =====');
        console.log('📦 Convocation prop recibida:', JSON.stringify(convocation, null, 2));
        
        if (convocation) {
            // El convocation ya viene mapeado desde handleEdit/handleReplicate
            // Solo hacemos merge con initialValues
            const mergedData = { ...initialValues, ...convocation };
            console.log('🔀 Datos después del merge:', JSON.stringify(mergedData, null, 2));
            setFormData(mergedData);
        } else {
            console.log('🆕 Modo creación - usando initialValues');
            setFormData(initialValues);
        }
        
        console.log('🎨 ===== FIN useEffect =====');
    }, [convocation]);

    // Auto-Scroll a errores
    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) { return { ...prev, [field]: list.filter(i => i !== item) }; } 
            else { if (max && list.length >= max) return prev; return { ...prev, [field]: [...list, item] }; }
        });
    };

    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...(prev.horario || {}) };
            if (newHorario[day]) { 
                delete newHorario[day]; 
            } else {
                const existingDay = Object.values(newHorario).find(h => h.start && h.end);
                newHorario[day] = existingDay ? { ...existingDay } : { start: '08:00', end: '12:00' };
            }
            return { ...prev, horario: newHorario };
        });
    };

    const toMinutes = (timeStr) => { 
        if (!timeStr) return -1; 
        const [h, m] = timeStr.split(':').map(Number); 
        return (h * 60) + m; 
    };

    // Validación silenciosa de hora (sin alert)
    const handleUniqueTimeChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            const start = field === 'horaInicio' ? value : prev.horaInicio;
            const end = field === 'horaFin' ? value : prev.horaFin;

            if (start && end && toMinutes(start) >= toMinutes(end)) {
                setErrors(e => ({ ...e, hora: "La hora fin debe ser después del inicio" }));
            } else {
                setErrors(e => { const { hora, ...rest } = e; return rest; });
            }
            return newState;
        });
    };

    const handleDayTimeChange = (day, field, value) => {
        setFormData(prev => {
            const currentDay = { ...(prev.horario[day] || { start: '', end: '' }) };
            currentDay[field === 'start' ? 'start' : 'end'] = value;
            return { ...prev, horario: { ...prev.horario, [day]: currentDay } };
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.description?.trim()) newErrors.description = "La descripción es obligatoria.";
        if (!formData.location?.trim()) newErrors.location = "La ubicación es obligatoria.";
        
        if (formData.tipoHorario === 'unico') {
            if (!formData.fechaEvento) newErrors.fecha = "Selecciona una fecha.";
            if (!formData.horaInicio || !formData.horaFin) newErrors.hora = "Define el horario completo.";
            if (formData.horaInicio && formData.horaFin && toMinutes(formData.horaInicio) >= toMinutes(formData.horaFin)) {
                newErrors.hora = "Hora fin inválida.";
            }
        } else {
            if (Object.keys(formData.horario).length === 0) newErrors.horario = "Selecciona al menos un día.";
            if (!formData.startDate || !formData.endDate) newErrors.fechas = "Define el rango de fechas.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return; 

        // 1. FORMATO DE FECHAS (con segundos para Django)
        let startDate = '', endDate = '';
        if (formData.tipoHorario === 'unico') {
             startDate = `${formData.fechaEvento}T${formData.horaInicio || '00:00'}:00`;
             endDate = `${formData.fechaEvento}T${formData.horaFin || '23:59'}:00`;
        } else {
             startDate = `${formData.startDate}T00:00:00`;
             endDate = `${formData.endDate}T23:59:59`;
        }

        // 🔥 CORRECCIÓN CLAVE: Enviamos un objeto con las claves en INGLÉS
        // Esto es lo que 'convocatoriaService.js' espera recibir en 'formData' para hacer su trabajo.
        
        // Construir el objeto horario según el tipo seleccionado
        let horarioFinal = {};
        if (formData.tipoHorario === 'unico') {
            horarioFinal = {
                tipo: 'unico',
                fecha: formData.fechaEvento,
                horaInicio: formData.horaInicio,
                horaFin: formData.horaFin
            };
        } else {
            // Para horario recurrente, incluimos el tipo y los días con horarios
            horarioFinal = { 
                tipo: 'recurrente',
                ...formData.horario 
            };
        }
        
        const payloadForService = {
            title: formData.title,
            description: formData.description,
            location: formData.location,           // ✅ ¡Ahora sí se envía!
            whatsappGroupLink: formData.whatsappGroupLink, // ✅ ¡Ahora sí se envía!
            startDate: startDate,
            endDate: endDate,
            spots: parseInt(formData.spots) || 1,
            skills: formData.skills || [],
            categorias: formData.categorias || [],
            horario: horarioFinal,  // ✅ Horario estructurado correctamente
            requirements: formData.requirements || [],
            benefits: formData.benefits || []
        };
        
        onSave(payloadForService);
    };

    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => {
        const visibleOptions = showAll ? options : options.slice(0, 8);
        const currentList = formData[field] || [];
        const selectedCount = currentList.length; 
        
        return (
            <div className="pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-baseline mb-2">
                    <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                    <span className={`text-xs font-medium ${max && selectedCount >= max ? 'text-primary' : 'text-on-surface-variant'}`}>({selectedCount}{max ? `/${max}` : ''} seleccionados)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {visibleOptions.map(opt => (
                        <button key={opt} type="button" onClick={() => toggleSelection(field, opt, max)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${currentList.includes(opt) ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                            {currentList.includes(opt) && <Check size={12} />} {opt}
                        </button>
                    ))}
                </div>
                {options.length > 8 && (
                    <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 text-xs text-primary font-bold flex items-center hover:underline">
                        {showAll ? <><ChevronUp size={14} className="mr-1"/> Ver menos</> : <><ChevronDown size={14} className="mr-1"/> Ver más ({options.length - 8} restantes)</>}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in gpu-accelerated" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up gpu-accelerated">
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{convocation && convocation.id ? 'Editar Convocatoria' : convocation ? 'Replicar Convocatoria' : 'Nueva Convocatoria'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="convocation-form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div id="field-title"><label className="block text-label-large text-on-surface mb-1.5">Título *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`input-outlined focus:bg-white ${errors.title ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Jornada de Vacunación" />{errors.title && <p className="text-error text-xs mt-1 font-bold flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.title}</p>}</div>
                            <div id="field-description"><label className="block text-label-large text-on-surface mb-1.5">Descripción *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.description ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.description && <p className="text-error text-xs mt-1 font-bold flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.description}</p>}</div>
                        </div>
                        
                        {renderChipsSection("Categoría de la Convocatoria", "categorias", CATEGORIAS_INTERES, showAllCats, setShowAllCats, 3)}
                        {renderChipsSection("Habilidades Requeridas", "skills", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills, null)}
                        
                        <div className="pt-6 border-t border-outline-variant/30" id="field-horario">
                            <label className="block text-label-large text-on-surface mb-3 font-bold text-primary flex items-center gap-2"><Clock3 size={18} /> Disponibilidad Requerida</label>
                            
                            <div className="flex bg-surface-container rounded-lg p-1 mb-4 w-fit">
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'unico'})} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'unico' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Evento Único</button>
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'recurrente'})} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'recurrente' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Recurrente</button>
                            </div>
                            
                            {errors.horario && <p className="text-error text-sm mb-2 font-bold flex items-center"><AlertCircle size={14} className="mr-1"/>{errors.horario}</p>}
                            
                            {formData.tipoHorario === 'unico' ? (
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-3" id="field-fecha"><label className="text-xs font-bold text-primary uppercase tracking-wide mb-1 block">Fecha</label><input type="date" value={formData.fechaEvento} onChange={(e) => setFormData({...formData, fechaEvento: e.target.value})} className={`input-outlined bg-white ${errors.fecha ? 'border-error' : ''}`} /></div>
                                    <div id="field-hora"><TimePickerMD3 label="Hora Inicio" value={formData.horaInicio} onChange={(val) => handleUniqueTimeChange('horaInicio', val)} /></div>
                                    <div><TimePickerMD3 label="Hora Fin" value={formData.horaFin} onChange={(val) => handleUniqueTimeChange('horaFin', val)} /></div>
                                    {errors.hora && <p className="col-span-3 text-error text-xs font-bold text-center bg-error/10 py-1 rounded">{errors.hora}</p>}
                                </div>
                            ) : (
                                <div className="bg-surface-container/30 rounded-xl border border-outline-variant/50 overflow-hidden divide-y divide-outline-variant/20">
                                    {DIAS_SEMANA.map(dia => {
                                        const isSelected = !!formData.horario[dia];
                                        return (
                                            <div key={dia} className={`p-3 transition-colors ${isSelected ? 'bg-white' : 'hover:bg-white/40'}`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                    <div className="flex items-center gap-3 min-w-[120px]">
                                                        <button type="button" onClick={() => toggleDay(dia)} className={`w-10 h-6 rounded-full p-1 transition-colors relative ${isSelected ? 'bg-primary' : 'bg-outline-variant'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSelected ? 'translate-x-4' : 'translate-x-0'}`} /></button>
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{dia}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="flex items-center gap-2 flex-1 pl-2 animate-fade-in">
                                                            <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Inicio" value={formData.horario[dia].start} onChange={(val) => handleDayTimeChange(dia, 'start', val)} /></div>
                                                            <span className="text-on-surface-variant text-lg font-bold mx-1">:</span>
                                                            <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Fin" value={formData.horario[dia].end} onChange={(val) => handleDayTimeChange(dia, 'end', val)} /></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            {formData.tipoHorario === 'recurrente' && (
                                <>
                                    <div id="field-fechas"><label className="block text-label-large text-on-surface mb-1.5">Inicio</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error' : ''}`} /></div>
                                    <div><label className="block text-label-large text-on-surface mb-1.5">Cierre</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error' : ''}`} /></div>
                                </>
                            )}
                            <div id="field-location"><label className="block text-label-large text-on-surface mb-1.5">Ubicación *</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={`input-outlined focus:bg-white ${errors.location ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Sede Principal" />{errors.location && <p className="text-error text-xs mt-1 font-bold">{errors.location}</p>}</div>
                            <div><label className="block text-label-large text-on-surface mb-1.5">Vacantes</label><input type="number" min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined text-center focus:bg-white" /></div>
                        </div>
                        <div className="pt-2"><label className="block text-label-large text-on-surface mb-1.5">Grupo WhatsApp</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Publicar</button>
                </div>
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---
export default function AdminConvocationsPage() {
    const { getActiveConvocations, getClosedConvocations } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); 
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter, sortBy, activeTab]);

    const rawConvocations = activeTab === 'active' ? getActiveConvocations() : getClosedConvocations();

    const filteredConvocations = rawConvocations.filter(c => {
        const matchesSearch = (c.title || c.titulo || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter || c.estado === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedConvocations = [...filteredConvocations].sort((a, b) => {
        const dateA = new Date(a.fecha_inicio || a.startDate || 0);
        const dateB = new Date(b.fecha_inicio || b.startDate || 0);
        const idA = a.id || 0;
        const idB = b.id || 0;
        const titleA = a.title || a.titulo || '';
        const titleB = b.title || b.titulo || '';

        switch (sortBy) {
            case 'newest': return idB - idA; 
            case 'oldest': return idA - idB;
            case 'alpha': return titleA.localeCompare(titleB);
            case 'event_date': return dateA - dateB;
            default: return 0;
        }
    });

    const totalPages = Math.ceil(sortedConvocations.length / ITEMS_PER_PAGE);
    const paginatedConvocations = sortedConvocations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // 🔥 TRADUCTOR FORENSE (Recarga datos al Editar) - VERSIÓN MEJORADA
    const mapToForm = (convocation) => {
        if (!convocation) return null;
        
        console.log('🔍 ===== MAPEO INICIADO =====');
        console.log('📦 Convocatoria recibida:', JSON.stringify(convocation, null, 2));
        
        // 1. Datos básicos (Backend ESP -> Frontend ENG)
        const titulo = convocation.title || convocation.titulo || '';
        const descripcion = convocation.description || convocation.descripcion || '';
        const cupos = convocation.spots || convocation.cupos_disponibles || 1;
        
        // 🔥 MAPEO DIRECTO DE CAMPOS NUEVOS
        const ubicacion = convocation.ubicacion || convocation.location || '';
        const whatsapp = convocation.link_whatsapp || convocation.whatsappGroupLink || '';
        
        // 2. Procesar horario
        const horarioData = convocation.horario || {};
        let tipoHorario = 'unico';
        let fechaEvento = '';
        let horaInicio = '';
        let horaFin = '';
        let startDate = '';
        let endDate = '';
        
        // Determinar si es horario único o recurrente
        if (horarioData.tipo === 'unico' && horarioData.fecha) {
            // Horario único: los datos están en el objeto horario
            tipoHorario = 'unico';
            fechaEvento = horarioData.fecha;
            horaInicio = horarioData.horaInicio || '';
            horaFin = horarioData.horaFin || '';
        } else if (Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
            // Horario recurrente: hay días de la semana en el objeto
            tipoHorario = 'recurrente';
            const rawInicio = convocation.fecha_inicio || convocation.startDate || '';
            const rawFin = convocation.fecha_fin || convocation.endDate || '';
            startDate = rawInicio ? rawInicio.split('T')[0] : '';
            endDate = rawFin ? rawFin.split('T')[0] : '';
        } else {
            // Fallback: intentar extraer de fecha_inicio/fecha_fin
            const rawInicio = convocation.fecha_inicio || convocation.startDate || '';
            const rawFin = convocation.fecha_fin || convocation.endDate || '';
            
            if (rawInicio && rawInicio.includes('T')) {
                const parts = rawInicio.split('T');
                fechaEvento = parts[0];
                horaInicio = parts[1]?.substring(0, 5) || '';
            }
            if (rawFin && rawFin.includes('T')) {
                const parts = rawFin.split('T');
                horaFin = parts[1]?.substring(0, 5) || '';
            }
        }

        // 3. Arrays
        let skillsArray = [];
        if (Array.isArray(convocation.skills)) {
            skillsArray = convocation.skills;
        } else if (convocation.habilidades_requeridas) {
            skillsArray = typeof convocation.habilidades_requeridas === 'string'
                ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean)
                : convocation.habilidades_requeridas;
        }

        const result = {
            id: convocation.id,
            title: titulo,
            description: descripcion,
            location: ubicacion, // ✅ Mapeado
            whatsappGroupLink: whatsapp, // ✅ Mapeado
            spots: cupos, // ✅ Corregido
            startDate,
            endDate,
            categorias: convocation.categorias || [],
            skills: skillsArray,
            requirements: [], 
            benefits: [], 
            tipoHorario: tipoHorario,
            fechaEvento,
            horaInicio,
            horaFin,
            horario: horarioData
        };
        
        console.log('✅ Datos mapeados:', JSON.stringify(result, null, 2));
        console.log('🔍 ===== FIN MAPEO =====');
        
        return result;
    };

    // 🔥 MANEJO DE ERRORES DETALLADO
    const handleSave = async (data) => {
        try {
            if (editingConvocation && editingConvocation.id) {
                await actualizarConvocatoria(editingConvocation.id, data);
                alert("✅ Actualizado correctamente");
            } else {
                await crearConvocatoria(data);
                alert("✅ Creado correctamente");
            }
            window.location.reload(); 
        } catch (error) {
            console.error("Error completo:", error);
            
            let msg = "Error desconocido";
            if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.error) msg = data.error;
                else if (data.detail) msg = data.detail;
                // Si el backend devuelve un objeto de errores {campo: [error]}
                else {
                    msg = Object.entries(data)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join('\n');
                }
            } else if (error.message) {
                msg = error.message;
            }
            
            alert(`❌ No se pudo guardar:\n${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Eliminar esta convocatoria?')) {
            try {
                await eliminarConvocatoria(id);
                window.location.reload();
            } catch (error) {
                alert("❌ Error al eliminar");
            }
        }
    };

    const handleStatusChange = async (id, nuevoEstado) => {
        if(!confirm(`¿Cambiar estado a: ${nuevoEstado}?`)) return;
        try {
            await cambiarEstadoConvocatoria(id, nuevoEstado);
            window.location.reload();
        } catch (error) {
            alert("❌ Error al cambiar estado.");
        }
    };

    const handleReplicate = (convocation) => {
        const formData = mapToForm(convocation);
        if(formData) {
            const replica = { ...formData, id: null, title: `${formData.title} (Copia)` };
            setEditingConvocation(replica);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (convocation) => {
        console.log('✏️ ===== EDITANDO CONVOCATORIA =====');
        console.log('📥 Convocatoria entrante:', JSON.stringify(convocation, null, 2));
        
        const formData = mapToForm(convocation);
        
        console.log('📝 FormData después de mapeo:', JSON.stringify(formData, null, 2));
        
        if(formData) {
            setEditingConvocation(formData);
            console.log('✅ EditingConvocation establecido, abriendo modal');
            setIsModalOpen(true);
        } else {
            console.error('❌ mapToForm devolvió null o undefined');
        }
    };

    const getStatusBadge = (status) => {
        let normalized = 'closed';
        if (status === 'abierta' || status === 'published' || status === 'active') normalized = 'published';
        if (status === 'pausada' || status === 'paused') normalized = 'paused';
        
        const styles = { 
            published: 'bg-success-container text-success', 
            paused: 'bg-warning-container text-warning', 
            closed: 'bg-surface-container-high text-on-surface-variant' 
        };
        const labels = { published: 'Publicada', paused: 'Pausada', closed: 'Cerrada' };
        
        return <span className={`px-3 py-1 rounded-full text-label-small font-medium ${styles[normalized]}`}>{labels[normalized]}</span>;
    };

    return (
        <AdminLayout title="Gestión de Convocatorias" subtitle="Crea, edita y administra las convocatorias.">
            {/* Header Actions & Tabs */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    <button onClick={() => setActiveTab('active')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'active' ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        Activas ({getActiveConvocations().length})
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'history' ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <Archive className="w-4 h-4 inline mr-1" /> Historial ({getClosedConvocations().length})
                    </button>
                </div>
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex shadow-primary/20">
                    <Plus className="w-4 h-4" /> Nueva Convocatoria
                </button>
            </div>

            {/* BARRA DE HERRAMIENTAS */}
            <div className="sticky top-0 z-10 bg-surface/95 pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent border-b border-transparent sm:border-none">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {activeTab === 'active' && (
                            <div className="relative min-w-[140px]">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                    <option value="all">Estado: Todos</option>
                                    <option value="abierta">Abiertas</option>
                                    <option value="pausada">Pausadas</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                            </div>
                        )}
                        <div className="relative min-w-[160px]">
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                <option value="newest">Más Recientes</option>
                                <option value="oldest">Más Antiguas</option>
                                <option value="alpha">A - Z</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LISTA DE CONVOCATORIAS --- */}
            <div className="space-y-4 pt-2 min-h-[400px]">
                {paginatedConvocations.length === 0 ? (
                    <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent">
                        <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                        <h3 className="text-title-large text-on-surface">No se encontraron resultados</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {paginatedConvocations.map(convocation => {
                            const isPublished = convocation.estado === 'abierta' || convocation.status === 'published';
                            
                            return (
                                <div key={convocation.id} className={`card-elevated animate-fade-in ${activeTab === 'history' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                <h3 className="text-title-medium sm:text-title-large font-bold truncate text-primary">{convocation.title || convocation.titulo}</h3>
                                                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs sm:text-sm font-bold flex items-center shrink-0">
                                                    <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots || convocation.cupos_disponibles}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mb-3">{getStatusBadge(convocation.estado || convocation.status)}</div>
                                            <p className="text-body-small sm:text-body-medium text-on-surface-variant mb-3 line-clamp-2">{convocation.description || convocation.descripcion}</p>
                                            <div className="flex flex-wrap gap-3 text-xs sm:text-body-small text-on-surface-variant font-medium">
                                                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5"/> Inicio: {new Date(convocation.fecha_inicio || convocation.startDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {convocation.location || convocation.ubicacion || 'Sede Principal'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40 mt-2 lg:mt-0 justify-center">
                                            {activeTab === 'active' ? (
                                                <>
                                                    <button onClick={() => handleEdit(convocation)} className="btn-tonal py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Edit className="w-4 h-4" /> Editar</button>
                                                    
                                                    {isPublished ? (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'pausada')} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Pause className="w-4 h-4" /> Pausar</button>
                                                    ) : (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'abierta')} className="btn-outlined border-success text-success hover:bg-success/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Play className="w-4 h-4" /> Publicar</button>
                                                    )}
                                                    
                                                    <button onClick={() => handleStatusChange(convocation.id, 'cerrada')} className="btn-outlined py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm hover:bg-surface-container-highest"><Archive className="w-4 h-4" /> Cerrar</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleReplicate(convocation)} className="btn-tonal py-2 text-primary font-bold shadow-sm flex-1 lg:w-full justify-center text-sm"><Copy className="w-4 h-4" /> Replicar</button>
                                            )}
                                            <button onClick={() => handleDelete(convocation.id)} className="btn-outlined border-error text-error hover:bg-error/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Trash2 className="w-4 h-4" /> Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {sortedConvocations.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}
```

### 📄 frontend/src/pages/DashboardPage.jsx
```javascript
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerDashboard from '../components/VolunteerDashboard';
import AdminDashboard from '../components/AdminDashboard'; // <--- IMPORTAR

const DashboardPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    const savedRole = localStorage.getItem('user_role');
    setRole(savedRole);
  }, [navigate]);

  if (!role) return <div className="min-h-screen flex items-center justify-center bg-brand-beige">Cargando...</div>;

  // --- LÓGICA DE SELECCIÓN ---
  // Si el backend dice que eres staff o superuser, te mostramos el AdminDashboard
  if (role === 'admin' || role === 'administrador' || role === 'superuser') {
    return <AdminDashboard />;
  }

  // Si no, eres voluntario
  return <VolunteerDashboard />;
};

export default DashboardPage;
```

### 📄 frontend/src/pages/LoginPage.jsx
```javascript
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Heart } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
        email: email,
        password: password
      });

      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user_role', response.data.user.role); 
      localStorage.setItem('user_name', response.data.user.full_name);

      navigate('/dashboard'); 

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Error al iniciar sesión");
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4">
      
      {/* --- BLOQUE 1: CABECERA (AFUERA DE LA TARJETA) --- */}
      <div className="flex flex-col items-center mb-8 max-w-md text-center">
        {/* Logo Flotante */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-4 rounded-2xl mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <Heart className="w-10 h-10 text-white fill-current" />
        </div>
        
        {/* Título y Descripción */}
        <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-3">Bienvenido</h1>
        <p className="text-on-surface-variant text-base">
          Ingresa tus credenciales para acceder al portal de <span className="font-semibold text-primary">FUNSAMEZ</span>
        </p>
      </div>

      {/* --- BLOQUE 2: TARJETA DEL FORMULARIO --- */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 md:p-10 border border-outline-variant">
        
        {error && (
          <div className="bg-error-container text-error p-3 mb-6 text-sm rounded-lg border border-error/20 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface ml-1">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@funsamez.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-5 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container focus:bg-white text-on-surface"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface ml-1">Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full px-5 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container focus:bg-white text-on-surface"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-95 mt-4 text-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant text-center">
          <p className="text-sm text-on-surface-variant">
            ¿Aún no eres parte del equipo? <br/>
            <Link to="/register" className="text-primary font-bold hover:text-primary-dark transition-colors inline-block mt-1">
              Regístrate como voluntario
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

```

### 📄 frontend/src/pages/RegisterPage.jsx
```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// --- CONSTANTES ---
const MAX_SELECTION = 5; 
const INITIAL_VISIBLE_COUNT = 8; 

const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PPT', label: 'Permiso por Protección Temporal (PPT)' },
  { value: 'PAS', label: 'Pasaporte' }
];

const COUNTRY_CODES = [
  { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' },
  { code: '+1', country: 'US' },
  { code: '+34', country: 'ES' },
  { code: '+52', country: 'MX' },
  { code: '+51', country: 'PE' },
  { code: '+593', country: 'EC' },
];

const INTERESES_OPCIONES = [
  "Educación Infantil", "Medio Ambiente", "Adulto Mayor", 
  "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", 
  "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial",
  "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal",
  "Apoyo en Desastres", "Tutorías Académicas", "Inclusión Social"
];

const HABILIDADES_OPCIONES = [
  "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva",
  "Inglés Básico", "Inglés Avanzado", "Excel / Office", 
  "Diseño Gráfico", "Programación / IT", 
  "Primeros Auxilios", "Fotografía y Video", "Redacción", 
  "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía",
  "Conducción", "Cocina", "Manualidades"
];

const DIAS_SEMANA = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
const JORNADAS = [
  { id: 'manana', label: 'Mañana (8am - 12pm)' },
  { id: 'tarde', label: 'Tarde (2pm - 6pm)' }
];

// --- COMPONENTE INPUT AUXILIAR ---
const InputField = ({ label, name, type = "text", required = false, placeholder = "", formData, handleChange, errors, numericOnly = false }) => (
  <div className="space-y-1 scroll-mt-24" id={`field-${name}`}>
    <label className="text-sm font-semibold text-on-surface">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <input 
      name={name} 
      type={type} 
      required={required} 
      placeholder={placeholder}
      value={formData[name] || ''} 
      onChange={(e) => handleChange(e, numericOnly)} 
      className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all
        ${errors[name] 
          ? "border-error bg-error-container text-error focus:border-error focus:ring-4 focus:ring-error/10" 
          : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface"
        }
      `} 
    />
    {errors[name] && (
      <div className="flex items-center mt-1 text-error animate-pulse">
        <AlertCircle size={14} className="mr-1" />
        <span className="text-xs font-bold">{errors[name]}</span>
      </div>
    )}
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados UI
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Estado Formulario
  const [countryCode, setCountryCode] = useState('+57');
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '', 
    fecha_nacimiento: '',
    tipo_documento: 'CC',
    numero_identificacion: '',
    profesion: '',
    intereses: [], 
    habilidades: [],
    disponibilidad: {}
  });

  // Efecto Auto-Scroll a errores
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const element = document.getElementById(`field-${errorKeys[0]}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);

  //Validación de confirmación de contraseña en tiempo real
  useEffect(() => {
    if (formData.confirmPassword.length > 0) {
      // Si lo que va escribiendo NO es el inicio exacto de la contraseña, lanza error al instante
      if (!formData.password.startsWith(formData.confirmPassword)) {
        setErrors(prev => ({ 
          ...prev, 
          confirmPassword: "Las contraseñas no coinciden." 
        }));
      } else {
        // Si va escribiendo bien, o si ya la completó exactamente igual, borra el error
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  }, [formData.password, formData.confirmPassword]);

  // Manejador de Inputs con restricción numérica
  const handleChange = (e, numericOnly = false) => {
    const { name, value } = e.target;
    
    if (numericOnly && value !== '' && !/^\d+$/.test(value)) {
        return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const currentList = prev[field];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      } else {
        if (currentList.length >= MAX_SELECTION) return prev;
        return { ...prev, [field]: [...currentList, value] };
      }
    });
  };

  const toggleAvailability = (day, slotId) => {
    setFormData(prev => {
      const currentSchedule = { ...prev.disponibilidad };
      const daySlots = currentSchedule[day] || [];
      
      if (daySlots.includes(slotId)) {
        // Si ya está, lo quitamos
        currentSchedule[day] = daySlots.filter(s => s !== slotId);
        // Limpieza: si el día queda vacío, borramos la llave para ahorrar espacio
        if (currentSchedule[day].length === 0) delete currentSchedule[day];
      } else {
        // Si no está, lo agregamos
        currentSchedule[day] = [...daySlots, slotId];
      }
      
      return { ...prev, disponibilidad: currentSchedule };
    });
  };


  const validateForm = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = ["La contraseña debe tener mínimo 8 caracteres."];
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ["Las contraseñas no coinciden."];
    }
    if (!formData.numero_identificacion) {
        newErrors.numero_identificacion = ["El documento es obligatorio."];
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    
    const localErrors = validateForm();
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
          ...formData,
          telefono: formData.telefono ? `${countryCode} ${formData.telefono}` : ''
      };

      await axios.post('http://127.0.0.1:8000/api/users/register/', payload);
      
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/login'), 3000);

    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        const normalizedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
            if (key === 'non_field_errors') {
                setGeneralError(backendErrors[key][0]);
            } else {
                normalizedErrors[key] = Array.isArray(backendErrors[key]) ? backendErrors[key][0] : backendErrors[key];
            }
        });
        setErrors(normalizedErrors);
      } else {
        setGeneralError("Error de conexión con el servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Protección contra recarga accidental
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const isDirty = Object.values(formData).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== '' && value !== 'CC' && value !== '+57';
      });

      if (isDirty && !isSuccess) {
        e.preventDefault();
        e.returnValue = ''; 
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, isSuccess]);

  const renderChipsSection = (title, field, optionsList, showAllState, setShowAllState) => {
    const currentCount = formData[field].length;
    const visibleOptions = showAllState ? optionsList : optionsList.slice(0, INITIAL_VISIBLE_COUNT);
    const hasMore = optionsList.length > INITIAL_VISIBLE_COUNT;

    return (
      <div className="md:col-span-2 mt-6">
        <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-semibold text-on-surface block">{title}</label>
            <span className={`text-xs font-medium ${currentCount === MAX_SELECTION ? 'text-primary' : 'text-on-surface-variant'}`}>
                {currentCount}/{MAX_SELECTION} seleccionados
            </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleOptions.map(item => {
            const isSelected = formData[field].includes(item);
            const isDisabled = !isSelected && currentCount >= MAX_SELECTION;
            return (
            <button key={item} type="button" onClick={() => toggleSelection(field, item)} disabled={isDisabled}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 
                ${isSelected 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : isDisabled 
                    ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" 
                    : "bg-white text-on-surface border-outline-variant hover:border-primary hover:text-primary"
                }`}
            >
              {isSelected && <Check size={14} />} {item}
            </button>
          )})}
        </div>
        {hasMore && (
          <button type="button" onClick={() => setShowAllState(!showAllState)} className="mt-3 text-sm text-primary flex items-center font-medium hover:underline">
            {showAllState ? <><ChevronUp size={16} className="mr-1"/> Ver menos</> : <><ChevronDown size={16} className="mr-1"/> Ver más opciones</>}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4 py-10 animate-fade-in">
      <div className="text-center mb-8 max-w-md animate-slide-down">
        <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg mb-4">
             <span className="text-white text-2xl font-bold">F</span>
        </div>
        <h1 className="text-4xl font-bold text-on-surface mb-2">Únete a FUNSAMEZ</h1>
        <p className="text-on-surface-variant text-lg">Crea tu cuenta y sé parte del cambio.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 md:p-12 relative overflow-hidden">
        {isLoading && (<div className="absolute top-0 left-0 w-full h-1.5 bg-surface-container"><div className="h-full bg-primary animate-progress-indeterminate"></div></div>)}
        
        {isSuccess && (
          <div className="bg-success-container border border-success/20 text-success p-6 mb-8 rounded-xl text-center font-medium flex flex-col items-center justify-center animate-pulse shadow-sm">
            <Check size={28} className="text-success mb-2" />
            <span className="text-2xl font-bold mb-1">¡Registro Exitoso!</span>
            <span className="text-sm text-primary mt-2 font-semibold">Redirigiendo...</span>
          </div>
        )}

        {generalError && (
          <div className="bg-error-container border-l-4 border-error text-error p-4 mb-6 rounded-md flex items-center animate-shake">
            <AlertCircle size={24} className="mr-3 flex-shrink-0" /> <span className="font-medium">{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 ${isLoading || isSuccess ? 'opacity-50 pointer-events-none' : ''}`}>
          
          <div className="md:col-span-2 pb-2 border-b border-outline-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider mb-2">Información Básica</div>

          <InputField label="Nombre Completo" name="nombre_completo" required formData={formData} handleChange={handleChange} errors={errors} />
          
          {/* GRUPO DE DOCUMENTO: TIPO + NUMERO */}
          <div className="space-y-1">
             <label className="text-sm font-semibold text-on-surface">Tipo Documento <span className="text-error">*</span></label>
             <div className="relative">
                <select
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:bg-white focus:border-primary appearance-none cursor-pointer text-on-surface"
                >
                    {DOCUMENT_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none" size={16} />
             </div>
          </div>

          <InputField 
            label="Número de Documento" 
            name="numero_identificacion" 
            required 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
            numericOnly={true}
            placeholder="Solo números, sin puntos"
          />
          
          <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" required formData={formData} handleChange={handleChange} errors={errors} />
          <InputField label="Profesión / Ocupación" name="profesion" formData={formData} handleChange={handleChange} errors={errors} />

          <div className="md:col-span-2 pb-2 border-b border-outline-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider mt-6 mb-2">Acceso y Contacto</div>

          <InputField label="Correo Electrónico" name="email" type="email" required placeholder="ejemplo@correo.com" formData={formData} handleChange={handleChange} errors={errors} />
          
          {/* GRUPO TELÉFONO: CÓDIGO PAIS + NUMERO */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Teléfono / WhatsApp</label>
            <div className="flex gap-2">
                <div className="relative w-1/3">
                    <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full px-2 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:border-primary appearance-none text-center font-medium text-on-surface"
                    >
                        {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.country} ({c.code})</option>)}
                    </select>
                </div>
                <input 
                    name="telefono"
                    type="tel"
                    placeholder="300 123 4567"
                    value={formData.telefono}
                    onChange={(e) => handleChange(e, true)}
                    className="w-2/3 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-on-surface"
                />
            </div>
          </div>

          {/* GRUPO DE CONTRASEÑAS */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 scroll-mt-24" id="field-password">
            
            {/* Contraseña Original */}
            <div className="space-y-1 relative z-10">
              <label className="text-sm font-semibold text-on-surface">Contraseña <span className="text-error">*</span></label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Mínimo 8 caracteres"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all pr-12 ${errors.password ? "border-error bg-error-container text-error" : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary text-on-surface"}`} 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary p-1">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <div className="flex items-center mt-1 text-error animate-pulse"><AlertCircle size={14} className="mr-1" /><span className="text-xs font-bold">{errors.password}</span></div>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1 relative z-10" id="field-confirmPassword">
              <label className="text-sm font-semibold text-on-surface">Confirmar Contraseña <span className="text-error">*</span></label>
              <div className="relative">
                <input 
                  name="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  required 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Repite tu contraseña"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all pr-12 ${errors.confirmPassword ? "border-error bg-error-container text-error focus:ring-4 focus:ring-error/10" : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface"}`} 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary p-1">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <div className="flex items-center mt-1 text-error animate-pulse"><AlertCircle size={14} className="mr-1" /><span className="text-xs font-bold">{errors.confirmPassword}</span></div>}
            </div>

          </div>

          <div className="md:col-span-2 pb-2 border-b border-primary/30 text-primary font-bold uppercase text-sm tracking-wider mt-8">Tu Perfil de Voluntario</div>
          {/* SECCIÓN: DISPONIBILIDAD DE TIEMPO */}
          <div className="md:col-span-2 mt-8">
            <label className="text-sm font-semibold text-on-surface block mb-4 uppercase tracking-wider text-primary">
              ¿Cuándo puedes ayudarnos?
            </label>
            
            <div className="bg-surface-container/50 rounded-xl border border-outline-variant/50 overflow-hidden">
              {/* Cabecera de la Tabla */}
              <div className="grid grid-cols-3 bg-primary/5 border-b border-primary/10 p-3">
                <div className="font-bold text-primary text-sm">Día</div>
                {JORNADAS.map(jornada => (
                  <div key={jornada.id} className="font-bold text-primary text-sm text-center">
                    {jornada.label.split(' ')[0]} <span className="hidden sm:inline text-xs font-normal opacity-70">{jornada.label.split(' ')[1]}</span>
                  </div>
                ))}
              </div>

              {/* Cuerpo de la Tabla */}
              <div className="divide-y divide-outline-variant/30">
                {DIAS_SEMANA.map(dia => {
                  const isActiveDay = formData.disponibilidad[dia]?.length > 0;
                  return (
                    <div key={dia} className={`grid grid-cols-3 p-3 transition-colors ${isActiveDay ? 'bg-white' : 'hover:bg-white/50'}`}>
                      <div className={`flex items-center text-sm font-medium ${isActiveDay ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {dia}
                      </div>
                      {JORNADAS.map(jornada => {
                        const isSelected = formData.disponibilidad[dia]?.includes(jornada.id);
                        return (
                          <div key={jornada.id} className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => toggleAvailability(dia, jornada.id)}
                              className={`
                                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border
                                ${isSelected 
                                  ? 'bg-primary text-white border-primary shadow-sm scale-110' 
                                  : 'bg-surface border-outline-variant text-transparent hover:border-primary/50'
                                }
                              `}
                            >
                              <Check size={18} strokeWidth={3} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 ml-1">
              * Selecciona los bloques aproximados. Podrás coordinar detalles específicos luego.
            </p>
          </div>

          <div className="md:col-span-2 pb-2 border-b border-primary/30 text-primary font-bold uppercase text-sm tracking-wider mt-8">Detalles de Perfil</div>

          {renderChipsSection("Áreas de Interés", "intereses", INTERESES_OPCIONES, showAllInterests, setShowAllInterests)}
          {renderChipsSection("Habilidades Destacadas", "habilidades", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills)}

          <div className="md:col-span-2 mt-10">
            <button type="submit" disabled={isLoading || isSuccess} className={`w-full font-bold py-4 rounded-xl shadow-xl transition-all transform text-lg flex justify-center items-center ${isLoading || isSuccess ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed shadow-none" : "bg-primary hover:bg-primary-dark text-white shadow-primary/30 active:scale-[0.98]"}`}>
              {isLoading ? <><Loader2 className="mr-3 animate-spin" size={24} /> Validando...</> : isSuccess ? "¡Bienvenido a la familia!" : "¡Completar Registro!"}
            </button>
          </div>
        </form>
      </div>
      <p className="mt-8 text-center text-on-surface-variant">¿Ya eres parte de FUNSAMEZ? <Link to="/login" className="text-primary font-bold hover:underline ml-1">Inicia Sesión</Link></p>
      
      <style>{`
        @keyframes progress-indeterminate { 0% { width: 0%; margin-left: 0%; } 50% { width: 70%; margin-left: 30%; } 100% { width: 0%; margin-left: 100%; } }
        .animate-progress-indeterminate { animation: progress-indeterminate 1.5s infinite ease-in-out; }
        @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};

export default RegisterPage;

```

### 📄 frontend/src/components/AdminDashboard.jsx
```javascript
import { useState, useEffect } from 'react';
import { Megaphone, Users, Heart, DollarSign, ArrowRight, TrendingUp, Package, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout'; // <--- IMPORTAMOS LA PLANTILLA MAESTRA

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Nota: Ya no necesitamos user_name ni activeNav aquí, AdminLayout se encarga.

  // --- DATOS DE EJEMPLO (MOCKS) ---
  const campaigns = [
    {
      id: 1,
      title: 'Educación Primera Infancia',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: false,
      goalAmount: 1000000,
      raisedAmount: 700000,
      status: 'active'
    },
    {
      id: 2,
      title: 'Ropero Solidario',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: false,
      acceptsInKind: true,
      status: 'active'
    },
    {
      id: 3,
      title: 'Mercados para Familias',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: true,
      goalAmount: 500000,
      raisedAmount: 200000,
      status: 'active'
    },
  ];

  const applications = [
    {
      id: 1,
      volunteerName: 'María García López',
      convocationTitle: 'Tutor de Matemáticas',
      status: 'pending',
      appliedAt: '2024-03-15'
    }
  ];

  const donations = [
    { id: 1, type: 'money', status: 'completed', amount: 150000 }
  ];

  const totalRaised = donations
    .filter(d => d.type === 'money' && d.status === 'completed')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const stats = [
    {
      label: 'Campañas Activas',
      value: campaigns.filter(c => c.status === 'active').length,
      icon: Megaphone,
      color: 'primary',
      link: '/admin/campanas',
    },
    {
      label: 'Postulaciones Pendientes',
      value: applications.filter(a => a.status === 'pending').length,
      icon: Users,
      color: 'secondary',
      link: '/admin/voluntarios',
    },
    {
      label: 'Donaciones del Mes',
      value: donations.length,
      icon: Heart,
      color: 'error',
      link: '/admin/donaciones',
    },
    {
      label: 'Total Recaudado',
      value: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'compact',
      }).format(totalRaised),
      icon: DollarSign,
      color: 'success',
      link: '/admin/donaciones',
    },
  ];

  // --- RENDERIZADO USANDO EL LAYOUT ---
  return (
    <AdminLayout 
      title="Panel de Administración" 
      subtitle="Bienvenido al centro de control de FUNSAMEZ. Gestiona campañas, voluntarios y donaciones."
    >
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="card-elevated group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                ${stat.color === 'secondary' ? 'bg-secondary/10' : ''}
                ${stat.color === 'error' ? 'bg-error/10' : ''}
                ${stat.color === 'success' ? 'bg-success/10' : ''}
              `}>
                <stat.icon className={`w-6 h-6
                  ${stat.color === 'primary' ? 'text-primary' : ''}
                  ${stat.color === 'secondary' ? 'text-secondary' : ''}
                  ${stat.color === 'error' ? 'text-error' : ''}
                  ${stat.color === 'success' ? 'text-success' : ''}
                `} />
              </div>
              <ArrowRight className="w-5 h-5 text-on-surface-variant 
                group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-headline-small text-on-surface font-bold mb-1">
              {stat.value}
            </p>
            <p className="text-body-medium text-on-surface-variant">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        
        {/* Recent Campaigns */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-large text-on-surface font-medium">
              Campañas Recientes
            </h2>
            <Link to="/admin/campanas" className="btn-text text-primary">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {campaigns.slice(0, 3).map(campaign => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-container 
                  hover:bg-surface-container-high transition-colors"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-title-small text-on-surface font-medium truncate">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {campaign.acceptsMoney && (
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-label-small">
                        Monetaria
                      </span>
                    )}
                    {campaign.acceptsInKind && (
                      <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-label-small">
                        <Package className="w-3 h-3 inline mr-1" />
                        Especie
                      </span>
                    )}
                  </div>
                </div>
                {campaign.acceptsMoney && campaign.goalAmount && (
                  <div className="text-right">
                    <span className="text-title-small text-primary font-medium">
                      {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%
                    </span>
                    <p className="text-label-small text-on-surface-variant">recaudado</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending Applications */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-large text-on-surface font-medium">
              Postulaciones Pendientes
            </h2>
            <Link to="/admin/voluntarios" className="btn-text text-primary">
              Ver todas
            </Link>
          </div>
          {applications.filter(a => a.status === 'pending').length > 0 ? (
            <div className="space-y-3">
              {applications
                .filter(a => a.status === 'pending')
                .slice(0, 3)
                .map(app => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-surface-container"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-small text-on-surface font-medium truncate">
                        {app.volunteerName}
                      </h3>
                      <p className="text-body-small text-on-surface-variant truncate">
                        {app.convocationTitle}
                      </p>
                    </div>
                    <span className="badge-pending">
                      <Calendar className="w-3 h-3" />
                      {app.appliedAt}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-on-surface-variant mx-auto mb-3" />
              <p className="text-body-medium text-on-surface-variant">
                No hay postulaciones pendientes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-title-large font-medium mb-2">
              ¡Excelente trabajo este mes!
            </h3>
            <p className="text-body-medium text-white/90">
              Las donaciones han aumentado un 25% comparado con el mes anterior.
              Sigue impulsando las campañas activas.
            </p>
          </div>
          <Link
            to="/admin/donaciones"
            className="btn-filled bg-white text-primary hover:bg-white/90"
          >
            Ver Reportes
          </Link>
        </div>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
```

### 📄 frontend/src/components/AdminLayout.jsx
```javascript
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Users, Heart, Home, LogOut, Briefcase } from 'lucide-react';

export default function AdminLayout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Administrador';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    // Agregamos pb-24 (padding-bottom) en móviles para que el dock no tape el contenido
    <div className="flex min-h-screen bg-surface pb-32 md:pb-0">
      
      {/* --- SIDEBAR (PC) --- */}
      <aside className="w-[300px] bg-white border-r border-outline-variant hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        {/* Logo Section */}
        <div className="px-6 py-6 flex items-center gap-4 border-b border-outline-variant">
          <div className="bg-primary p-2.5 rounded-xl shrink-0 shadow-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-on-surface text-base truncate tracking-tight">FUNSAMEZ</h2>
            <p className="text-xs text-on-surface-variant truncate font-medium">Panel Administrativo</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-6 p-4 bg-secondary-container rounded-2xl flex items-center gap-4 shadow-sm border border-secondary/10">
          <div className="w-12 h-12 shrink-0 bg-white text-secondary rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-container truncate leading-tight">{userName}</p>
            <p className="text-sm text-secondary font-medium truncate opacity-90">Administrador</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={22}/>} text="Dashboard" active={isActive('/dashboard')} onClick={() => navigate('/dashboard')} />
          <NavItem icon={<Megaphone size={22}/>} text="Campañas" active={isActive('/admin/campanas')} onClick={() => navigate('/admin/campanas')} />
          <NavItem icon={<Briefcase size={22}/>} text="Convocatorias" active={isActive('/admin/convocatorias')} onClick={() => navigate('/admin/convocatorias')} />
          <NavItem icon={<Users size={22}/>} text="Voluntarios" active={isActive('/admin/voluntarios')} onClick={() => navigate('/admin/voluntarios')} />
          <NavItem icon={<Heart size={22}/>} text="Donaciones" active={isActive('/admin/donaciones')} onClick={() => navigate('/admin/donaciones')} />
          <NavItem icon={<Home size={22}/>} text="Editor de Inicio" active={isActive('/admin/editor-inicio')} onClick={() => navigate('/admin/editor-inicio')} />
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-outline-variant mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-4 text-on-surface-variant hover:text-error transition-colors w-full px-4 py-3.5 rounded-xl hover:bg-error-container/30 group">
            <LogOut size={22} className="group-hover:stroke-error" />
            <span className="text-base font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- DOCK DE NAVEGACIÓN (MÓVIL) --- */}
      <nav className="md:hidden fixed bottom-6 inset-x-4 bg-surface/80 backdrop-blur-xl border border-white/20 z-40 flex items-center justify-around p-2 rounded-3xl shadow-elevation-4">
        <MobileNavItem icon={<LayoutDashboard size={22}/>} text="Inicio" active={isActive('/dashboard')} onClick={() => navigate('/dashboard')} />
        <MobileNavItem icon={<Megaphone size={22}/>} text="Campañas" active={isActive('/admin/campanas')} onClick={() => navigate('/admin/campanas')} />
        <MobileNavItem icon={<Briefcase size={22}/>} text="Convos" active={isActive('/admin/convocatorias')} onClick={() => navigate('/admin/convocatorias')} />
        <MobileNavItem icon={<Users size={22}/>} text="Voluntarios" active={isActive('/admin/voluntarios')} onClick={() => navigate('/admin/voluntarios')} />
        
        {/* Botón Salir pequeño */}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-error transition-colors opacity-70 hover:opacity-100">
          <LogOut size={22} />
        </button>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 md:p-6 md:ml-[300px] w-full max-w-[100vw] overflow-x-hidden">
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Header Dinámico (Solo en PC o si lo deseas en móvil, aquí lo dejamos estándar) */}
            <div className="mb-6 md:mb-8 mt-2 md:mt-0">
                <h1 className="text-headline-small md:text-headline-medium text-on-surface font-bold mb-1 md:mb-2">
                    {title}
                </h1>
                <p className="text-body-medium md:text-body-large text-on-surface-variant">
                    {subtitle}
                </p>
            </div>
            {children}
        </div>
      </main>
    </div>
  );
}

// Subcomponente NavItem (PC)
const NavItem = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 ${active ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'}`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-base truncate">{text}</span>
  </button>
);

// Subcomponente NavItem (Móvil)
const MobileNavItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
    <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-primary/15' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
  </button>
);
```

### 📄 frontend/src/components/TimePickerMD3.jsx
```javascript
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function TimePickerMD3({ label, value, onChange }) {
  // --- 1. LÓGICA DE DATOS ---
  const parseTime = (val) => {
    if (!val) return { hour: '12', minute: '00', period: 'AM' };
    let [h, m] = val.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12; 
    return { 
      hour: h.toString().padStart(2, '0'), 
      minute: m.toString().padStart(2, '0'), 
      period 
    };
  };

  const [time, setTime] = useState(parseTime(value));
  const [isOpen, setIsOpen] = useState(false);
  
  // Sincronizar valor externo solo cuando el modal se abre o cambia la prop
  useEffect(() => {
    if (!isOpen) {
        setTime(parseTime(value));
    }
  }, [value, isOpen]);

  // Función para guardar cambios finales (formateados)
  const commitTime = (newTimeState) => {
    let h = parseInt(newTimeState.hour || '0');
    let m = parseInt(newTimeState.minute || '0');

    // Validaciones finales al guardar
    if (h > 12) h = 12;
    if (h < 1) h = 12; // Si pone 0 en hora, asume 12
    if (m > 59) m = 59;

    const formattedHour = h.toString().padStart(2, '0');
    const formattedMinute = m.toString().padStart(2, '0');
    
    // Actualizamos estado local visualmente bonito
    const finalState = { ...newTimeState, hour: formattedHour, minute: formattedMinute };
    setTime(finalState);

    // Enviamos formato 24h al padre
    let h24 = h;
    if (newTimeState.period === 'PM' && h24 !== 12) h24 += 12;
    if (newTimeState.period === 'AM' && h24 === 12) h24 = 0;
    
    const h24Str = h24.toString().padStart(2, '0');
    onChange(`${h24Str}:${formattedMinute}`);
  };

  const handleFocus = (e) => e.target.select();

  return (
    <>
      {/* --- LABEL --- */}
      {label && <label className="block text-xs font-bold text-on-surface-variant mb-1 ml-1">{label}</label>}

      {/* --- TRIGGER VISUAL (El input que ves en el formulario) --- */}
      <div 
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all bg-surface-container-high
          ${isOpen ? 'border-primary ring-2 ring-primary/20 bg-white' : 'border-transparent hover:bg-surface-container-highest'}
        `}
      >
        <span className={`text-sm font-medium ${value ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
           {time.hour}:{time.minute} <span className="text-xs font-bold text-primary ml-1">{time.period}</span>
        </span>
      </div>

      {/* --- MODAL DIÁLOGO (OPTIMIZADO) --- */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 isolate" style={{touchAction: 'none'}}>
            
            {/* Backdrop: SIN BLUR para no sobrecargar el móvil. Solo color sólido. */}
            <div 
                className="absolute inset-0 bg-black/50 animate-fade-in gpu-accelerated"
                onClick={() => {
                    commitTime(time); 
                    setIsOpen(false);
                }}
            ></div>

            {/* Diálogo del Reloj con aceleración GPU */}
            <div className="relative bg-surface-container-high p-6 rounded-[28px] shadow-elevation-4 border border-outline-variant w-full max-w-[340px] transform animate-scale-in flex flex-col items-center gpu-accelerated">
                
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-6 w-full text-left">Ingresar Hora</div>
                
                {/* Contenedor Inputs + AM/PM */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    
                    {/* INPUT HORA */}
                    <div className="flex flex-col gap-2 items-center">
                        <input 
                            type="text" 
                            inputMode="numeric"
                            maxLength={2}
                            value={time.hour}
                            onFocus={handleFocus}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setTime({ ...time, hour: val });
                            }}
                            onBlur={() => commitTime(time)}
                            className="w-[96px] h-[80px] text-[57px] leading-[64px] text-center font-normal bg-surface-container-highest rounded-xl text-on-surface focus:bg-primary/10 focus:text-primary outline-none transition-colors border border-transparent focus:border-primary/50 caret-primary"
                        />
                        <span className="text-xs font-medium text-on-surface-variant">Hora</span>
                    </div>

                    <span className="text-4xl text-on-surface pb-6">:</span>

                    {/* INPUT MINUTOS */}
                    <div className="flex flex-col gap-2 items-center">
                        <input 
                            type="text" 
                            inputMode="numeric"
                            maxLength={2}
                            value={time.minute}
                            onFocus={handleFocus}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setTime({ ...time, minute: val });
                            }}
                            onBlur={() => commitTime(time)}
                            className="w-[96px] h-[80px] text-[57px] leading-[64px] text-center font-normal bg-surface-container-highest rounded-xl text-on-surface focus:bg-primary/10 focus:text-primary outline-none transition-colors border border-transparent focus:border-primary/50 caret-primary"
                        />
                        <span className="text-xs font-medium text-on-surface-variant">Minutos</span>
                    </div>

                    {/* SELECTOR AM/PM */}
                    <div className="flex flex-col h-[80px] justify-between border border-outline-variant rounded-xl overflow-hidden ml-3 bg-surface w-[52px] mb-6 shadow-sm">
                        <button 
                            type="button"
                            onClick={() => { const newState = { ...time, period: 'AM' }; setTime(newState); commitTime(newState); }}
                            className={`h-1/2 flex items-center justify-center text-sm font-bold transition-colors border-b border-outline-variant ${time.period === 'AM' ? 'bg-tertiary-container text-tertiary-on-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
                        >AM</button>
                        <button 
                            type="button"
                            onClick={() => { const newState = { ...time, period: 'PM' }; setTime(newState); commitTime(newState); }}
                            className={`h-1/2 flex items-center justify-center text-sm font-bold transition-colors ${time.period === 'PM' ? 'bg-tertiary-container text-tertiary-on-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
                        >PM</button>
                    </div>
                </div>

                {/* Botón Aceptar */}
                <div className="w-full flex justify-end">
                    <button 
                        type="button" 
                        onClick={() => { commitTime(time); setIsOpen(false); }} 
                        className="text-primary font-bold text-sm px-6 py-2.5 hover:bg-primary/10 rounded-full transition-colors"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
}
```

### 📄 frontend/src/components/VolunteerDashboard.jsx
```javascript
import { useState, useEffect } from 'react';
import { LayoutDashboard, User, Briefcase, FileText, LogOut, MapPin, Clock, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  // Datos de ejemplo (reemplazar con useApp y useAuth cuando estén disponibles)
  const user = {
    id: 1,
    name: localStorage.getItem('user_name') || 'María García López'
  };

  const convocations = [
    {
      id: 1,
      title: 'Tutor de Matemáticas',
      commitment: '5 horas/semana',
      location: 'Centro Comunitario La Esperanza',
      status: 'open'
    },
    {
      id: 2,
      title: 'Logística de Eventos',
      commitment: 'Fines de semana (según eventos)',
      location: 'Variable',
      status: 'open'
    },
    {
      id: 3,
      title: 'Apoyo Educativo',
      commitment: '3 horas/semana',
      location: 'Virtual',
      status: 'open'
    }
  ];

  const myApplications = [
    {
      id: 1,
      convocationTitle: 'Tutor de Matemáticas',
      status: 'pending',
      appliedAt: '2024-03-15'
    }
  ];

  const pendingApplications = myApplications.filter(a => a.status === 'pending');
  const acceptedApplications = myApplications.filter(a => a.status === 'accepted');

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Voluntario';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const stats = [
    {
      label: 'Convocatorias Abiertas',
      value: convocations.filter(c => c.status === 'open').length,
      icon: Briefcase,
      color: 'primary',
      link: '/voluntario/convocatorias'
    },
    {
      label: 'Postulaciones Pendientes',
      value: pendingApplications.length,
      icon: Clock,
      color: 'warning',
      link: '/voluntario/postulaciones'
    },
    {
      label: 'Posiciones Activas',
      value: acceptedApplications.length,
      icon: CheckCircle2,
      color: 'success',
      link: '/voluntario/postulaciones'
    },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      
      {/* --- SIDEBAR (MANTENIDO DEL DISEÑO ACTUAL) --- */}
      <aside className="w-[280px] bg-white border-r border-outline-variant hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        
        {/* Logo Section */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-outline-variant">
          <div className="bg-primary p-2 rounded-lg shrink-0">
            <div className="w-5 h-5 bg-white/20 rounded-full" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-on-surface text-sm truncate">FUNSAMEZ</h2>
            <p className="text-xs text-on-surface-variant truncate">Portal Voluntario</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-4 p-3 bg-surface-container rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-on-surface truncate">{userName}</p>
            <p className="text-xs text-on-surface-variant truncate">voluntario@funsamez.org</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            text="Inicio" 
            active={activeNav === 'home'}
            onClick={() => setActiveNav('home')}
          />
          <NavItem 
            icon={<User size={18}/>} 
            text="Mi Perfil" 
            active={activeNav === 'profile'}
            onClick={() => setActiveNav('profile')}
          />
          <NavItem 
            icon={<Briefcase size={18}/>} 
            text="Convocatorias" 
            active={activeNav === 'jobs'}
            onClick={() => setActiveNav('jobs')}
          />
          <NavItem 
            icon={<FileText size={18}/>} 
            text="Mis Postulaciones" 
            active={activeNav === 'applications'}
            onClick={() => setActiveNav('applications')}
          />
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-outline-variant">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 text-on-surface-variant hover:text-error transition-colors w-full px-3 py-2.5 rounded-lg hover:bg-error-container/20"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL (NUEVO DISEÑO MATERIAL 3) --- */}
      <main className="flex-1 p-6 md:ml-[280px] overflow-y-auto">
        <div className="max-w-5xl mx-auto animate-fade-in">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-headline-medium text-on-surface font-bold mb-2">
              ¡Hola, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Bienvenido a tu portal de voluntariado. Aquí puedes gestionar tu perfil y postulaciones.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Link
                key={index}
                to={stat.link}
                className="card-elevated group hover:scale-[1.02] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                    ${stat.color === 'warning' ? 'bg-warning-container' : ''}
                    ${stat.color === 'success' ? 'bg-success-container' : ''}
                  `}>
                    <stat.icon className={`w-6 h-6
                      ${stat.color === 'primary' ? 'text-primary' : ''}
                      ${stat.color === 'warning' ? 'text-warning' : ''}
                      ${stat.color === 'success' ? 'text-success' : ''}
                    `} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant 
                    group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-display-small text-on-surface font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-body-medium text-on-surface-variant">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Recent Convocations */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Convocatorias Recientes
                </h2>
                <Link to="/voluntario/convocatorias" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-4">
                {convocations.slice(0, 2).map(convocation => (
                  <div
                    key={convocation.id}
                    className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high 
                      transition-colors"
                  >
                    <h3 className="text-title-medium text-on-surface font-medium mb-2">
                      {convocation.title}
                    </h3>
                    <div className="flex items-center gap-4 text-body-small text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {convocation.commitment}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {convocation.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Applications Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Estado de Postulaciones
                </h2>
                <Link to="/voluntario/postulaciones" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>

              {myApplications.length > 0 ? (
                <div className="space-y-4">
                  {myApplications.slice(0, 3).map(application => (
                    <div
                      key={application.id}
                      className="p-4 rounded-xl bg-surface-container flex items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title-small text-on-surface font-medium truncate">
                          {application.convocationTitle}
                        </h3>
                        <p className="text-body-small text-on-surface-variant">
                          Aplicado el {application.appliedAt}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-label-small font-medium
                        ${application.status === 'pending' ? 'bg-warning-container text-warning' : ''}
                        ${application.status === 'accepted' ? 'bg-success-container text-success' : ''}
                        ${application.status === 'rejected' ? 'bg-error-container text-error' : ''}
                      `}>
                        {application.status === 'pending' && 'Pendiente'}
                        {application.status === 'accepted' && 'Aceptado'}
                        {application.status === 'rejected' && 'Rechazado'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
                  <p className="text-body-medium text-on-surface-variant">
                    Aún no tienes postulaciones
                  </p>
                  <Link to="/voluntario/convocatorias" className="btn-tonal mt-4">
                    Explorar Convocatorias
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 
            border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-title-large text-on-surface font-medium mb-2">
                  ¡Gracias por ser voluntario!
                </h3>
                <p className="text-body-medium text-on-surface-variant">
                  Tu dedicación y tiempo hacen posible que sigamos transformando vidas.
                  Juntos somos más fuertes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- COMPONENTE DE NAVEGACIÓN ---
const NavItem = ({ icon, text, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all
        ${active 
          ? 'bg-primary/10 text-primary font-semibold' 
          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm truncate">{text}</span>
    </button>
  );
};

export default VolunteerDashboard;

```

