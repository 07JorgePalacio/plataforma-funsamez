# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)
📅 Generado: 2026-02-19 19:11:09.537272
ℹ️ Modo: Escaneo Inteligente de Carpetas

## 1. ESTRUCTURA DE CARPETAS
```text
├── .gitignore
├── CONTEXTO_FUNSAMEZ_2026-02-19_1911.md
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
│   │   │   │   │   ├── serializers/
│   │   │   │   │   │   ├── __init__.py
│   │   │   │   │   │   ├── campana_serializers.py
│   │   │   │   │   │   ├── convocatoria_serializers.py
│   │   │   │   │   │   ├── postulacion_serializers.py
│   │   │   │   │   │   └── user_serializers.py
│   │   │   │   │   └── views/
│   │   │   │   │       ├── __init__.py
│   │   │   │   │       ├── campana_views.py
│   │   │   │   │       ├── convocatoria_views.py
│   │   │   │   │       ├── postulacion_views.py
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
│   │   │   │   │   ├── campana_use_cases.py
│   │   │   │   │   ├── convocatoria_use_cases.py
│   │   │   │   │   ├── postulacion_use_cases.py
│   │   │   │   │   └── user_use_cases.py
│   │   │   │   └── output/
│   │   │   │       ├── __init__.py
│   │   │   │       ├── campana_repository.py
│   │   │   │       ├── convocatoria_repository.py
│   │   │   │       ├── postulacion_repository.py
│   │   │   │       └── user_repository.py
│   │   │   └── use_cases/
│   │   │       ├── campana/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── actualizar_campana.py
│   │   │       │   ├── crear_campana.py
│   │   │       │   ├── eliminar_campana.py
│   │   │       │   └── listar_campanas.py
│   │   │       ├── convocatoria/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── actualizar_convocatoria.py
│   │   │       │   ├── crear_convocatoria.py
│   │   │       │   ├── eliminar_convocatoria.py
│   │   │       │   └── listar_convocatorias.py
│   │   │       ├── postulacion/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── listar_mis_postulaciones.py
│   │   │       │   └── postular_voluntario.py
│   │   │       └── user/
│   │   │           ├── __init__.py
│   │   │           ├── login_user.py
│   │   │           └── register_user.py
│   │   ├── container.py
│   │   ├── domain/
│   │   │   ├── __init__.py
│   │   │   ├── entities/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── campana.py
│   │   │   │   ├── convocatoria.py
│   │   │   │   ├── postulacion.py
│   │   │   │   └── user.py
│   │   │   ├── exceptions/
│   │   │   │   └── __init__.py
│   │   │   ├── services/
│   │   │   │   └── campana_service.py
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
│   │                   ├── postgres_campana_repository.py
│   │                   ├── postgres_convocatoria_repository.py
│   │                   ├── postgres_postulacion_repository.py
│   │                   └── postgres_user_repository.py
│   └── manage.py
├── backend.zip
├── correcciones_post_cirugia.py
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
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Snackbar.jsx
│   │   │   ├── TimePickerMD3.jsx
│   │   │   └── VolunteerDashboard.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── AdminCampaignsPage.jsx
│   │   │   ├── AdminConvocationsPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── services/
│   │       ├── campaignService.js
│   │       ├── convocatoriaService.js
│   │       └── voluntariadoService.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── generar_contexto.py
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
    path('api/', include('core.adapters.api.urls')),
]
```

### 📄 backend/core/container.py
```python
# --- REPOSITORIOS (INFRAESTRUCTURA) ---
from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.infrastructure.persistence.django.repositories.postgres_convocatoria_repository import PostgresConvocatoriaRepository
from core.infrastructure.persistence.django.repositories.postgres_campana_repository import PostgresCampanaRepository
from core.infrastructure.persistence.django.repositories.postgres_postulacion_repository import PostgresPostulacionRepository

# --- CASOS DE USO: USUARIOS ---
from core.application.use_cases.user.register_user import RegisterUser
from core.application.use_cases.user.login_user import LoginUser

# --- CASOS DE USO: CONVOCATORIAS ---
from core.application.use_cases.convocatoria.crear_convocatoria import CrearConvocatoriaUseCase
from core.application.use_cases.convocatoria.listar_convocatorias import ListarConvocatoriasUseCase
from core.application.use_cases.convocatoria.actualizar_convocatoria import ActualizarConvocatoriaUseCase
from core.application.use_cases.convocatoria.eliminar_convocatoria import EliminarConvocatoriaUseCase

# --- CASOS DE USO: CAMPAÑAS ---
from core.application.use_cases.campana.crear_campana import CrearCampanaUseCase
from core.application.use_cases.campana.listar_campanas import ListarCampanasUseCase
from core.application.use_cases.campana.actualizar_campana import ActualizarCampanaUseCase
from core.application.use_cases.campana.eliminar_campana import EliminarCampanaUseCase

# --- CASOS DE USO: POSTULACIONES ---
from core.application.use_cases.postulacion.postular_voluntario import PostularVoluntarioUseCase
from core.application.use_cases.postulacion.listar_mis_postulaciones import ListarMisPostulacionesUseCase

class Container:
    """
    Contenedor de Inyección de Dependencias (DI).
    PATRÓN ESTANDARIZADO: Factory Methods con @staticmethod y Singleton para repositorios.
    """
    
    # ==========================================
    #  REPOSITORIOS (Instancias Privadas - Singleton)
    # ==========================================
    _user_repository = None
    _convocatoria_repository = None
    _campana_repository = None
    _postulacion_repository = None

    # ==========================================
    #  1. USUARIOS
    # ==========================================
    @staticmethod
    def get_user_repository():
        if Container._user_repository is None:
            Container._user_repository = PostgresUserRepository()
        return Container._user_repository

    @staticmethod
    def register_user_use_case() -> RegisterUser:
        return RegisterUser(user_repository=Container.get_user_repository())
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        return LoginUser(user_repository=Container.get_user_repository())

    # ==========================================
    #  2. CONVOCATORIAS
    # ==========================================
    @staticmethod
    def get_convocatoria_repository():
        if Container._convocatoria_repository is None:
            Container._convocatoria_repository = PostgresConvocatoriaRepository()
        return Container._convocatoria_repository

    @staticmethod
    def crear_convocatoria_use_case() -> CrearConvocatoriaUseCase:
        return CrearConvocatoriaUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def listar_convocatorias_use_case() -> ListarConvocatoriasUseCase:
        return ListarConvocatoriasUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def actualizar_convocatoria_use_case() -> ActualizarConvocatoriaUseCase:
        return ActualizarConvocatoriaUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def eliminar_convocatoria_use_case() -> EliminarConvocatoriaUseCase:
        return EliminarConvocatoriaUseCase(repository=Container.get_convocatoria_repository())

    # ==========================================
    #  3. CAMPAÑAS
    # ==========================================
    @staticmethod
    def get_campana_repository():
        if Container._campana_repository is None:
            Container._campana_repository = PostgresCampanaRepository()
        return Container._campana_repository

    @staticmethod
    def crear_campana_use_case() -> CrearCampanaUseCase:
        return CrearCampanaUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def listar_campanas_use_case() -> ListarCampanasUseCase:
        return ListarCampanasUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def actualizar_campana_use_case() -> ActualizarCampanaUseCase:
        return ActualizarCampanaUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def eliminar_campana_use_case() -> EliminarCampanaUseCase:
        return EliminarCampanaUseCase(repository=Container.get_campana_repository())

    # ==========================================
    #  4. POSTULACIONES (VOLUNTARIADO)
    # ==========================================
    @staticmethod
    def get_postulacion_repository():
        if Container._postulacion_repository is None:
            Container._postulacion_repository = PostgresPostulacionRepository()
        return Container._postulacion_repository

    @staticmethod
    def postular_voluntario_use_case() -> PostularVoluntarioUseCase:
        return PostularVoluntarioUseCase(
            postulacion_repository=Container.get_postulacion_repository(),
            convocatoria_repository=Container.get_convocatoria_repository()
        )

    @staticmethod
    def listar_mis_postulaciones_use_case() -> ListarMisPostulacionesUseCase:
        return ListarMisPostulacionesUseCase(
            postulacion_repository=Container.get_postulacion_repository()
        )
```

### 📄 backend/core/domain/entities/__init__.py
```python

```

### 📄 backend/core/domain/entities/campana.py
```python
from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Optional, List

@dataclass
class Campana:
    # 1. Identificación
    id_usuario_creador: int
    id: Optional[int] = None

    # 2. Información Básica & Portada
    titulo: str = ""
    descripcion: str = ""
    imagen_url: str = "" # Foto Principal

    # 3. Tiempos y Estado
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[date] = None
    estado: str = "activa"
    fecha_creacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None

    # 4. Configuración Financiera / Donaciones
    monto_objetivo: int = 0
    recaudo_actual: int = 0
    permite_donacion_monetaria: bool = True
    permite_donacion_especie: bool = True

    # 5. Listas y JSON (Al final)
    objetivos: List[str] = field(default_factory=list) 
    galeria_imagenes: List[str] = field(default_factory=list)
    necesidades: List[str] = field(default_factory=list)
    categoria: List[str] = field(default_factory=list)
    tipo_impacto: List[str] = field(default_factory=list)
```

### 📄 backend/core/domain/entities/convocatoria.py
```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List, Dict, Any

@dataclass
class Convocatoria:
    # --- 1. Identificación ---
    id_usuario_creador: int
    id: Optional[int] = None

    # --- 2. Información Básica ---
    titulo: str = ""
    descripcion: str = ""

    # --- 3. Logística ---
    ubicacion: str = ""
    link_whatsapp: str = ""
    modalidad: str = "presencial" # 🟢 Parte del problema (Aseguramos default)

    # --- 4. Tiempos y Cupos ---
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    cupos_disponibles: int = 0

    # --- 5. Estado ---
    estado: str = "abierta"
    fecha_creacion: Optional[datetime] = None

    # --- 6. Listas y JSON (Al final por estándar) ---
    habilidades_requeridas: str = "" 
    categorias: List[str] = None 
    horario: Dict[str, Any] = None
    beneficios: List[str] = None # 🟢 Parte del problema (Aseguramos que exista el campo)

    def esta_activa(self) -> bool:
        ahora = datetime.now()
        if not self.fecha_inicio or not self.fecha_fin:
            return False
        return (
            self.estado == "abierta" and 
            self.fecha_inicio <= ahora <= self.fecha_fin and
            self.cupos_disponibles > 0
        )
    

```

### 📄 backend/core/domain/entities/postulacion.py
```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict

@dataclass
class Postulacion:
    """
    Entidad de Dominio: Postulación
    Representa la solicitud de un voluntario para unirse a una convocatoria.
    """
    
    # --- 1. Identificación ---
    id: Optional[int] = None
    id_usuario: Optional[int] = None
    id_convocatoria: Optional[int] = None
    
    # --- 2. Información Básica ---
    observaciones: Optional[str] = None
    motivo_rechazo: Optional[str] = None
    
    # --- 3. Logística/Configuración ---
    estado: str = "en_revision"  # en_revision, aprobada, rechazada
    
    # --- 4. Tiempos ---
    fecha_postulacion: Optional[datetime] = None
    fecha_actualizacion: Optional[datetime] = None
    
    # --- 5. Listas y JSON ---
    # Trazabiliad de quien cambio el estado
    historial_estados: List[Dict] = field(default_factory=list)
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
```

### 📄 backend/core/application/ports/output/__init__.py
```python

```

### 📄 backend/core/application/ports/output/campana_repository.py
```python
from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.campana import Campana

class CampanaRepository(ABC):
    """Puerto de Salida para la Entidad Campaña"""
    
    @abstractmethod
    def crear(self, campana: Campana) -> Campana:
        pass

    @abstractmethod
    def obtener_por_id(self, id: int) -> Optional[Campana]:
        pass

    @abstractmethod
    def obtener_todas(self) -> List[Campana]:
        pass

    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Campana:
        """Actualiza los campos especificados de una campaña"""
        pass

    @abstractmethod
    def eliminar(self, id: int) -> None:
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
    @abstractmethod
    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        """Actualiza los campos especificados de una convocatoria"""
        pass
    
    @abstractmethod
    def eliminar(self, id: int) -> None:
        """Elimina una convocatoria por su ID"""
        pass
```

### 📄 backend/core/application/ports/output/postulacion_repository.py
```python
from abc import ABC, abstractmethod
from typing import List, Optional
from core.domain.entities.postulacion import Postulacion

class PostulacionRepository(ABC):
    """Puerto de Salida para la Entidad Postulación"""
    
    @abstractmethod
    def crear(self, postulacion: Postulacion) -> Postulacion:
        pass

    @abstractmethod
    def obtener_por_usuario_y_convocatoria(self, id_usuario: int, id_convocatoria: int) -> Optional[Postulacion]:
        pass

    @abstractmethod
    def listar_por_voluntario(self, id_usuario: int) -> List[Postulacion]:
        pass

    @abstractmethod
    def actualizar(self, postulacion: Postulacion) -> Postulacion:
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

### 📄 backend/core/application/use_cases/campana/__init__.py
```python

```

### 📄 backend/core/application/use_cases/campana/actualizar_campana.py
```python
from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.campana import Campana

class ActualizarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Campana:
        # 1. Verificar que existe
        campana_existente = self.repository.obtener_por_id(id)
        if not campana_existente:
            raise ValueError(f"No existe la campaña con ID {id}")
        
        # 2. Validaciones de Negocio
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            # Convertir a date si es datetime
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if fin_date < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")
        
        if 'monto_objetivo' in datos and datos['monto_objetivo'] < 0:
            raise ValueError("El monto objetivo no puede ser negativo.")
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)
```

### 📄 backend/core/application/use_cases/campana/crear_campana.py
```python
from datetime import date, datetime
from typing import List
from core.domain.entities.campana import Campana

class CrearCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, 
                 # 1. Info Básica
                 titulo: str, descripcion: str, 
                 # 2. Tiempos
                 fecha_inicio: datetime, fecha_fin: date,
                 # 3. Identificación
                 id_usuario: int, 
                 # 4. Financiero
                 monto_objetivo: int, permite_monetaria: bool, permite_especie: bool,
                 # 5. Opcionales (Imagen)
                 imagen_url: str = "",
                 # 6. Listas / JSON
                 objetivos: List[str] = None,
                 galeria: List[str] = None,
                 necesidades: List[str] = None,
                 categoria: List[str] = None, 
                 tipo_impacto: List[str] = None) -> Campana:
        
        # Validación de Negocio
        
        # 1. Validar fechas lógicas
        if fecha_fin and fecha_inicio:
            # Convertimos a date para comparar peras con peras
            inicio_date = fecha_inicio.date() if isinstance(fecha_inicio, datetime) else fecha_inicio
            if fecha_fin < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")

        # 2. Validar inicio en el pasado (Solo al CREAR)
        hoy = date.today()
        inicio_check = fecha_inicio.date() if isinstance(fecha_inicio, datetime) else fecha_inicio
        if inicio_check < hoy:
            raise ValueError("La campaña no puede iniciar en el pasado.")

        # 3. Validar Montos
        if monto_objetivo < 0:
            raise ValueError("El monto objetivo no puede ser negativo.")
        
        nueva_campana = Campana(
            # 1. Info Básica
            titulo=titulo,
            descripcion=descripcion,
            imagen_url=imagen_url,
            # 2. Tiempos
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            # 3. Identificación
            id_usuario_creador=id_usuario,
            # 4. Financiero
            monto_objetivo=monto_objetivo,
            permite_donacion_monetaria=permite_monetaria,
            permite_donacion_especie=permite_especie,
            # 5. Listas / JSON
            objetivos=objetivos or [],
            galeria_imagenes=galeria or [],
            necesidades=necesidades or [],
            categoria=categoria or [],
            tipo_impacto=tipo_impacto or [],
        )
        
        return self.repository.crear(nueva_campana)
```

### 📄 backend/core/application/use_cases/campana/eliminar_campana.py
```python
class EliminarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int):
        return self.repository.eliminar(id)
```

### 📄 backend/core/application/use_cases/campana/listar_campanas.py
```python
from typing import List
from core.domain.entities.campana import Campana

class ListarCampanasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self) -> List[Campana]:
        return self.repository.obtener_todas()
```

### 📄 backend/core/application/use_cases/convocatoria/__init__.py
```python

```

### 📄 backend/core/application/use_cases/convocatoria/actualizar_convocatoria.py
```python
from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.convocatoria import Convocatoria

class ActualizarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Convocatoria:
        # 1. Verificar que existe
        convocatoria_existente = self.repository.obtener_por_id(id)
        if not convocatoria_existente:
            raise ValueError(f"No existe la convocatoria con ID {id}")
        
        # 2. Validaciones de Negocio
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if fin_date < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)
```

### 📄 backend/core/application/use_cases/convocatoria/crear_convocatoria.py
```python
from datetime import datetime
from typing import List, Dict, Any
from core.domain.entities.convocatoria import Convocatoria
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def execute(self, 
                 # Datos Obligatorios
                 titulo: str, descripcion: str, 
                 fecha_inicio: datetime, fecha_fin: datetime, 
                 cupos: int, id_usuario: int, habilidades: str,
                 # Datos Opcionales (Defaults)
                 ubicacion: str = "", 
                 link_whatsapp: str = "",
                 modalidad: str = "presencial", # 🟢
                 beneficios: List[str] = None,  # 🟢
                 categorias: List[str] = None, 
                 horario: Dict[str, Any] = None) -> Convocatoria:
        
        # Validaciones de Negocio
        if fecha_inicio >= fecha_fin:
            raise ValueError("La fecha de inicio debe ser anterior a la fecha de fin.")
        if cupos <= 0:
            raise ValueError("Debe haber al menos 1 cupo disponible.")

        # Crear Entidad (Siguiendo el Orden Maestro de Tanda 1)
        nueva_convocatoria = Convocatoria(
            id_usuario_creador=id_usuario,
            titulo=titulo,
            descripcion=descripcion,
            ubicacion=ubicacion,
            link_whatsapp=link_whatsapp,
            modalidad=modalidad, # 🟢
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos,
            habilidades_requeridas=habilidades,
            categorias=categorias or [],
            horario=horario or {},
            beneficios=beneficios or [] # 🟢
        )

        return self.repository.crear(nueva_convocatoria)
```

### 📄 backend/core/application/use_cases/convocatoria/eliminar_convocatoria.py
```python
class EliminarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int):
        return self.repository.eliminar(id)
```

### 📄 backend/core/application/use_cases/convocatoria/listar_convocatorias.py
```python
from typing import List
from core.domain.entities.convocatoria import Convocatoria

class ListarConvocatoriasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, estado: str = None) -> List[Convocatoria]:
        return self.repository.listar_todas(estado=estado)
```

### 📄 backend/core/application/use_cases/postulacion/__init__.py
```python

```

### 📄 backend/core/application/use_cases/postulacion/listar_mis_postulaciones.py
```python
from typing import List
from core.domain.entities.postulacion import Postulacion

class ListarMisPostulacionesUseCase:
    """
    Caso de Uso: Obtiene el historial de postulaciones de un voluntario (HU09/FUN-41).
    """
    def __init__(self, postulacion_repository):
        self.postulacion_repo = postulacion_repository

    def execute(self, id_usuario: int) -> List[Postulacion]:
        # El repositorio ya hace el trabajo pesado de filtrar y ordenar
        return self.postulacion_repo.listar_por_voluntario(id_usuario)
```

### 📄 backend/core/application/use_cases/postulacion/postular_voluntario.py
```python
from datetime import datetime
from core.domain.entities.postulacion import Postulacion

class PostularVoluntarioUseCase:
    """
    Caso de Uso: Permite a un voluntario postularse a una convocatoria.
    Aplica las reglas de negocio de la HU09.
    """
    
    def __init__(self, postulacion_repository, convocatoria_repository):
        # Inyectamos ambos repositorios porque necesitamos verificar la convocatoria
        self.postulacion_repo = postulacion_repository
        self.convocatoria_repo = convocatoria_repository

    def execute(self, id_usuario: int, id_convocatoria: int, observaciones: str = "") -> Postulacion:
        # Regla 1: Validar que la convocatoria exista y esté disponible
        convocatoria = self.convocatoria_repo.obtener_por_id(id_convocatoria)
        if not convocatoria:
            raise ValueError("La convocatoria a la que intentas postularte no existe.")
        
        if convocatoria.estado not in ['publicada', 'abierta']:
            raise ValueError("Esta convocatoria no está disponible actualmente para postulaciones.")
        
        # Regla 2: Validar que el voluntario no esté postulado ya [cite: 1056]
        postulacion_existente = self.postulacion_repo.obtener_por_usuario_y_convocatoria(id_usuario, id_convocatoria)
        if postulacion_existente:
            raise ValueError("Ya te encuentras postulado a esta convocatoria.")
            
        # Regla 3: (Opcional) Si en el futuro quieres validar que el perfil esté completo 
        # antes de postularse[cite: 1055], inyectarías el user_repository y harías el chequeo aquí.

        # Armar el JSON del historial de estados
        historial_inicial = [{
            "estado": "en_revision",
            "fecha": datetime.now().isoformat(),
            "actor": f"usuario_{id_usuario}"
        }]

        # Crear Entidad Pura (Dominio)
        nueva_postulacion = Postulacion(
            # --- 1. Identificación ---
            id_usuario=id_usuario,
            id_convocatoria=id_convocatoria,
            
            # --- 2. Información Básica ---
            observaciones=observaciones,
            
            # --- 3. Logística/Configuración ---
            estado="en_revision",
            
            # --- 5. Listas y JSON ---
            historial_estados=historial_inicial
        )

        # Persistir a través del Puerto de Salida (Repositorio)
        return self.postulacion_repo.crear(nueva_postulacion)
```

### 📄 backend/core/application/use_cases/user/__init__.py
```python

```

### 📄 backend/core/application/use_cases/user/login_user.py
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

### 📄 backend/core/application/use_cases/user/register_user.py
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
    
# ==========================================
#  4. POSTULACIONES (VOLUNTARIADO)
# ==========================================

class PostulacionModel(models.Model):
    """
    Modelo de Infraestructura. Tabla 'public.postulacion'.
    Conecta al Voluntario con la Convocatoria.
    """

    # --- 1. Identificación ---
    usuario = models.ForeignKey(
        'UsuarioModel',
        on_delete=models.CASCADE,
        db_column='id_usuario',
        related_name='postulaciones'
    )
    convocatoria = models.ForeignKey(
        'ConvocatoriaModel',
        on_delete=models.CASCADE,
        db_column='id_convocatoria',
        related_name='postulaciones'
    )

    # --- 2. Información Básica ---
    observaciones = models.TextField(blank=True, null=True)
    motivo_rechazo = models.TextField(blank=True, null=True)

    # --- 3. Logística/Configuración ---
    ESTADOS = [
        ('en_revision', 'En revisión'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada')
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='en_revision')

    # --- 4. Tiempos ---
    fecha_postulacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    # --- 5. Listas y JSON ---
    historial_estados = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = 'postulacion'
        managed = True
        # Regla de Oro: Un usuario solo puede postularse una vez a una misma convocatoria
        unique_together = ('usuario', 'convocatoria')
        ordering = ['-fecha_postulacion']

    def __str__(self):
        return f"Postulación {self.usuario.correo_electronico} -> {self.convocatoria.titulo}"
```

### 📄 backend/core/infrastructure/persistence/django/repositories/__init__.py
```python

```

### 📄 backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py
```python
from typing import List, Optional
from core.domain.entities.campana import Campana
from core.infrastructure.persistence.django.models import CampanaModel, UsuarioModel
from core.application.ports.output.campana_repository import CampanaRepository

class PostgresCampanaRepository(CampanaRepository):
    
    def _to_domain(self, model: CampanaModel) -> Campana:
        return Campana(
            # 1. Identificación
            id=model.id,
            id_usuario_creador=model.usuario_creador.id,
            # 2. Info Básica
            titulo=model.titulo,
            descripcion=model.descripcion,
            imagen_url=model.imagen_url or "",
            # 3. Tiempos y Estado
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            fecha_actualizacion=model.fecha_actualizacion,
            # 4. Financiero
            monto_objetivo=model.monto_objetivo or 0,
            recaudo_actual=model.recaudo_actual or 0,
            permite_donacion_monetaria=model.permite_donacion_monetaria,
            permite_donacion_especie=model.permite_donacion_especie,
            # 5. Listas JSON
            objetivos=model.objetivos or [],
            galeria_imagenes=model.galeria_imagenes or [],
            necesidades=model.necesidades or [],
            categoria=model.categoria or [],       
            tipo_impacto=model.tipo_impacto or []
        )

    def crear(self, campana: Campana) -> Campana:
        usuario_db = UsuarioModel.objects.get(id=campana.id_usuario_creador)
        
        modelo = CampanaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=campana.titulo,
            descripcion=campana.descripcion,
            imagen_url=campana.imagen_url,
            fecha_inicio=campana.fecha_inicio,
            fecha_fin=campana.fecha_fin,
            estado=campana.estado,
            monto_objetivo=campana.monto_objetivo,
            recaudo_actual=campana.recaudo_actual,
            permite_donacion_monetaria=campana.permite_donacion_monetaria,
            permite_donacion_especie=campana.permite_donacion_especie,
            # JSONField
            objetivos=campana.objetivos,
            galeria_imagenes=campana.galeria_imagenes,
            necesidades=campana.necesidades,
            categoria=campana.categoria,
            tipo_impacto=campana.tipo_impacto, 
        )
        return self._to_domain(modelo)

    def obtener_por_id(self, id: int) -> Optional[Campana]:
        """Obtiene una campaña por su ID"""
        try:
            modelo = CampanaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except CampanaModel.DoesNotExist:
            return None


    def actualizar(self, id: int, datos: dict) -> Campana:
        """
        Actualiza campaña con blindaje explícito para campos complejos.
        """
        try:
            modelo = CampanaModel.objects.get(id=id)
            
            # 1. Actualización Explícita (Blindaje)
            # Booleanos
            if 'permite_donacion_monetaria' in datos: 
                modelo.permite_donacion_monetaria = datos['permite_donacion_monetaria']
            if 'permite_donacion_especie' in datos: 
                modelo.permite_donacion_especie = datos['permite_donacion_especie']
            
            # Listas JSON
            if 'objetivos' in datos: modelo.objetivos = datos['objetivos']
            if 'galeria_imagenes' in datos: modelo.galeria_imagenes = datos['galeria_imagenes']
            if 'necesidades' in datos: modelo.necesidades = datos['necesidades']
            if 'categoria' in datos: modelo.categoria = datos['categoria']
            if 'tipo_impacto' in datos: modelo.tipo_impacto = datos['tipo_impacto']

            # 2. Actualización Genérica para el resto (titulo, descripcion, fechas, montos)
            campos_especiales = [
                'permite_donacion_monetaria', 'permite_donacion_especie',
                'objetivos', 'galeria_imagenes', 'necesidades', 'categoria', 'tipo_impacto'
            ]
            
            for key, value in datos.items():
                if key not in campos_especiales and hasattr(modelo, key):
                    setattr(modelo, key, value)
            
            modelo.save()
            modelo.refresh_from_db()
            return self._to_domain(modelo)

        except CampanaModel.DoesNotExist:
            raise ValueError(f"No existe la campaña {id}")
    
    def obtener_todas(self) -> List[Campana]:
        qs = CampanaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in qs]

    def eliminar(self, id: int):
        try:
            modelo = CampanaModel.objects.get(id=id)
            modelo.delete()
        except CampanaModel.DoesNotExist:
            pass
```

### 📄 backend/core/infrastructure/persistence/django/repositories/postgres_convocatoria_repository.py
```python
from typing import List, Optional
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.entities.convocatoria import Convocatoria
from core.infrastructure.persistence.django.models import ConvocatoriaModel, UsuarioModel

class PostgresConvocatoriaRepository(ConvocatoriaRepository):

    def _to_domain(self, model: ConvocatoriaModel) -> Convocatoria:
        return Convocatoria(
            # 1. Identificación
            id=model.id,
            id_usuario_creador=model.usuario_creador.id,
            # 2. Info Básica
            titulo=model.titulo,
            descripcion=model.descripcion,
            # 3. Logística
            ubicacion=model.ubicacion or "",
            link_whatsapp=model.link_whatsapp or "",
            modalidad=model.modalidad,
            # 4. Tiempos
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            cupos_disponibles=model.cupos_disponibles,
            # 5. Estado
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            # 6. JSON/Listas
            habilidades_requeridas=model.habilidades_requeridas or "",
            categorias=model.categorias or [], 
            horario=model.horario or {},       
            beneficios=model.beneficios or []
        )

    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        usuario_db = UsuarioModel.objects.get(id=convocatoria.id_usuario_creador)
        
        modelo = ConvocatoriaModel.objects.create(
            # 1. Identificación
            usuario_creador=usuario_db,
            # 2. Info Básica
            titulo=convocatoria.titulo,
            descripcion=convocatoria.descripcion,
            # 3. Logística
            ubicacion=convocatoria.ubicacion,
            link_whatsapp=convocatoria.link_whatsapp,
            modalidad=convocatoria.modalidad,
            # 4. Tiempos
            fecha_inicio=convocatoria.fecha_inicio,
            fecha_fin=convocatoria.fecha_fin,
            cupos_disponibles=convocatoria.cupos_disponibles,
            # 5. Estado
            estado=convocatoria.estado,
            # 6. JSON/Listas
            habilidades_requeridas=convocatoria.habilidades_requeridas,
            categorias=convocatoria.categorias, 
            horario=convocatoria.horario,
            beneficios=convocatoria.beneficios
        )
        return self._to_domain(modelo)

    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        """
        Actualiza una convocatoria existente.
        SOLUCIÓN ERROR 🟢: Asignación explícita de campos críticos.
        """
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            
            # 1. Actualización Explícita (Blindaje contra errores de tipo)
            if 'modalidad' in datos: modelo.modalidad = datos['modalidad'] 
            if 'beneficios' in datos: modelo.beneficios = datos['beneficios'] 
            if 'horario' in datos: modelo.horario = datos['horario']
            if 'categorias' in datos: modelo.categorias = datos['categorias']
            if 'habilidades_requeridas' in datos: modelo.habilidades_requeridas = datos['habilidades_requeridas']

            # 2. Actualización Genérica para el resto (titulo, descripcion, fechas, etc.)
            campos_especiales = ['modalidad', 'beneficios', 'horario', 'categorias', 'habilidades_requeridas']
            
            for key, value in datos.items():
                if key not in campos_especiales:
                    if hasattr(modelo, key):
                        setattr(modelo, key, value)
            
            modelo.save()
            modelo.refresh_from_db()
            
            return self._to_domain(modelo)

        except ConvocatoriaModel.DoesNotExist:
            raise ValueError(f"No existe la convocatoria {id}")

    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except ConvocatoriaModel.DoesNotExist:
            return None

    def listar_todas(self, estado: str = None) -> List[Convocatoria]:
        modelos = ConvocatoriaModel.objects.all()
        if estado:
            modelos = modelos.filter(estado=estado)
        modelos = modelos.order_by('-fecha_creacion')
        return [self._to_domain(m) for m in modelos]

    def eliminar(self, id: int):
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            modelo.delete()
        except ConvocatoriaModel.DoesNotExist:
            pass
```

### 📄 backend/core/infrastructure/persistence/django/repositories/postgres_postulacion_repository.py
```python
from typing import List, Optional
from core.domain.entities.postulacion import Postulacion
from core.infrastructure.persistence.django.models import PostulacionModel
from django.core.exceptions import ObjectDoesNotExist
from core.application.ports.output.postulacion_repository import PostulacionRepository

class PostgresPostulacionRepository(PostulacionRepository):
    """
    Repositorio para Postulaciones.
    Traduce entre la Entidad de Dominio y el Modelo ORM de Django.
    """

    def _to_entity(self, model: PostulacionModel) -> Postulacion:
        """Convierte el modelo de la BD a una Entidad pura de Dominio usando El Orden Maestro."""
        return Postulacion(
            # --- 1. Identificación ---
            id=model.id,
            id_usuario=model.usuario_id,
            id_convocatoria=model.convocatoria_id,
            
            # --- 2. Información Básica ---
            observaciones=model.observaciones,
            motivo_rechazo=model.motivo_rechazo,
            
            # --- 3. Logística/Configuración ---
            estado=model.estado,
            
            # --- 4. Tiempos ---
            fecha_postulacion=model.fecha_postulacion,
            fecha_actualizacion=model.fecha_actualizacion,
            
            # --- 5. Listas y JSON ---
            historial_estados=model.historial_estados
        )

    def crear(self, postulacion: Postulacion) -> Postulacion:
        modelo = PostulacionModel.objects.create(
            # --- 1. Identificación ---
            usuario_id=postulacion.id_usuario,
            convocatoria_id=postulacion.id_convocatoria,
            
            # --- 2. Información Básica ---
            observaciones=postulacion.observaciones,
            
            # --- 3. Logística/Configuración ---
            estado=postulacion.estado,
            
            # --- 5. Listas y JSON ---
            historial_estados=postulacion.historial_estados
        )
        return self._to_entity(modelo)

    def obtener_por_usuario_y_convocatoria(self, id_usuario: int, id_convocatoria: int) -> Optional[Postulacion]:
        """Busca si el usuario ya se postuló a esta convocatoria."""
        try:
            modelo = PostulacionModel.objects.get(usuario_id=id_usuario, convocatoria_id=id_convocatoria)
            return self._to_entity(modelo)
        except ObjectDoesNotExist:
            return None

    def listar_por_voluntario(self, id_usuario: int) -> List[Postulacion]:
        """Para la vista 'Mis Postulaciones' de la HU09."""
        modelos = PostulacionModel.objects.filter(usuario_id=id_usuario).order_by('-fecha_postulacion')
        return [self._to_entity(m) for m in modelos]

    def actualizar(self, postulacion: Postulacion) -> Postulacion:
        """Actualización BLINDADA campo por campo."""
        try:
            modelo = PostulacionModel.objects.get(id=postulacion.id)
            
            # --- 2. Información Básica ---
            if postulacion.motivo_rechazo is not None:
                modelo.motivo_rechazo = postulacion.motivo_rechazo
                
            # --- 3. Logística/Configuración ---
            if postulacion.estado is not None:
                modelo.estado = postulacion.estado
                
            # --- 5. Listas y JSON ---
            # Protegemos el JSON, solo lo actualizamos si viene una lista real
            if isinstance(postulacion.historial_estados, list):
                modelo.historial_estados = postulacion.historial_estados
                
            modelo.save()
            return self._to_entity(modelo)
        except ObjectDoesNotExist:
            raise ValueError(f"La postulación con ID {postulacion.id} no existe.")
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

> ⚠️ NO ENCONTRADO: backend/core/adapters/api/rest/serializers.py

### 📄 backend/core/adapters/api/rest/views/__init__.py
```python

```

### 📄 backend/core/adapters/api/rest/views/campana_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.container import Container
from core.adapters.api.rest.serializers.campana_serializers import CampanaSerializer
from core.infrastructure.persistence.django.models import CampanaModel

class CrearCampanaView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request):
        # 1. Validar entrada
        serializer = CampanaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        data = serializer.validated_data
        
        try:
            # 2. Ejecutar Caso de Uso con datos limpios
            nueva_campana = Container.crear_campana_use_case().execute(
                # Básicos
                titulo=data['titulo'],
                descripcion=data['descripcion'],
                # Tiempos
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                # Identificación
                id_usuario=request.user.id,
                # Financiero
                monto_objetivo=data.get('monto_objetivo', 0),
                permite_monetaria=data.get('permite_donacion_monetaria', True),
                permite_especie=data.get('permite_donacion_especie', True),
                # Listas / JSON
                imagen_url=data.get('imagen_url', ''),
                categoria=data.get('categoria', []),
                tipo_impacto=data.get('tipo_impacto', []),
                objetivos=data.get('objetivos', []),
                galeria=data.get('galeria_imagenes', []),
                necesidades=data.get('necesidades', [])
            )
            
            return Response(
                {"mensaje": "Campaña creada exitosamente", "id": nueva_campana.id},
                status=status.HTTP_201_CREATED
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarCampanasView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        try:
            campanas = Container.listar_campanas_use_case().execute()
            serializer = CampanaSerializer(campanas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DetalleCampanaView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            # 1. VALIDAR DATOS (sin buscar la instancia)
            serializer = CampanaSerializer(data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
            datos_limpios = serializer.validated_data

            # 2. EJECUTAR CASO DE USO (él se encarga de buscar y validar)
            campana_actualizada = Container.actualizar_campana_use_case().execute(pk, datos_limpios)
            
            # 3. SERIALIZAR RESPUESTA
            response_serializer = CampanaSerializer(campana_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)

        except ValueError as e:
            # El use case lanza ValueError si no encuentra la campaña
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_campana_use_case().execute(pk)
            return Response({"mensaje": "Campaña eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/rest/views/convocatoria_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers.convocatoria_serializers import ConvocatoriaSerializer
from core.infrastructure.persistence.django.models import ConvocatoriaModel

class CrearConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConvocatoriaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        
        try:
            nueva_convocatoria = Container.crear_convocatoria_use_case().execute(
                # 1. Info Básica
                titulo=data['titulo'],
                descripcion=data.get('descripcion', ''),
                # 2. Tiempos y Cupos
                fecha_inicio=data['fecha_inicio'],
                fecha_fin=data['fecha_fin'],
                cupos=data['cupos_disponibles'],
                id_usuario=request.user.id,
                # 3. Logística
                ubicacion=data.get('ubicacion', ''),
                link_whatsapp=data.get('link_whatsapp', ''),
                modalidad=data.get('modalidad', 'presencial'), 
                # 4. JSON/Listas
                habilidades=data.get('habilidades_requeridas', ''),
                categorias=data.get('categorias', []), 
                horario=data.get('horario', {}),
                beneficios=data.get('beneficios', []) 
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
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarConvocatoriasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        estado_filtro = request.query_params.get('estado', None)
        caso_de_uso = Container.listar_convocatorias_use_case
        try:
            convocatorias = caso_de_uso().execute(estado=estado_filtro)
            serializer = ConvocatoriaSerializer(convocatorias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DetalleConvocatoriaView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            # 1. Validar datos entrantes
            serializer = ConvocatoriaSerializer(data=request.data, partial=True)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            datos_limpios = serializer.validated_data
            
            # 2. Ejecutar Caso de Uso
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case().execute(pk, datos_limpios)
            
            # 3. Respuesta
            response_serializer = ConvocatoriaSerializer(convocatoria_actualizada)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
            
        except ValueError as e:
             return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        """Cambio de estado puntual"""
        try:
            nuevo_estado = request.data.get('estado')
            if nuevo_estado not in ['abierta', 'pausada', 'cerrada']:
                return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)
            
            convocatoria_actualizada = Container.actualizar_convocatoria_use_case().execute(pk, {'estado': nuevo_estado})
            
            return Response({
                "mensaje": f"Estado actualizado a {nuevo_estado}",
                "estado": convocatoria_actualizada.estado
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            Container.eliminar_convocatoria_use_case().execute(pk)
            return Response({"mensaje": "Convocatoria eliminada"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/rest/views/postulacion_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.container import Container
from core.adapters.api.rest.serializers.postulacion_serializers import PostularVoluntarioSerializer

class PostularVoluntarioView(APIView):
    """
    Vista (Controlador) para postularse a una convocatoria.
    Es un coordinador tonto: recibe HTTP, limpia con serializer y llama al Caso de Uso.
    """
    
    # Exigimos que el usuario tenga un token JWT válido 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # 1. El Serializer limpia y valida formatos (Entrada)
        serializer = PostularVoluntarioSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                "error": "Datos inválidos", 
                "detalles": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        datos_limpios = serializer.validated_data
        
        # 2. Extraemos información vital
        id_usuario = request.user.id  
        id_convocatoria = datos_limpios.get('id_convocatoria')
        observaciones = datos_limpios.get('observaciones', '')
        
        # 3. Llamamos al cerebro (Caso de Uso) a través del Container
        caso_de_uso = Container.postular_voluntario_use_case
        
        try:
            nueva_postulacion = caso_de_uso().execute(
                id_usuario=id_usuario,
                id_convocatoria=id_convocatoria,
                observaciones=observaciones
            )
            
            # 4. Respondemos al mundo
            return Response({
                "mensaje": "¡Te has postulado exitosamente a la convocatoria!",
                "postulacion_id": nueva_postulacion.id,
                "estado": nueva_postulacion.estado
            }, status=status.HTTP_201_CREATED)
            
        except ValueError as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno en el servidor."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class MisPostulacionesView(APIView):
    """
    Vista (Controlador) para listar las postulaciones del usuario logueado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id_usuario = request.user.id  # Extraemos el ID del token
        caso_de_uso = Container.listar_mis_postulaciones_use_case
        
        try:
            # Traemos la lista de Entidades Puras
            postulaciones = caso_de_uso().execute(id_usuario)
            
            # Formateamos la respuesta para el frontend
            respuesta = []
            for post in postulaciones:
                respuesta.append({
                    "id": post.id,
                    "id_convocatoria": post.id_convocatoria,
                    "estado": post.estado,
                    "fecha_postulacion": post.fecha_postulacion,
                    "observaciones": post.observaciones,
                    "motivo_rechazo": post.motivo_rechazo,
                    "historial_estados": post.historial_estados
                })
                
            return Response(respuesta, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                "error": "Ocurrió un error interno al obtener tus postulaciones.",
                "detalle_tecnico": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/rest/views/user_views.py
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from core.container import Container
from core.adapters.api.rest.serializers.user_serializers import RegisterUserSerializer, LoginUserSerializer

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            user_entity = Container.register_user_use_case().execute(
                nombre_completo=data['nombre_completo'],
                email=data['email'],
                password=data['password'],
                tipo_documento=data.get('tipo_documento', 'CC'),
                numero_identificacion=data.get('numero_identificacion'),
                telefono=data.get('telefono'),
                direccion=data.get('direccion'),
                fecha_nacimiento=data.get('fecha_nacimiento'),
                profesion=data.get('profesion'),
                intereses=data.get('intereses', []),
                habilidades=data.get('habilidades', []),
                disponibilidad=data.get('disponibilidad', {})
            )

            return Response({
                "message": "Usuario registrado exitosamente",
                "user": {
                    "id": user_entity.id,
                    "full_name": user_entity.nombre_completo,
                    "email": user_entity.correo_electronico,
                    "role": user_entity.rol
                }
            }, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        try:
            # 1. Delegar TODA la lógica de negocio al Caso de Uso
            user_entity = Container.login_user_use_case().execute(
                email=data['email'],
                password=data['password']
            )

            # 2. Generar tokens JWT manualmente 
            refresh = RefreshToken()
            refresh['user_id'] = user_entity.id
            refresh['role'] = user_entity.rol

            return Response({
                "message": "Inicio de sesión exitoso",
                "tokens": {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                "user": {
                    "id": user_entity.id,
                    "full_name": user_entity.nombre_completo,
                    "email": user_entity.correo_electronico,
                    "role": user_entity.rol
                }
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Si el caso de uso lanza un ValueError por credenciales inválidas
            return Response({"non_field_errors": [str(e)]}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(f"❌ ERROR LOGIN: {e}")
            return Response({"non_field_errors": ["Error interno del servidor"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

### 📄 backend/core/adapters/api/urls.py
```python
from django.urls import path

# Vistas de Usuarios
from core.adapters.api.rest.views.user_views import (
    RegisterUserView, LoginUserView
)
# Vistas de Convocatorias
from core.adapters.api.rest.views.convocatoria_views import (
    CrearConvocatoriaView, ListarConvocatoriasView, DetalleConvocatoriaView
)
# Vistas de Campañas
from core.adapters.api.rest.views.campana_views import (
    CrearCampanaView, ListarCampanasView, DetalleCampanaView
)

# Vistas de Postulaciones
from core.adapters.api.rest.views.postulacion_views import (
    PostularVoluntarioView,
    MisPostulacionesView
)

urlpatterns = [
    # --- USUARIOS ---
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
    
    # --- CONVOCATORIAS ---
    path('convocatorias/crear/', CrearConvocatoriaView.as_view(), name='crear_convocatoria'),
    path('convocatorias/', ListarConvocatoriasView.as_view(), name='listar_convocatorias'),
    path('convocatorias/<int:pk>/', DetalleConvocatoriaView.as_view(), name='detalle_convocatoria'),
    
    # --- CAMPAÑAS ---
    path('campanas/crear/', CrearCampanaView.as_view(), name='crear_campana'),
    path('campanas/', ListarCampanasView.as_view(), name='listar_campanas'),
    path('campanas/<int:pk>/', DetalleCampanaView.as_view(), name='detalle_campana'),

    # --- POSTULACIONES ---
    path('voluntariado/postular/', PostularVoluntarioView.as_view(), name='postular_voluntario'),
    path('voluntariado/mis-postulaciones/', MisPostulacionesView.as_view(), name='mis_postulaciones'),
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
import AdminCampaignsPage from './pages/AdminCampaignsPage';

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
          <Route path="/admin/campanas" element={<AdminCampaignsPage />} />
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
// Importamos Servicios de Convocatorias
import { obtenerConvocatorias } from '../services/convocatoriaService';
// Importamos Servicios de Campañas
import { obtenerCampanas } from '../services/campaignService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp debe ser usado dentro de un AppProvider');
    return context;
};

export const AppProvider = ({ children }) => {
    // --- ESTADOS GLOBALES ---
    const [convocations, setConvocations] = useState([]);
    const [campaigns, setCampaigns] = useState([]); // 🟢 Nuevo estado para Campañas
    const [loading, setLoading] = useState(true);

    // ==========================================
    // 1. MÓDULO CONVOCATORIAS
    // ==========================================
    const fetchConvocations = async () => {
        try {
            const data = await obtenerConvocatorias();
            console.log('📦 Convocatorias recibidas:', data);
            
            const formattedData = data.map(item => ({
                ...item, // Mantenemos todo lo original
                // Aseguramos alias para UI si es necesario
                title: item.titulo,
                description: item.descripcion || 'Sin descripción',
                status: item.estado === 'abierta' ? 'published' : item.estado === 'cerrada' ? 'closed' : item.estado,
                // Garantizamos tipos de datos
                categorias: item.categorias || [],
                horario: item.horario || {},
                beneficios: item.beneficios || [],
                modalidad: item.modalidad || 'presencial'
            }));
            
            setConvocations(formattedData);
        } catch (error) {
            console.error("❌ Error cargando convocatorias:", error);
        }
    };

    // ==========================================
    // 2. MÓDULO CAMPAÑAS
    // ==========================================
    const fetchCampaigns = async () => {
        try {
            const data = await obtenerCampanas();
            console.log('📦 Campañas recibidas:', data);

            // Mapeo y Limpieza de Datos (Igual que hicimos con Convocatorias)
            const formattedCampaigns = data.map(camp => ({
                // 1. Identificación y Básicos
                id: camp.id,
                titulo: camp.titulo,
                descripcion: camp.descripcion,
                
                // 2. Fechas y Estado
                fecha_inicio: camp.fecha_inicio,
                fecha_fin: camp.fecha_fin,
                fecha_creacion: camp.fecha_creacion,
                estado: camp.estado,
                
                // 3. Financiero (Garantizamos números)
                monto_objetivo: Number(camp.monto_objetivo) || 0,
                recaudo_actual: Number(camp.recaudo_actual) || 0,
                permite_donacion_monetaria: camp.permite_donacion_monetaria,
                permite_donacion_especie: camp.permite_donacion_especie,

                // 4. Multimedia
                imagen_url: camp.imagen_url,

                // 5. Listas JSON (Garantizamos Arrays vacíos si vienen null)
                objetivos: Array.isArray(camp.objetivos) ? camp.objetivos : [],
                galeria_imagenes: Array.isArray(camp.galeria_imagenes) ? camp.galeria_imagenes : [],
                necesidades: Array.isArray(camp.necesidades) ? camp.necesidades : [],
                categoria: Array.isArray(camp.categoria) ? camp.categoria : [],
                tipo_impacto: Array.isArray(camp.tipo_impacto) ? camp.tipo_impacto : []
            }));

            setCampaigns(formattedCampaigns);
        } catch (error) {
            console.error("❌ Error cargando campañas:", error);
        }
    };

    // --- CARGA INICIAL UNIFICADA ---
    const refreshAllData = async () => {
        setLoading(true);
        await Promise.all([fetchConvocations(), fetchCampaigns()]);
        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            refreshAllData();
        } else {
            setLoading(false);
        }
    }, []);

    // --- FILTROS DE CAMPAÑAS (Helpers) ---
    const getActiveCampaigns = () => {
        return campaigns.filter(c => c.estado === 'activa' || c.estado === 'pausada');
    };

    const getClosedCampaigns = () => {
        return campaigns.filter(c => c.estado === 'completada' || c.estado === 'cancelada');
    };

    const value = {
        // Estado General
        loading,
        refreshAllData,

        // Convocatorias
        convocations,
        fetchConvocations,
        getActiveConvocations: () => convocations.filter(c => c.status !== 'closed'),
        getClosedConvocations: () => convocations.filter(c => c.status === 'closed'),

        // Campañas
        campaigns,
        fetchCampaigns, // Para recargar manualmente tras crear/editar
        getActiveCampaigns,
        getClosedCampaigns
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
```

### 📄 frontend/src/services/campaignService.js
```javascript
import axios from 'axios';

// 1. Definimos la URL exacta del Backend (Igual que en Convocatorias)
const API_URL = 'http://127.0.0.1:8000/api/campanas';

// 2. Función auxiliar para sacar el Token (Igual que en Convocatorias)
const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// --- FUNCIONES DEL SERVICIO ---

export const obtenerCampanas = async () => {
    try {
        // Usamos la URL completa y pasamos el header con el token
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo campañas:", error);
        throw error.response ? error.response.data : new Error('Error de conexión');
    }
};

export const crearCampana = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/crear/`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("Error creando campaña:", error);
        throw error.response ? error.response.data : new Error('Error al crear campaña');
    }
};

export const eliminarCampana = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};

export const actualizarCampana = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar campaña');
    }
};

// (Opcional) Si en el futuro implementas actualizar o cambiar estado en Backend:
export const cambiarEstadoCampana = async (id, estado) => {
    console.warn("Endpoint cambiarEstadoCampana no implementado en backend aún.");
    return null;
};
```

### 📄 frontend/src/services/convocatoriaService.js
```javascript
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. CREAR
export const crearConvocatoria = async (formData) => {
    
    const habilidadesString = Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills;

    const payload = {
        // 2. Info Básica
        titulo: formData.title,
        descripcion: formData.description,
        // 3. Logística
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        modalidad: formData.modalidad,
        // 4. Tiempos y Cupos
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        // 6. JSON/Listas
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario,
        beneficios: formData.beneficios // 🟢 CRÍTICO: Asegurar envío
    };

    try {
        const response = await axios.post(`${API_URL}/crear/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. ACTUALIZAR
export const actualizarConvocatoria = async (id, formData) => {
    const habilidadesString = Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills;

    // Payload Estandarizado (Orden Maestro)
    const payload = {
        // 2. Info Básica
        titulo: formData.title,
        descripcion: formData.description,
        // 3. Logística
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        modalidad: formData.modalidad, // 🟢 CRÍTICO
        // 4. Tiempos y Cupos
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        // 6. JSON/Listas
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario,
        beneficios: formData.beneficios // 🟢 CRÍTICO
    };

    try {
        const response = await axios.put(`${API_URL}/${id}/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar');
    }
};

// 3. OBTENER LISTA
export const obtenerConvocatorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al obtener convocatorias');
    }
};

// 4. CAMBIAR ESTADO
export const cambiarEstadoConvocatoria = async (id, nuevoEstado) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/`, { estado: nuevoEstado }, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cambiar estado');
    }
};

// 5. ELIMINAR
export const eliminarConvocatoria = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};
```

### 📄 frontend/src/services/voluntariadoService.js
```javascript
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/voluntariado';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. POSTULARSE A CONVOCATORIA (FUN-20)
export const postularseConvocatoria = async (idConvocatoria, observaciones = "") => {
    const payload = {
        id_convocatoria: idConvocatoria,
        observaciones: observaciones
    };

    try {
        const response = await axios.post(`${API_URL}/postular/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. OBTENER MIS POSTULACIONES (FUN-41)
export const obtenerMisPostulaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/mis-postulaciones/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cargar tu historial de postulaciones');
    }
};
```

### 📄 frontend/src/pages/AdminCampaignsPage.jsx
```javascript
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { crearCampana, actualizarCampana, eliminarCampana } from '../services/campaignService';
import AdminLayout from '../components/AdminLayout';
import Snackbar from '../components/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog'; // 🟢 NUEVO
import {
    Plus, Edit, Trash2, X, Save,
    Check, DollarSign, Image as ImageIcon, AlertCircle, 
    Package, Calendar, Archive, Play, Pause, ChevronDown, 
    Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Copy, Heart, Inbox
} from 'lucide-react';

const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CO', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
};

const CheckboxM3 = ({ label, checked, onChange, icon: Icon }) => (
    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-primary/5 border-primary' : 'bg-surface border-outline-variant hover:border-outline'}`}>
        <div className="flex items-center gap-3">
            {Icon && <Icon size={20} className={checked ? 'text-primary' : 'text-on-surface-variant'} />}
            <span className={`text-sm font-medium ${checked ? 'text-primary font-bold' : 'text-on-surface'}`}>{label}</span>
        </div>
        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-primary' : 'border-2 border-on-surface-variant'}`}>
            {checked && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
);

const DynamicList = ({ label, items, onAdd, onRemove, placeholder, type = 'text', maxItems = 10 }) => {
    const [newValue, setNewValue] = useState('');
    const isLimitReached = items.length >= maxItems;
    const handleAdd = () => { if (!newValue.trim()) return; onAdd(newValue); setNewValue(''); };

    return (
        <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-baseline mb-2">
                <label className="block text-label-large text-on-surface font-bold text-primary">{label}</label>
                <span className={`text-xs font-medium ${isLimitReached ? 'text-error' : 'text-on-surface-variant'}`}>{items.length}/{maxItems}</span>
            </div>
            <div className="flex gap-2 mb-3">
                <input type={type} value={newValue} onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())} className="input-outlined flex-1 bg-white" placeholder={isLimitReached ? "Límite alcanzado" : placeholder} disabled={isLimitReached} />
                <button type="button" onClick={handleAdd} disabled={isLimitReached || !newValue.trim()} className="btn-tonal py-2 px-4"><Plus size={18} /></button>
            </div>
            {items.length > 0 && (
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-surface-container/50 p-2 rounded-lg border border-outline-variant/50">
                            {type === 'url' ? (
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <img src={item} alt="Miniatura" className="w-8 h-8 rounded object-cover bg-surface-container-high" onError={(e) => e.target.src = 'https://via.placeholder.com/32'} />
                                    <span className="text-xs text-on-surface-variant truncate max-w-[200px]">{item}</span>
                                </div>
                            ) : ( <span className="text-sm text-on-surface ml-2 truncate max-w-[200px]">{item}</span> )}
                            <button type="button" onClick={() => onRemove(idx)} className="p-1.5 text-error hover:bg-error/10 rounded-full"><Trash2 size={14} /></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function CampaignFormModal({ campaign, onSave, onClose }) {
    const initialValues = { titulo: '', descripcion: '', fecha_inicio: new Date().toISOString().split('T')[0], fecha_fin: '', monto_objetivo: 0, permite_donacion_monetaria: true, permite_donacion_especie: true, categoria: [], tipo_impacto: [], imagen_url: '', objetivos: [], galeria_imagenes: [], necesidades: [] };
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [displayMonto, setDisplayMonto] = useState('');

    useEffect(() => {
        if (campaign) { setFormData({ ...initialValues, ...campaign }); setDisplayMonto(formatCurrency(campaign.monto_objetivo)); } 
        else { setFormData(initialValues); }
    }, [campaign]);

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const handleMoneyChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setDisplayMonto(formatCurrency(rawValue));
        setFormData({ ...formData, monto_objetivo: parseInt(rawValue) || 0 });
        if (errors.monto_objetivo) setErrors({...errors, monto_objetivo: null});
    };

    const handleDateChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
        const start = field === 'fecha_inicio' ? value : formData.fecha_inicio;
        const end = field === 'fecha_fin' ? value : formData.fecha_fin;
        const hoy = new Date().toISOString().split('T')[0];
        if (field === 'fecha_inicio' && !campaign?.id && value < hoy) setErrors(prev => ({...prev, fecha_inicio: "No puede iniciar en el pasado."}));
        if (start && end && end < start) setErrors(prev => ({...prev, fecha_fin: "El cierre debe ser posterior al inicio."}));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo?.trim()) newErrors.titulo = "Requerido.";
        if (!formData.descripcion?.trim()) newErrors.descripcion = "Requerido.";
        if (!formData.fecha_fin) newErrors.fecha_fin = "Requerido.";
        if (!formData.permite_donacion_monetaria && !formData.permite_donacion_especie) newErrors.permisos = "Selecciona un tipo.";
        if (formData.permite_donacion_monetaria && formData.monto_objetivo <= 0) newErrors.monto_objetivo = "Mayor a 0.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSave(formData); };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{campaign && campaign.id ? 'Editar Campaña' : campaign ? 'Replicar Campaña' : 'Nueva Campaña'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="campaign-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div id="field-titulo"><label className="block text-label-large text-on-surface mb-1.5 font-bold">Título *</label><input type="text" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className={`input-outlined focus:bg-white ${errors.titulo ? 'border-error bg-error-container text-error' : ''}`} />{errors.titulo && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.titulo}</p>}</div>
                            <div id="field-descripcion"><label className="block text-label-large text-on-surface mb-1.5 font-bold">Descripción *</label><textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.descripcion ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.descripcion && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.descripcion}</p>}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            <div id="field-fecha_inicio"><label className="block text-label-large text-on-surface mb-1.5 font-bold flex gap-2 items-center"><Calendar size={14}/> Inicio</label><input type="date" value={formData.fecha_inicio} onChange={(e) => handleDateChange('fecha_inicio', e.target.value)} className={`input-outlined focus:bg-white ${errors.fecha_inicio ? 'border-error text-error' : ''}`} />{errors.fecha_inicio && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha_inicio}</p>}</div>
                            <div id="field-fecha_fin"><label className="block text-label-large text-on-surface mb-1.5 font-bold flex gap-2 items-center"><Calendar size={14}/> Cierre</label><input type="date" value={formData.fecha_fin} onChange={(e) => handleDateChange('fecha_fin', e.target.value)} className={`input-outlined focus:bg-white ${errors.fecha_fin ? 'border-error text-error' : ''}`} />{errors.fecha_fin && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha_fin}</p>}</div>
                        </div>
                        <div className="space-y-4 pt-2" id="field-permisos">
                            <label className="block text-xs font-bold text-primary uppercase tracking-wide">Tipo de Donación</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3"><CheckboxM3 label="Recibir Dinero" icon={DollarSign} checked={formData.permite_donacion_monetaria} onChange={(e) => setFormData({...formData, permite_donacion_monetaria: e.target.checked})} />
                                    {formData.permite_donacion_monetaria && (<div className="animate-slide-up bg-surface-container/30 p-3 rounded-xl border border-outline-variant/30" id="field-monto_objetivo"><label className="block text-label-small text-on-surface-variant mb-1">Meta ($)</label><input type="text" value={displayMonto} onChange={handleMoneyChange} className={`input-outlined text-right font-mono font-bold ${errors.monto_objetivo ? 'border-error text-error' : ''}`} placeholder="0" />{errors.monto_objetivo && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.monto_objetivo}</p>}</div>)}
                                </div>
                                <div className="space-y-3"><CheckboxM3 label="Recibir Insumos" icon={Package} checked={formData.permite_donacion_especie} onChange={(e) => setFormData({...formData, permite_donacion_especie: e.target.checked})} /></div>
                            </div>
                            {errors.permisos && <p className="text-error text-xs font-bold text-center bg-error/10 rounded py-2 flex items-center justify-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.permisos}</p>}
                        </div>
                        {formData.permite_donacion_especie && (<div className="animate-fade-in bg-secondary/5 p-4 rounded-xl border border-secondary/20"><h3 className="font-bold text-sm text-secondary flex gap-2 mb-2"><Package size={18} /> Lista de Necesidades</h3><DynamicList label="" items={formData.necesidades} onAdd={(v)=>setFormData(p=>({...p, necesidades: [...p.necesidades, v]}))} onRemove={(i)=>setFormData(p=>({...p, necesidades: p.necesidades.filter((_,x)=>x!==i)}))} placeholder="Ej: Ropa, Arroz..." /></div>)}
                        <DynamicList label="Objetivos" items={formData.objetivos} onAdd={(v)=>setFormData(p=>({...p, objetivos: [...p.objetivos, v]}))} onRemove={(i)=>setFormData(p=>({...p, objetivos: p.objetivos.filter((_,x)=>x!==i)}))} placeholder="Objetivo..." maxItems={5} />
                        <div><div className="flex justify-between items-center mb-1.5"><label className="block text-label-large text-on-surface">Portada (URL)</label></div><input type="url" value={formData.imagen_url} onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })} className="input-outlined focus:bg-white mb-2" placeholder="https://..." />{formData.imagen_url && <img src={formData.imagen_url} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-outline-variant bg-surface-container-high" onError={(e) => e.target.style.display = 'none'} />}</div>
                        <DynamicList label="Galería" items={formData.galeria_imagenes} onAdd={(v)=>setFormData(p=>({...p, galeria_imagenes: [...p.galeria_imagenes, v]}))} onRemove={(i)=>setFormData(p=>({...p, galeria_imagenes: p.galeria_imagenes.filter((_,x)=>x!==i)}))} placeholder="https://..." type="url" maxItems={6} />
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20"><button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button><button type="submit" form="campaign-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Guardar</button></div>
            </div>
        </div>
    );
}

export default function AdminCampaignsPage() {
    const { campaigns, fetchCampaigns, getActiveCampaigns, getClosedCampaigns, loading } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [activeTab, setActiveTab] = useState('activas');
    
    // 🟢 NUEVO: Estado del Snackbar
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });
    const showMessage = (message, type = 'success') => setSnackbar({ show: true, message, type });

    // 🟢 NUEVO: Estado del ConfirmDialog
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const showConfirm = (title, message, onConfirm, type = 'danger') => setConfirmDialog({ isOpen: true, title, message, onConfirm, type });
    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); 
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, activeTab, sortBy, statusFilter]);

    const handleSave = async (data) => {
        try {
            if (editingCampaign && editingCampaign.id) {
                await actualizarCampana(editingCampaign.id, data);
                showMessage("Campaña actualizada exitosamente", "success");
            } else {
                await crearCampana(data);
                showMessage("¡Nueva campaña publicada!", "success");
            }
            setIsModalOpen(false); setEditingCampaign(null); await fetchCampaigns(); 
        } catch (error) { showMessage("Error al guardar la campaña", "error"); }
    };

    const handleChangeStatus = (id, nuevoEstado) => {
        let type = 'info';
        if (nuevoEstado === 'pausada') type = 'warning';
        if (nuevoEstado === 'cancelada') type = 'danger';

        showConfirm(
            'Cambiar Estado', 
            `¿Estás seguro de cambiar el estado de la campaña a ${nuevoEstado.toUpperCase()}?`, 
            async () => {
                closeConfirm();
                try {
                    await actualizarCampana(id, { estado: nuevoEstado });
                    showMessage(`Estado cambiado a ${nuevoEstado}`, type === 'danger' ? 'info' : type);
                    await fetchCampaigns(); 
                } catch (error) { showMessage("Error cambiando estado", "error"); }
            },
            type
        );
    };

    const handleDelete = (id) => {
        showConfirm(
            'Eliminar Campaña', 
            '¿Estás seguro de que deseas eliminar esta campaña? Esta acción no se puede deshacer.', 
            async () => {
                closeConfirm();
                try {
                    await eliminarCampana(id);
                    showMessage("Campaña eliminada", "error");
                    await fetchCampaigns();
                } catch (error) { showMessage("Error al eliminar", "error"); }
            }
        );
    };

    const handleReplicate = (camp) => {
        const replica = { ...camp, id: null, titulo: `${camp.titulo} (Copia)`, recaudo_actual: 0, fecha_inicio: new Date().toISOString().split('T')[0], fecha_fin: '' };
        setEditingCampaign(replica);
        setIsModalOpen(true);
        showMessage("Modifica los datos para crear la copia", "info");
    };

    const rawList = activeTab === 'activas' ? getActiveCampaigns() : getClosedCampaigns();
    const filteredList = rawList.filter(c => { const matchesSearch = c.titulo.toLowerCase().includes(searchQuery.toLowerCase()); const matchesStatus = statusFilter === 'all' || c.estado === statusFilter; return matchesSearch && matchesStatus; });
    const sortedList = [...filteredList].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
        if (sortBy === 'oldest') return new Date(a.fecha_creacion) - new Date(b.fecha_creacion);
        if (sortBy === 'progress') return (b.recaudo_actual / b.monto_objetivo) - (a.recaudo_actual / a.monto_objetivo);
        if (sortBy === 'alpha') return a.titulo.localeCompare(b.titulo); 
        if (sortBy === 'alpha_desc') return b.titulo.localeCompare(a.titulo); 
        return 0;
    });

    const paginatedList = sortedList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);

    const renderEmptyState = () => {
        if (rawList.length === 0) {
            if (activeTab === 'activas') {
                return ( <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in"><div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Heart className="w-10 h-10 text-primary" fill="currentColor" fillOpacity={0.2} /></div><h3 className="text-title-large text-on-surface font-bold mb-2">¡Haz realidad un sueño!</h3><p className="text-body-large text-on-surface-variant max-w-md mb-6">No tienes campañas activas en este momento. Crea una nueva campaña para empezar a recaudar fondos.</p><button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="btn-filled shadow-lg shadow-primary/20"><Plus className="w-5 h-5 mr-2" /> Crear Nueva Campaña</button></div> );
            } else {
                return ( <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in opacity-70"><Inbox className="w-16 h-16 text-on-surface-variant mb-4" /><h3 className="text-title-medium text-on-surface font-bold">Historial Vacío</h3><p className="text-body-medium text-on-surface-variant">Aquí aparecerán las campañas completadas o canceladas.</p></div> );
            }
        } 
        if (paginatedList.length === 0) return ( <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent animate-fade-in"><Search className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" /><h3 className="text-title-medium text-on-surface mb-1">No se encontraron resultados</h3><p className="text-body-small text-on-surface-variant">Intenta ajustar tu búsqueda o los filtros.</p><button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="btn-text mt-2 text-primary font-bold">Limpiar filtros</button></div> );
        return null;
    };

    return (
        <AdminLayout title="Gestión de Campañas" subtitle="Administra las campañas de donación.">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 bg-surface-container rounded-full p-1 w-fit">
                    <button onClick={() => setActiveTab('activas')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'activas' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Activas ({getActiveCampaigns().length})</button>
                    <button onClick={() => setActiveTab('historial')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'historial' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Historial ({getClosedCampaigns().length})</button>
                </div>
                <button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex shadow-primary/20"><Plus className="w-4 h-4" /> Nueva Campaña</button>
            </div>

            {(rawList.length > 0 || searchQuery || statusFilter !== 'all') && (
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" /><input type="text" placeholder="Buscar campaña..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" /></div>
                    <div className="flex gap-2 overflow-x-auto">
                        {activeTab === 'activas' && ( <div className="relative min-w-[140px]"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full"><option value="all">Estado: Todos</option><option value="activa">Activas</option><option value="pausada">Pausadas</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" /></div> )}
                        <div className="relative min-w-[180px]"><ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" /><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full"><option value="newest">Más Recientes</option><option value="oldest">Más Antiguas</option><option value="progress">Mayor Progreso</option><option value="alpha">A - Z</option><option value="alpha_desc">Z - A</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" /></div>
                    </div>
                </div>
            )}

            <div className="min-h-[400px]">
                {paginatedList.length === 0 ? renderEmptyState() : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedList.map(camp => (
                            <div key={camp.id} className={`card-elevated flex flex-col h-full animate-fade-in group hover:-translate-y-1 transition-transform duration-300 ${activeTab === 'historial' ? 'grayscale opacity-90 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                <div className="h-40 w-full bg-surface-container-high relative overflow-hidden rounded-t-xl">
                                    {camp.imagen_url ? <img src={camp.imagen_url} alt={camp.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex items-center justify-center h-full text-on-surface-variant"><ImageIcon size={32} opacity={0.5}/></div>}
                                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold shadow-sm capitalize ${camp.estado === 'activa' ? 'bg-success-container text-success' : camp.estado === 'pausada' ? 'bg-warning-container text-warning' : 'bg-surface-container-high text-on-surface-variant'}`}>{camp.estado}</div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between text-[10px] text-on-surface-variant font-medium mb-2 uppercase tracking-wide"><span>Creada: {formatDate(camp.fecha_creacion)}</span></div>
                                    <h3 className="text-title-medium font-bold text-on-surface mb-2 line-clamp-1">{camp.titulo}</h3>
                                    <p className="text-body-small text-on-surface-variant line-clamp-2 mb-4 flex-1">{camp.descripcion}</p>
                                    {camp.permite_donacion_monetaria && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs font-bold mb-1"><span className="text-primary">${formatCurrency(camp.recaudo_actual || 0)}</span><span className="text-on-surface-variant">Meta: ${formatCurrency(camp.monto_objetivo)}</span></div>
                                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${Math.min(((camp.recaudo_actual || 0) / camp.monto_objetivo) * 100, 100)}%` }} /></div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 mt-auto pt-3 border-t border-outline-variant/20">
                                        {activeTab === 'activas' ? (
                                            <>
                                                <button onClick={() => { setEditingCampaign(camp); setIsModalOpen(true); }} className="btn-tonal py-2 flex-1 text-xs justify-center"><Edit size={16} className="mr-1"/> Editar</button>
                                                {camp.estado === 'activa' ? <button onClick={() => handleChangeStatus(camp.id, 'pausada')} className="btn-outlined py-2 px-2 text-warning border-warning hover:bg-warning/10" title="Pausar"><Pause size={16}/></button> : <button onClick={() => handleChangeStatus(camp.id, 'activa')} className="btn-outlined py-2 px-2 text-success border-success hover:bg-success/10" title="Activar"><Play size={16}/></button>}
                                                <button onClick={() => handleChangeStatus(camp.id, 'completada')} className="btn-outlined py-2 px-2 text-primary border-primary hover:bg-primary/10" title="Completar"><Check size={16}/></button>
                                                <button onClick={() => handleChangeStatus(camp.id, 'cancelada')} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Terminar (Cancelar)"><Archive size={16}/></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleReplicate(camp)} className="btn-tonal py-2 flex-1 text-xs justify-center bg-secondary-container text-secondary-on-container"><Copy size={16} className="mr-1"/> Replicar</button>
                                                <button onClick={() => handleDelete(camp.id)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10"><Trash2 size={16}/></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {sortedList.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            <button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {loading && <div className="text-center py-10 opacity-50 flex flex-col items-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>Cargando...</div>}
            {isModalOpen && <CampaignFormModal campaign={editingCampaign} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
            
            {/* 🟢 COMPONENTES VISUALES M3 */}
            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
            <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} type={confirmDialog.type} onConfirm={confirmDialog.onConfirm} onCancel={closeConfirm} />
        </AdminLayout>
    );
}
```

### 📄 frontend/src/pages/AdminConvocationsPage.jsx
```javascript
import { useState, useEffect } from 'react';
import { 
    crearConvocatoria, actualizarConvocatoria, cambiarEstadoConvocatoria, eliminarConvocatoria 
} from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout';
import TimePickerMD3 from '../components/TimePickerMD3';
import Snackbar from '../components/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog'; // 🟢 NUEVO
import {
    Plus, Edit, Trash2, X, Save, MapPin, Users,
    Briefcase, Pause, Play, Archive, Search, Filter, ChevronDown, 
    Check, ChevronUp, Clock3, AlertCircle, ArrowUpDown, 
    ChevronLeft, ChevronRight, Copy, Inbox, Video, Laptop, Home
} from 'lucide-react';

const CATEGORIAS_INTERES = ["Salud", "Capacitación / Cursos", "Estética y Belleza", "Educación Infantil", "Medio Ambiente", "Adulto Mayor", "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial", "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"];
const HABILIDADES_OPCIONES = ["Sin Experiencia Previa", "Disponibilidad de Tiempo", "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva", "Inglés Básico", "Inglés Avanzado", "Excel / Office", "Diseño Gráfico", "Programación / IT", "Primeros Auxilios", "Fotografía y Video", "Redacción", "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía", "Conducción", "Cocina", "Manualidades"];
const BENEFICIOS_OPCIONES = ["Certificado de Curso/Diplomado", "Materiales Incluidos", "Certificado de Voluntariado", "Refrigerio / Alimentación", "Transporte", "Camiseta / Uniforme", "Capacitación Certificada", "Experiencia Laboral", "Red de Contactos", "Bonificación", "Créditos Académicos", "Seguro de Accidentes"];
const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const mapBackendToForm = (convocation) => {
    if (!convocation) return null;
    let skillsArray = [];
    if (convocation.habilidades_requeridas) {
        skillsArray = typeof convocation.habilidades_requeridas === 'string' ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean) : convocation.habilidades_requeridas;
    }
    const horarioData = convocation.horario || {};
    let tipoHorario = 'unico', fechaEvento = '', horaInicio = '', horaFin = '', horarioMatrix = {};
    
    if (horarioData.tipo === 'unico') {
        tipoHorario = 'unico'; fechaEvento = horarioData.fecha || ''; horaInicio = horarioData.horaInicio || ''; horaFin = horarioData.horaFin || '';
    } else if (horarioData.tipo === 'recurrente' || Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
        tipoHorario = 'recurrente';
        DIAS_SEMANA.forEach(dia => { if (horarioData[dia]) horarioMatrix[dia] = horarioData[dia]; });
    }
    return {
        id: convocation.id, title: convocation.titulo || '', description: convocation.descripcion || '', location: convocation.ubicacion || '',
        whatsappGroupLink: convocation.link_whatsapp || '', modalidad: convocation.modalidad ? convocation.modalidad.toLowerCase() : 'presencial', spots: convocation.cupos_disponibles || 1,
        startDate: tipoHorario === 'recurrente' && convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '',
        endDate: tipoHorario === 'recurrente' && convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '',
        categorias: convocation.categorias || [], skills: skillsArray, beneficios: convocation.beneficios || [], 
        tipoHorario, fechaEvento, horaInicio, horaFin, horario: horarioMatrix
    };
};

function ConvocationFormModal({ convocation, onSave, onClose }) {
    const initialValues = { title: '', description: '', location: '', whatsappGroupLink: '', modalidad: 'presencial', spots: 1, startDate: '', endDate: '', categorias: [], skills: [], beneficios: [], tipoHorario: 'unico', fechaEvento: '', horaInicio: '', horaFin: '', horario: {} };
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [matrixErrors, setMatrixErrors] = useState({});
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllBenefits, setShowAllBenefits] = useState(false);

    useEffect(() => {
        if (convocation) setFormData({ ...initialValues, ...convocation });
        else setFormData(initialValues);
    }, [convocation]);

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const handleTipoHorarioChange = (tipo) => {
        if (tipo === formData.tipoHorario) return;
        setFormData({ ...formData, tipoHorario: tipo });
        setErrors(prev => { 
            const newErrors = {...prev}; 
            if (tipo === 'recurrente') { delete newErrors.fecha; delete newErrors.hora; } 
            else { delete newErrors.startDate; delete newErrors.endDate; delete newErrors.horario; }
            return newErrors; 
        });
    };

    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) return { ...prev, [field]: list.filter(i => i !== item) };
            if (max && list.length >= max) return prev;
            return { ...prev, [field]: [...list, item] };
        });
    };

    const toMinutes = (timeStr) => { if (!timeStr) return -1; const [h, m] = timeStr.split(':').map(Number); return (h * 60) + m; };
    const findTemplateDay = (currentSchedule) => Object.values(currentSchedule).find(day => day.start && day.end && toMinutes(day.end) > toMinutes(day.start));

    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...(prev.horario || {}) };
            if (newHorario[day]) { delete newHorario[day]; setMatrixErrors(prevE => { const n = {...prevE}; delete n[day]; return n; }); } 
            else { const template = findTemplateDay(newHorario); newHorario[day] = template ? { ...template } : { start: '08:00', end: '12:00' }; }
            return { ...prev, horario: newHorario };
        });
    };

    const handleDayTimeChange = (day, field, value) => {
        const currentDay = { ...(formData.horario[day] || { start: '', end: '' }) };
        currentDay[field] = value;
        let errorMsg = null;
        if (currentDay.start && currentDay.end && toMinutes(currentDay.end) <= toMinutes(currentDay.start)) { errorMsg = "La hora final debe ser posterior."; currentDay.end = ''; }
        setMatrixErrors(prev => { const newErrs = { ...prev }; if (errorMsg) newErrs[day] = errorMsg; else delete newErrs[day]; return newErrs; });
        setFormData(prev => ({ ...prev, horario: { ...prev.horario, [day]: currentDay } }));
    };

    const handleUniqueTimeChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            const start = field === 'horaInicio' ? value : prev.horaInicio;
            const end = field === 'horaFin' ? value : prev.horaFin;
            if (start && end && toMinutes(start) >= toMinutes(end)) setErrors(e => ({ ...e, hora: "La hora fin debe ser después del inicio" }));
            else setErrors(e => { const { hora, ...rest } = e; return rest; });
            return newState;
        });
    };

    const handleUniqueDateChange = (value) => {
        setFormData({ ...formData, fechaEvento: value });
        setErrors(prev => { const n = {...prev}; delete n.fecha; return n; });
        const today = new Date().toISOString().split('T')[0];
        if (!convocation?.id && value < today) setErrors(prev => ({...prev, fecha: "No puede ser en el pasado."}));
    };

    const handleDateChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
        const hoy = new Date().toISOString().split('T')[0];
        const start = field === 'startDate' ? value : formData.startDate;
        const end = field === 'endDate' ? value : formData.endDate;
        if (field === 'startDate' && !convocation?.id && value < hoy) setErrors(prev => ({...prev, startDate: "No puede iniciar en el pasado."}));
        if (start && end && end < start) setErrors(prev => ({...prev, endDate: "El cierre debe ser posterior al inicio."}));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.description?.trim()) newErrors.description = "La descripción es obligatoria.";
        if (!formData.location?.trim()) newErrors.location = formData.modalidad === 'virtual' ? "El enlace es obligatorio." : "La dirección es obligatoria.";
        
        if (formData.tipoHorario === 'unico') {
            if (!formData.fechaEvento) newErrors.fecha = "Selecciona una fecha.";
            if (!formData.horaInicio || !formData.horaFin) newErrors.hora = "Define el horario completo.";
            if (errors.hora) newErrors.hora = errors.hora; 
            if (errors.fecha) newErrors.fecha = errors.fecha; 
        } else {
            if (Object.keys(formData.horario).length === 0) newErrors.horario = "Selecciona al menos un día.";
            if (Object.keys(matrixErrors).length > 0) newErrors.horario = "Corrige los errores en los horarios.";
            if (!formData.startDate) newErrors.startDate = "Define fecha de inicio.";
            if (!formData.endDate) newErrors.endDate = "Define fecha de cierre.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        let startDate = '', endDate = '', horarioFinal = {};
        if (formData.tipoHorario === 'unico') {
             startDate = `${formData.fechaEvento}T${formData.horaInicio || '00:00'}:00`;
             endDate = `${formData.fechaEvento}T${formData.horaFin || '23:59'}:00`;
             horarioFinal = { tipo: 'unico', fecha: formData.fechaEvento, horaInicio: formData.horaInicio, horaFin: formData.horaFin };
        } else {
             startDate = `${formData.startDate}T00:00:00`;
             endDate = `${formData.endDate}T23:59:59`;
             horarioFinal = { tipo: 'recurrente', ...formData.horario };
        }
        const payload = {
            title: formData.title, description: formData.description, location: formData.location, whatsappGroupLink: formData.whatsappGroupLink,
            modalidad: formData.modalidad, startDate, endDate, spots: parseInt(formData.spots) || 1, skills: formData.skills || [],
            categorias: formData.categorias || [], beneficios: formData.beneficios || [], horario: horarioFinal
        };
        onSave(payload);
    };

    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => (
        <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-baseline mb-2">
                <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                <span className={`text-xs font-medium ${max && formData[field].length >= max ? 'text-primary' : 'text-on-surface-variant'}`}>({formData[field].length}{max ? `/${max}` : ''})</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {(showAll ? options : options.slice(0, 8)).map(opt => (
                    <button key={opt} type="button" onClick={() => toggleSelection(field, opt, max)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${formData[field].includes(opt) ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                        {formData[field].includes(opt) && <Check size={12}/>} {opt}
                    </button>
                ))}
            </div>
            {options.length > 8 && <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 text-xs text-primary font-bold flex items-center hover:underline">
                {showAll ? <><ChevronUp size={14} className="mr-1"/> Ver menos</> : <><ChevronDown size={14} className="mr-1"/> Ver más ({options.length - 8} restantes)</>}
            </button>}
        </div>
    );

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
                            <div id="field-title"><label className="block text-label-large text-on-surface mb-1.5">Título *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`input-outlined focus:bg-white ${errors.title ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Jornada de Salud Oral" />{errors.title && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.title}</p>}</div>
                            <div id="field-description"><label className="block text-label-large text-on-surface mb-1.5">Descripción *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.description ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.description && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.description}</p>}</div>
                        </div>
                        
                        {renderChipsSection("Categoría / Tipo de Oportunidad", "categorias", CATEGORIAS_INTERES, showAllCats, setShowAllCats, 3)}
                        {renderChipsSection("Requisitos / Habilidades", "skills", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills, null)}
                        {renderChipsSection("Beneficios Ofrecidos", "beneficios", BENEFICIOS_OPCIONES, showAllBenefits, setShowAllBenefits, null)}

                        <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                            <div>
                                <label className="block text-label-large text-on-surface mb-2 font-bold">Modalidad</label>
                                <div className="flex bg-surface-container rounded-lg p-1 w-full">
                                    <button type="button" onClick={() => setFormData({...formData, modalidad: 'presencial'})} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex justify-center items-center gap-2 ${formData.modalidad === 'presencial' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}>
                                        <Home size={18} /> Presencial
                                    </button>
                                    <button type="button" onClick={() => setFormData({...formData, modalidad: 'virtual'})} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex justify-center items-center gap-2 ${formData.modalidad === 'virtual' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}>
                                        <Video size={18} /> Virtual
                                    </button>
                                </div>
                            </div>

                            <div id="field-location">
                                <label className="block text-label-large text-on-surface mb-2 font-bold">
                                    {formData.modalidad === 'presencial' ? 'Dirección del Evento *' : 'Enlace de Reunión (Meet/Zoom/Teams) *'}
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                        {formData.modalidad === 'presencial' ? <MapPin size={20} /> : <Laptop size={20} />}
                                    </div>
                                    <input 
                                        type={formData.modalidad === 'virtual' ? 'url' : 'text'}
                                        value={formData.location} 
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                                        className={`input-outlined pl-10 w-full focus:bg-white ${errors.location ? 'border-error bg-error-container text-error' : ''}`} 
                                        placeholder={formData.modalidad === 'presencial' ? "Ej: Calle 10 # 5-20, Barrio Comuneros" : "Ej: https://meet.google.com/abc-xyz-123"} 
                                    />
                                </div>
                                {errors.location && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.location}</p>}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-outline-variant/30" id="field-horario">
                            <label className="block text-label-large text-on-surface mb-3 font-bold text-primary flex items-center gap-2"><Clock3 size={18} /> Disponibilidad Requerida</label>
                            
                            <div className="flex bg-surface-container rounded-lg p-1 mb-4 w-fit">
                                <button type="button" onClick={() => handleTipoHorarioChange('unico')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'unico' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Evento Único</button>
                                <button type="button" onClick={() => handleTipoHorarioChange('recurrente')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'recurrente' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Recurrente</button>
                            </div>
                            
                            {errors.horario && <p className="text-error text-sm mb-2 font-bold flex items-center animate-pulse"><AlertCircle size={14} className="mr-1"/>{errors.horario}</p>}
                            
                            {formData.tipoHorario === 'unico' ? (
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-3" id="field-fecha">
                                        <label className="text-xs font-bold text-primary uppercase tracking-wide mb-1 block">Fecha</label>
                                        <input type="date" value={formData.fechaEvento} onChange={(e) => handleUniqueDateChange(e.target.value)} className={`input-outlined bg-white ${errors.fecha ? 'border-error' : ''}`} />
                                        {errors.fecha && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha}</p>}
                                    </div>
                                    <div id="field-hora"><TimePickerMD3 label="Inicio" value={formData.horaInicio} onChange={(val) => handleUniqueTimeChange('horaInicio', val)} /></div>
                                    <div><TimePickerMD3 label="Fin" value={formData.horaFin} onChange={(val) => handleUniqueTimeChange('horaFin', val)} /></div>
                                    
                                    {errors.hora && (
                                        <div className="col-span-3 bg-error/10 text-error text-xs font-bold py-2 px-3 rounded-xl border border-error/20 flex items-center justify-center animate-pulse">
                                            <AlertCircle size={14} className="mr-1.5" />
                                            {errors.hora}
                                        </div>
                                    )}
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
                                                        <div className="flex-1 flex flex-col gap-2 animate-fade-in pl-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Inicio" value={formData.horario[dia].start} onChange={(val) => handleDayTimeChange(dia, 'start', val)} /></div>
                                                                <span className="text-on-surface-variant text-lg font-bold mx-1">:</span>
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Fin" value={formData.horario[dia].end} onChange={(val) => handleDayTimeChange(dia, 'end', val)} /></div>
                                                            </div>
                                                            
                                                            {matrixErrors[dia] && (
                                                                <div className="mt-1 w-full bg-error/10 text-error text-[11px] font-bold py-2 px-3 rounded-xl border border-error/20 flex items-center justify-center animate-pulse">
                                                                    <AlertCircle size={12} className="mr-1.5 shrink-0" />
                                                                    {matrixErrors[dia]}
                                                                </div>
                                                            )}
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
                                    <div id="field-startDate">
                                        <label className="block text-label-large font-bold mb-1.5">Inicio</label>
                                        <input type="date" value={formData.startDate} onChange={(e) => handleDateChange('startDate',e.target.value)} className={`input-outlined focus:bg-white ${errors.startDate?'border-error bg-error-container text-error':''}`}/>
                                        {errors.startDate && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.startDate}</p>}
                                    </div>
                                    <div id="field-endDate">
                                        <label className="block text-label-large font-bold mb-1.5">Cierre</label>
                                        <input type="date" value={formData.endDate} onChange={(e) => handleDateChange('endDate',e.target.value)} className={`input-outlined focus:bg-white ${errors.endDate?'border-error bg-error-container text-error':''}`}/>
                                        {errors.endDate && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.endDate}</p>}
                                    </div>
                                </>
                            )}
                            <div><label className="block text-label-large font-bold mb-1.5">Cupos / Vacantes</label><input type="number" min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined text-center focus:bg-white" /></div>
                            <div className="pt-0"><label className="block text-label-large font-bold mb-1.5">Grupo WhatsApp (Opcional)</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>
                        </div>
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg">
                        <Save className="w-4 h-4 mr-2" /> 
                        {convocation && convocation.id ? 'Guardar' : 'Publicar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminConvocationsPage() {
    const { getActiveConvocations, getClosedConvocations, fetchConvocations } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    
    // 🟢 NUEVO: Estado del Snackbar
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });
    const showMessage = (message, type = 'success') => setSnackbar({ show: true, message, type });

    // 🟢 NUEVO: Estado del ConfirmDialog
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const showConfirm = (title, message, onConfirm, type = 'danger') => setConfirmDialog({ isOpen: true, title, message, onConfirm, type });
    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

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

    const handleSave = async (data) => {
        try {
            if (editingConvocation && editingConvocation.id) {
                await actualizarConvocatoria(editingConvocation.id, data);
                showMessage("Convocatoria actualizada exitosamente", "success");
            } else {
                await crearConvocatoria(data);
                showMessage("¡Nueva convocatoria publicada!", "success");
            }
            setIsModalOpen(false); 
            setEditingConvocation(null); 
            await fetchConvocations();
        } catch (error) { showMessage("Error al guardar la convocatoria", "error"); }
    };

    const handleDelete = (id) => {
        showConfirm(
            'Eliminar Convocatoria', 
            '¿Estás seguro de que deseas eliminar esta convocatoria? Esta acción no se puede deshacer.', 
            async () => {
                closeConfirm();
                try { 
                    await eliminarConvocatoria(id); 
                    showMessage("Convocatoria eliminada", "error");
                    await fetchConvocations(); 
                } catch (error) { showMessage("Error al eliminar", "error"); }
            }
        );
    };

    const handleStatusChange = (id, status) => {
        let type = 'info';
        if (status === 'pausada') type = 'warning';
        if (status === 'cerrada') type = 'danger';

        showConfirm(
            'Cambiar Estado', 
            `¿Estás seguro de cambiar el estado a ${status.toUpperCase()}?`, 
            async () => {
                closeConfirm();
                try { 
                    await cambiarEstadoConvocatoria(id, status); 
                    showMessage(`Estado cambiado a ${status}`, type === 'danger' ? 'info' : type);
                    await fetchConvocations(); 
                } catch (error) { showMessage("Error al cambiar estado", "error"); }
            },
            type
        );
    };

    const handleReplicate = (convocation) => {
        const formData = mapBackendToForm(convocation);
        if(formData) {
            const replica = { 
                ...formData, id: null, title: `${formData.title} (Copia)`,
                startDate: '', endDate: '', fechaEvento: ''
            };
            setEditingConvocation(replica);
            setIsModalOpen(true);
            showMessage("Modifica los datos para crear la copia", "info");
        }
    };

    const handleEdit = (convocation) => {
        const formData = mapBackendToForm(convocation);
        if(formData) {
            setEditingConvocation(formData);
            setIsModalOpen(true);
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

    const renderEmptyState = () => {
        if (rawConvocations.length === 0) {
            if (activeTab === 'active') {
                return (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Briefcase className="w-10 h-10 text-primary" /></div>
                        <h3 className="text-title-large text-on-surface font-bold mb-2">¡Comienza tu impacto!</h3>
                        <p className="text-body-large text-on-surface-variant max-w-md mb-6">Aún no tienes convocatorias activas. Crea una nueva oportunidad para que los voluntarios se sumen.</p>
                        <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled shadow-lg shadow-primary/20"><Plus className="w-5 h-5 mr-2" /> Crear Primera Convocatoria</button>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in opacity-70">
                        <Inbox className="w-16 h-16 text-on-surface-variant mb-4" />
                        <h3 className="text-title-medium text-on-surface font-bold">Historial Vacío</h3>
                        <p className="text-body-medium text-on-surface-variant">Aquí aparecerán las convocatorias que cierres o terminen.</p>
                    </div>
                );
            }
        } 
        if (paginatedConvocations.length === 0) {
            return (
                <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent animate-fade-in">
                    <Search className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" />
                    <h3 className="text-title-medium text-on-surface mb-1">No se encontraron resultados</h3>
                    <p className="text-body-small text-on-surface-variant">Intenta ajustar tu búsqueda o filtros.</p>
                    <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="btn-text mt-2 text-primary font-bold">Limpiar filtros</button>
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout title="Gestión de Convocatorias" subtitle="Crea y administra las oportunidades.">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 bg-surface-container rounded-full p-1 w-fit">
                    <button onClick={() => setActiveTab('active')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Activas ({getActiveConvocations().length})</button>
                    <button onClick={() => setActiveTab('history')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Historial ({getClosedConvocations().length})</button>
                </div>
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled shadow-primary/20 hidden sm:flex"><Plus className="w-4 h-4" /> Nueva Convocatoria</button>
            </div>

            {rawConvocations.length > 0 && (
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
                                        <option value="all">Todos</option>
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
            )}

            <div className="space-y-4 pt-2 min-h-[400px]">
                {paginatedConvocations.length === 0 ? renderEmptyState() : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedConvocations.map(convocation => {
                            const isPublished = convocation.estado === 'abierta' || convocation.status === 'published';
                            
                            return (
                                <div key={convocation.id} className={`card-elevated flex flex-col h-full animate-fade-in group hover:-translate-y-1 transition-transform duration-300 ${activeTab === 'history' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            {getStatusBadge(convocation.estado || convocation.status)}
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${convocation.modalidad === 'virtual' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                                                {convocation.modalidad === 'virtual' ? <Video size={12}/> : <Home size={12}/>}
                                                {convocation.modalidad || 'Presencial'}
                                            </div>
                                        </div>

                                        <h3 className="text-title-medium font-bold text-on-surface mb-2 line-clamp-1">{convocation.title || convocation.titulo}</h3>
                                        <p className="text-body-small text-on-surface-variant line-clamp-2 mb-4 flex-1">{convocation.description || convocation.descripcion}</p>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-on-surface-variant truncate">
                                                {convocation.modalidad === 'virtual' ? <Laptop size={16} className="text-indigo-500"/> : <MapPin size={16} className="text-orange-500"/>} 
                                                <span className="truncate">{convocation.location || convocation.ubicacion || (convocation.modalidad === 'virtual' ? 'Enlace de conexión' : 'Sede Principal')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-on-surface-variant"><Users size={16} className="text-primary"/> {convocation.spots || convocation.cupos_disponibles} cupos</div>
                                        </div>

                                        <div className="flex gap-2 mt-auto pt-3 border-t border-outline-variant/20">
                                            {activeTab === 'active' ? (
                                                <>
                                                    <button onClick={() => handleEdit(convocation)} className="btn-tonal py-2 flex-1 text-xs justify-center"><Edit size={16} className="mr-1"/> Editar</button>
                                                    {isPublished ? (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'pausada')} className="btn-outlined py-2 px-2 text-warning border-warning hover:bg-warning/10" title="Pausar"><Pause size={16}/></button>
                                                    ) : (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'abierta')} className="btn-outlined py-2 px-2 text-success border-success hover:bg-success/10" title="Publicar"><Play size={16}/></button>
                                                    )}
                                                    <button onClick={() => handleStatusChange(convocation.id, 'cerrada')} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Terminar (Cerrar)"><Archive size={16}/></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleReplicate(convocation)} className="btn-tonal py-2 flex-1 text-xs justify-center bg-secondary-container text-secondary-on-container"><Copy size={16} className="mr-1"/> Replicar</button>
                                                    <button onClick={() => handleDelete(convocation.id)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10"><Trash2 size={16}/></button>
                                                </>
                                            )}
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
            
            {/* 🟢 COMPONENTES VISUALES M3 */}
            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
            
            <ConfirmDialog 
                isOpen={confirmDialog.isOpen} 
                title={confirmDialog.title} 
                message={confirmDialog.message} 
                type={confirmDialog.type} 
                onConfirm={confirmDialog.onConfirm} 
                onCancel={closeConfirm} 
            />
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

### 📄 frontend/src/components/ConfirmDialog.jsx
```javascript
// src/components/ConfirmDialog.jsx
import { AlertTriangle, Info } from 'lucide-react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, type = 'danger', confirmText = 'Confirmar', cancelText = 'Cancelar' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 isolate" style={{ touchAction: 'none' }}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in" onClick={onCancel}></div>
            <div className="relative bg-surface rounded-3xl p-6 max-w-sm w-full shadow-elevation-4 animate-slide-up text-center flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${type === 'danger' ? 'bg-error-container text-error' : 'bg-primary-container text-primary'}`}>
                    {type === 'danger' ? <AlertTriangle size={28} /> : <Info size={28} />}
                </div>
                <h3 className="text-title-large font-bold text-on-surface mb-2">{title}</h3>
                <p className="text-body-medium text-on-surface-variant mb-6">{message}</p>
                <div className="flex w-full gap-3">
                    <button onClick={onCancel} className="btn-outlined flex-1 font-bold">{cancelText}</button>
                    <button onClick={onConfirm} className={`btn-filled flex-1 font-bold ${type === 'danger' ? 'bg-error hover:bg-error/90 text-white border-error shadow-error/20' : ''}`}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}
```

### 📄 frontend/src/components/Snackbar.jsx
```javascript
// src/components/Snackbar.jsx
import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, Trash2, X } from 'lucide-react';

export default function Snackbar({ show, message, type = 'info', onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onClose(), 3500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const styles = {
        success: "bg-success-container text-success border-success/20",
        info: "bg-primary-container text-primary border-primary/20",
        warning: "bg-warning-container text-warning border-warning/20",
        error: "bg-error text-white border-error shadow-error/30",
    };

    const icons = {
        success: <CheckCircle2 size={20} />,
        info: <Info size={20} />,
        warning: <AlertCircle size={20} />,
        error: <Trash2 size={20} />
    };

    return (
        <div className={`fixed z-[200] flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-full shadow-elevation-4 border transition-all duration-300
            top-4 sm:top-auto sm:bottom-6 left-1/2 -translate-x-1/2 w-[90vw] sm:w-fit max-w-md animate-fade-in
            ${styles[type] || styles.info}`}>
            <div className="shrink-0">{icons[type]}</div>
            <span className="text-sm font-bold tracking-wide flex-1 text-left">{message}</span>
            <button onClick={onClose} className="ml-2 p-1 rounded-full hover:bg-black/10 transition-colors shrink-0">
                <X size={16} />
            </button>
        </div>
    );
}
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

