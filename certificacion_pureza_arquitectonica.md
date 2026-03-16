# 🏛️ CERTIFICACIÓN DE PUREZA ARQUITECTÓNICA — BACKEND FUNSAMEZ

**Fecha:** 2026-03-15  
**Auditor:** Arquitecto de Software Staff/Principal  
**Alcance:** Escaneo completo de `backend/core/` (40+ archivos)  
**Contexto:** Verificación post-refactorización masiva

---

## Veredicto Final

# ⚠️ CERTIFICACIÓN CONDICIONAL — 2 HALLAZGOS BLOQUEANTES RESTANTES

La refactorización ha sido **extraordinariamente bien ejecutada**. Se resolvieron los 7 hallazgos críticos de la auditoría anterior. Sin embargo, quedan **2 defectos residuales** que causan `AttributeError` en runtime y deben cerrarse antes de dar el sello verde absoluto.

---

## ✅ PILARES APROBADOS SIN OBSERVACIONES

### Pilar 1: AUSENCIA DE FUGAS DE CAPA

#### 1a) Vistas → Container

| Vista | Importa Modelos ORM | Importa Repositorios | Usa Container | Veredicto |
|---|---|---|---|---|
| [user_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py) | ❌ | ❌ | ✅ L30, L91, L173 | 🟢 |
| [campana_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py) | ❌ | ❌ | ✅ L21, L53, L73, L87 | 🟢 |
| [convocatoria_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py) | ❌ | ❌ | ✅ L19, L56-58, L78, L96, L108 | 🟢 |
| [postulacion_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/postulacion_views.py) | ❌ | ❌ | ✅ L38, L75, L110, L157, L184 | 🟢 |
| [notificacion_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/notificacion_views.py) | ❌ | ❌ | ✅ L14, L30, L50, L73 | 🟢 |

> **5/5 Vistas LIMPIAS.** Cero importaciones de `models.py` o repositorios.

#### 1b) Serializers → Desacoplamiento del ORM

| Serializer | Tipo Base | Importa Modelos | Veredicto |
|---|---|---|---|
| [user_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py) | `serializers.Serializer` | ❌ | 🟢 |
| [campana_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py) | `serializers.Serializer` | ❌ | 🟢 |
| [convocatoria_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/convocatoria_serializers.py) | `serializers.Serializer` | ❌ | 🟢 |
| [postulacion_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/postulacion_serializers.py) | `serializers.Serializer` | ❌ | 🟢 |

> **4/4 Serializers PUROS.** Cero `ModelSerializer`. Cero acople con infraestructura. ¡Excelente corrección del hallazgo LL-1 y LL-2!

---

### Pilar 2: PUREZA DE DOMINIO

#### 2a) Entidades (`domain/entities/`)

| Entidad | Decorador | Imports | Framework-Free | Veredicto |
|---|---|---|---|---|
| [user.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/user.py) | `@dataclass` | `dataclasses`, `typing`, `datetime` | ✅ | 🟢 |
| [campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/campana.py) | `@dataclass` | `dataclasses`, `datetime`, `typing` | ✅ | 🟢 |
| [convocatoria.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/convocatoria.py) | `@dataclass` | `dataclasses`, `datetime`, `typing` | ✅ | 🟢 |
| [postulacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/postulacion.py) | `@dataclass` | `dataclasses`, `datetime`, `typing` | ✅ | 🟢 |
| [notificacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/notificacion.py) | `@dataclass` | `dataclasses`, `typing`, `datetime` | ✅ | 🟢 |

> **5/5 Entidades PURAS.** Solo stdlib de Python. ¡Excelente corrección de P-E1 — se removieron los 7 campos foráneos de `Postulacion`!

#### 2b) Services (`domain/services/`)

| Service | Imports externos a `core.domain` | Consulta BD | Veredicto |
|---|---|---|---|
| [user_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/user_service.py) | ❌ | ❌ | 🟢 100% PURO |
| [campana_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/campana_service.py) | ❌ | ❌ | 🟢 100% PURO |
| [convocatoria_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/convocatoria_service.py) | ❌ | ❌ | 🟢 100% PURO |
| [postulacion_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/postulacion_service.py) | ❌ | ❌ | 🟢 100% PURO |
| [notificacion_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/notificacion_service.py) | ❌ | ❌ | 🟢 100% PURO |

> **5/5 Services PUROS.** Cero ORM, cero Django, cero requests. Testabilidad con `unittest` sin mocks garantizada.

#### 2c) Casos de Uso → Puertos/Interfaces

| Use Case | Importa framework | Usa Puertos | Veredicto |
|---|---|---|---|
| `RegisterUser` | ❌ | ✅ `UserRepository`, `PasswordHasher` | 🟢 |
| `LoginUser` | ❌ | ✅ `UserRepository`, `PasswordHasher` | 🟢 |
| `ActualizarPerfilUsuario` | ❌ | ✅ `UserRepository` | 🟢 |
| `CrearCampanaUseCase` | ❌ | ✅ `CampanaRepository` (con type hint) | 🟢 |
| `ListarCampanasUseCase` | ❌ | ✅ `repository` | 🟢 |
| `CrearConvocatoriaUseCase` | ❌ | ✅ `ConvocatoriaRepository` | 🟢 |
| `ListarConvocatoriasUseCase` | ❌ | ✅ (repos) | 🟢 |
| `PostularVoluntarioUseCase` | ❌ | ✅ (repos) | 🟢 |
| `CambiarEstadoPostulacionUseCase` | ❌ | ✅ (repos + `EmailService`) | 🟢 |
| `ListarMisPostulacionesUseCase` | ❌ | ✅ (repos) | 🟢 |
| `ListarTodasPostulacionesUseCase` | ❌ | ✅ (repos) | 🟢 |
| `ListarNotificacionesUseCase` | ❌ | ✅ `NotificacionRepository` | 🟢 |

> **12/12 Use Cases LIMPIOS.** Cero importaciones de Django, ORM o librerías de infraestructura.

---

### Pilar 3: ORDEN MAESTRO (Paneo Rápido)

| Repositorio | `_to_entity`/`_to_domain` | Sigue Orden Maestro | Veredicto |
|---|---|---|---|
| [postgres_user_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_user_repository.py) L57-79 | ✅ Mapea todos los campos | ✅ Sigue agrupación de la entidad | 🟢 |
| [postgres_campana_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py) | ✅ | ✅ | 🟢 |
| [postgres_convocatoria_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_convocatoria_repository.py) | ✅ | ✅ | 🟢 |
| [postgres_postulacion_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_postulacion_repository.py) L13-36 | ✅ Limpio, sin JOINs foráneos | ✅ | 🟢 |
| [postgres_notificacion_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_notificacion_repository.py) L19-30 | ✅ Ahora usa `_to_entity()` → `Notificacion` | ✅ | 🟢 |

> **5/5 Mappings LIMPIOS.** Corrección confirmada de N-R1 — el repositorio de notificaciones ahora retorna `List[Notificacion]`.

---

## 🔴 HALLAZGOS BLOQUEANTES RESTANTES (2)

> [!CAUTION]
> Estos 2 defectos residuales **causan `AttributeError` en runtime** y deben cerrarse para completar la certificación.

### HALLAZGO 1: `CambiarEstadoPostulacionUseCase` accede a atributos fantasma

**Archivo:** [cambiar_estado_postulacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/postulacion/cambiar_estado_postulacion.py)  
**Regla violada:** La entidad `Postulacion` ya NO tiene los campos `titulo_convocatoria`, `nombre_usuario`, `correo_usuario` (fueron correctamente removidos en la refactorización P-E1). Pero este Use Case **sigue accediendo a ellos**.

| Línea | Código problemático | Campo fantasma |
|---|---|---|
| **L64** | `postulacion_guardada.titulo_convocatoria or "una convocatoria"` | `titulo_convocatoria` |
| **L79** | `postulacion_guardada.correo_usuario` | `correo_usuario` |
| **L85** | `postulacion_guardada.nombre_usuario or 'Voluntario'` | `nombre_usuario` |
| **L94** | `postulacion_guardada.nombre_usuario or 'Voluntario'` | `nombre_usuario` |

**Impacto:** Cualquier cambio de estado de una postulación fallará con `AttributeError: 'Postulacion' object has no attribute 'titulo_convocatoria'`.

**Solución requerida:** Este Use Case debe orquestar las consultas y construir los datos desde las entidades individuales, tal como ya se hizo correctamente en `ListarMisPostulacionesUseCase` y `ListarTodasPostulacionesUseCase`. Ejemplo:
```python
# Ya tienes la convocatoria en L28:
convocatoria = self.convocatoria_repository.obtener_por_id(...)
titulo_conv = convocatoria.titulo if convocatoria else "una convocatoria"

# Necesitas obtener el usuario para el correo:
usuario = self.user_repository.obtener_por_id(postulacion.id_usuario)
correo_usuario = usuario.correo_electronico if usuario else None
nombre_usuario = usuario.nombre_completo if usuario else "Voluntario"
```

---

### HALLAZGO 2: Use Cases llaman `user_repository.get_by_id()` — método inexistente en el Puerto

**Archivos:**
- [listar_postulaciones_admin.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/postulacion/listar_postulaciones_admin.py) **L20**
- [listar_mis_postulaciones.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/postulacion/listar_mis_postulaciones.py) **L21**

**Regla violada:** El Puerto de Salida [user_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/user_repository.py) define el método como `obtener_por_id()` (L28-33). Pero los Use Cases invocan `self.user_repo.get_by_id()` — un nombre que **no existe** en la interfaz abstracta ni en la implementación `PostgresUserRepository`.

| Archivo | Línea | Invocación errónea | Nombre correcto |
|---|---|---|---|
| `listar_postulaciones_admin.py` | L20 | `self.user_repository.get_by_id(...)` | `self.user_repository.obtener_por_id(...)` |
| `listar_mis_postulaciones.py` | L21 | `self.user_repo.get_by_id(...)` | `self.user_repo.obtener_por_id(...)` |

**Impacto:** Cualquier listado de postulaciones (voluntario o admin) fallará con `AttributeError: 'PostgresUserRepository' object has no attribute 'get_by_id'`.

---

## 📊 RESUMEN COMPARATIVO: ANTES vs DESPUÉS

| Hallazgo Auditoría Anterior | ID | Estado Post-Refactorización |
|---|---|---|
| `RegisterUser.__init__` no inyectaba `password_hasher` | U-UC1 | ✅ **CORREGIDO** (L12-14) |
| `Campana.fecha_inicio` era `datetime` en vez de `date` | C-E2 | ✅ **CORREGIDO** (L17: `Optional[date]`) |
| `video_urls` no estaba en `CrearCampanaUseCase.execute()` | C-UC2 | ✅ **CORREGIDO** (L30) |
| 7 campos foráneos en `Postulacion` entity | P-E1 | ✅ **CORREGIDO** (entidad limpia, 29 líneas) |
| `NotificacionRepository` retornaba `List[Dict]` | N-R1 | ✅ **CORREGIDO** (`_to_entity()` → `List[Notificacion]`) |
| `CampanaSerializer` usaba `ModelSerializer` | LL-1 | ✅ **CORREGIDO** (`serializers.Serializer`) |
| `ConvocatoriaSerializer` usaba `ModelSerializer` | LL-2 | ✅ **CORREGIDO** (`serializers.Serializer`) |
| Nomenclatura Spanglish en `RegisterUser` params | U-UC2 | ✅ **CORREGIDO** (100% español) |
| `CrearCampanaUseCase` sin type hint del Puerto | C-UC3 | ✅ **CORREGIDO** (L13: `repository: CampanaRepository`) |
| `Postulacion` repo hacía JOINs en `_to_entity` | P-R1 | ✅ **CORREGIDO** (mapeo limpio sin JOINs) |
| Listar Use Cases mutaban la entidad con campos calculados | — | ✅ **CORREGIDO** (patrón DTO en Use Case) |

---

## 🎯 PARA OBTENER EL CERTIFICADO VERDE ABSOLUTO 🟢

Solo necesitan cerrarse **2 correcciones quirúrgicas** que no tocan la arquitectura sino que son residuos de la limpieza de `Postulacion`:

1. **`cambiar_estado_postulacion.py`** — Orquestar `usuario` y `convocatoria` para obtener nombre/correo/título en vez de leerlos de la entidad.
2. **`listar_postulaciones_admin.py` L20** y **`listar_mis_postulaciones.py` L21** — Cambiar `get_by_id()` → `obtener_por_id()`.

> [!IMPORTANT]
> La arquitectura fundamental es **sólida y limpia**. Los 2 hallazgos son errores de integración post-limpieza (atributos que se desconectaron al purificar la entidad), no fallos de diseño. La estructura de capas, la inyección de dependencias y la pureza de dominio son **ejemplares**.
