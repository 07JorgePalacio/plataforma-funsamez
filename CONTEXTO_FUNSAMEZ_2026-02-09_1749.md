# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)
📅 Generado: 2026-02-09 17:49:05.417581

## 1. ESTRUCTURA DE CARPETAS ACTUAL
```text
├── .gitignore
├── CONTEXTO_FUNSAMEZ_2026-02-09_1749.md
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
│   │           ├── django/
│   │           │   ├── __init__.py
│   │           │   ├── apps.py
│   │           │   ├── migrations/
│   │           │   │   ├── 0001_initial.py
│   │           │   │   └── __init__.py
│   │           │   ├── models.py
│   │           │   └── repositories/
│   │           │       ├── __init__.py
│   │           │       ├── postgres_convocatoria_repository.py
│   │           │       └── postgres_user_repository.py
│   │           └── migrations/
│   │               └── __init__.py
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
│   │   │   └── VolunteerDashboard.jsx
│   │   ├── context/
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── services/
│   ├── tailwind.config.js
│   └── vite.config.js
└── generar_contexto.py
```

## 2. CÓDIGO FUENTE (ARCHIVOS CLAVE)

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

    # --- NUEVOS CAMPOS (HU05-RF-01) ---
    fecha_nacimiento: Optional[str] = None
    
    # AGREGADO: Tipo de documento (Por defecto CC para compatibilidad)
    tipo_documento: str = 'CC' 
    
    numero_identificacion: Optional[str] = None
    profesion: Optional[str] = None
    intereses: Optional[List[str]] = None
    habilidades: Optional[List[str]] = None

    def check_password(self, raw_password: str) -> bool:
        return False
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
    id: Optional[int] = None
    estado: str = "abierta"
    habilidades_requeridas: str = "" # Texto plano según tu SQL
    fecha_creacion: Optional[datetime] = None

    def esta_activa(self) -> bool:
        ahora = datetime.now()
        return (
            self.estado == "abierta" and 
            self.fecha_inicio <= ahora <= self.fecha_fin and
            self.cupos_disponibles > 0
        )
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

### 📄 backend/core/application/use_cases/register_user.py
```python
import hashlib
from typing import List, Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository

class RegisterUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, nombre_completo: str, email: str, password: str, 
                tipo_documento: str,  # <--- NUEVO ARGUMENTO OBLIGATORIO
                numero_identificacion: str, # <--- NUEVO ARGUMENTO OBLIGATORIO
                telefono: Optional[str] = None, direccion: Optional[str] = None,
                fecha_nacimiento: Optional[str] = None, 
                profesion: Optional[str] = None, intereses: List[str] = None, 
                habilidades: List[str] = None) -> User:
        
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
            
            # Nuevos campos
            fecha_nacimiento=fecha_nacimiento,
            tipo_documento=tipo_documento,       # <--- ASIGNAMOS AQUÍ
            numero_identificacion=numero_identificacion,
            profesion=profesion,
            intereses=intereses or [],
            habilidades=habilidades or []
        )

        # 4. Guardar
        return self.user_repository.save(new_user)
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

### 📄 backend/core/application/use_cases/crear_convocatoria.py
```python
from datetime import datetime
from core.domain.entities.convocatoria import Convocatoria
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def ejecutar(self, titulo: str, descripcion: str, fecha_inicio: datetime, 
                 fecha_fin: datetime, cupos: int, id_usuario: int, habilidades: str) -> Convocatoria:
        
        # 1. Validaciones de Negocio (Ejemplo simple)
        if fecha_inicio >= fecha_fin:
            raise ValueError("La fecha de inicio debe ser anterior a la fecha de fin.")
            
        if cupos <= 0:
            raise ValueError("Debe haber al menos 1 cupo disponible.")

        # 2. Crear la Entidad
        nueva_convocatoria = Convocatoria(
            id=None, # Se genera en BD
            titulo=titulo,
            descripcion=descripcion,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos,
            id_usuario_creador=id_usuario,
            habilidades_requeridas=habilidades
        )

        # 3. Persistir usando el Puerto
        return self.repository.crear(nueva_convocatoria)
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
    
    # ⬇️ NUEVO: Método para compatibilidad con código existente ⬇️
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
        db_column='id_usuario_creador', # Importante: nombre exacto en tu SQL
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
                
                # Campos Nuevos
                'fecha_nacimiento': user.fecha_nacimiento,
                'tipo_documento': user.tipo_documento, # <--- AGREGAR AQUÍ
                'numero_identificacion': user.numero_identificacion,
                'profesion': user.profesion,
                'intereses': user.intereses or [],
                'habilidades': user.habilidades or []
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
            tipo_documento=model.tipo_documento, # <--- AGREGAR AQUÍ
            numero_identificacion=model.numero_identificacion,
            profesion=model.profesion,
            intereses=model.intereses,
            habilidades=model.habilidades
        )
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
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            cupos_disponibles=model.cupos_disponibles,
            id_usuario_creador=model.usuario_creador.id,
            estado=model.estado,
            habilidades_requeridas=model.habilidades_requeridas,
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
            fecha_inicio=convocatoria.fecha_inicio,
            fecha_fin=convocatoria.fecha_fin,
            cupos_disponibles=convocatoria.cupos_disponibles,
            estado=convocatoria.estado,
            habilidades_requeridas=convocatoria.habilidades_requeridas
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
                password=data['password'],  # ⬅️ set_password se llama automáticamente
                nombre_completo=data['full_name'],
                numero_telefono=data.get('phone_number'),
                direccion=data.get('address'),
                rol=data.get('role', 'voluntario'),
                fecha_nacimiento=data.get('fecha_nacimiento'),
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', [])
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
            return Response({"error": "Error al crear el usuario"}, status=status.HTTP_400_BAD_REQUEST)


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

### 📄 backend/core/adapters/api/rest/views/convocatoria_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers import ConvocatoriaSerializer

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated] # Solo usuarios logueados (Admin/Líder)

    def post(self, request):
        # 1. Validar datos de entrada con el Serializer
        serializer = ConvocatoriaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 2. Invocar el Caso de Uso (Lógica Pura)
            # Nota: request.user.id viene del token JWT
            nueva_convocatoria = Container.crear_convocatoria_use_case.ejecutar(
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id, # El ID del usuario logueado
                habilidades=data.get('habilidades_requeridas', '')
            )

            # 3. Responder
            # Convertimos la Entidad de Dominio resultante a diccionario para la respuesta
            response_data = {
                "id": nueva_convocatoria.id,
                "titulo": nueva_convocatoria.titulo,
                "mensaje": "Convocatoria creada exitosamente"
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            # Captura errores de negocio (ej: Fechas inválidas)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Captura errores inesperados
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/urls.py
```python
from django.urls import path
from core.adapters.api.rest.views.user_views import RegisterUserView, LoginUserView
from core.adapters.api.rest.views.convocatoria_views import CrearConvocatoriaView

urlpatterns = [
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
    path('convocatorias/crear/', CrearConvocatoriaView.as_view(), name='crear_convocatoria'),
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <--- Importar
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* <--- Nueva Ruta */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
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
    telefono: '', 
    fecha_nacimiento: '',
    tipo_documento: 'CC',
    numero_identificacion: '',
    profesion: '',
    intereses: [], 
    habilidades: [] 
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

  const validateForm = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = ["La contraseña debe tener mínimo 8 caracteres."];
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

          <div className="md:col-span-2 space-y-1 relative z-10 scroll-mt-24" id="field-password">
            <label className="text-sm font-semibold text-on-surface">Contraseña <span className="text-error">*</span></label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="Mínimo 8 caracteres"
                className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all pr-12 ${errors.password ? "border-error bg-error-container text-error" : "border-outline-variant bg-surface-container focus:border-primary text-on-surface"}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary p-1">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <div className="flex items-center mt-1 text-error animate-pulse"><AlertCircle size={14} className="mr-1" /><span className="text-xs font-bold">{errors.password}</span></div>}
          </div>

          <div className="md:col-span-2 pb-2 border-b border-primary/30 text-primary font-bold uppercase text-sm tracking-wider mt-8">Tu Perfil de Voluntario</div>
          
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

### 📄 frontend/src/components/AdminDashboard.jsx
```javascript
import { useState, useEffect } from 'react';
import { LayoutDashboard, Megaphone, Users, Heart, Home, LogOut, Briefcase, DollarSign, ArrowRight, TrendingUp, Calendar, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');

  // Datos de ejemplo (reemplazar con useApp cuando esté disponible)
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

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Administrador';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
            <p className="text-xs text-on-surface-variant truncate">Panel Administrativo</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-4 p-3 bg-surface-container rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-on-surface truncate">Administrador FUNSAMEZ</p>
            <p className="text-xs text-on-surface-variant truncate">Administrador</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            text="Dashboard" 
            active={activeNav === 'dashboard'}
            onClick={() => setActiveNav('dashboard')}
          />
          <NavItem 
            icon={<Megaphone size={18}/>} 
            text="Campañas" 
            active={activeNav === 'campaigns'}
            onClick={() => setActiveNav('campaigns')}
          />
          <NavItem 
            icon={<Briefcase size={18}/>} 
            text="Convocatorias" 
            active={activeNav === 'jobs'}
            onClick={() => setActiveNav('jobs')}
          />
          <NavItem 
            icon={<Users size={18}/>} 
            text="Voluntarios" 
            active={activeNav === 'volunteers'}
            onClick={() => setActiveNav('volunteers')}
          />
          <NavItem 
            icon={<Heart size={18}/>} 
            text="Donaciones" 
            active={activeNav === 'donations'}
            onClick={() => setActiveNav('donations')}
          />
          <NavItem 
            icon={<Home size={18}/>} 
            text="Editor de Inicio" 
            active={activeNav === 'home-editor'}
            onClick={() => setActiveNav('home-editor')}
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
      <main className="flex-1 p-6 md:ml-[280px]">
        <div className="max-w-6xl mx-auto animate-fade-in">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-headline-medium text-on-surface font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Bienvenido al centro de control de FUNSAMEZ. Gestiona campañas, voluntarios y donaciones.
            </p>
          </div>

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

export default AdminDashboard;

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

