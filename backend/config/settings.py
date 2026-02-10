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