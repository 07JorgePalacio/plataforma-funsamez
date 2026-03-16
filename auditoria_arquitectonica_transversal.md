# 🏛️ AUDITORÍA ARQUITECTÓNICA TRANSVERSAL — FUNSAMEZ

**Fecha:** 2026-03-15  
**Rol del Auditor:** Arquitecto de Software Staff/Principal  
**Metodología:** Clean Architecture · Arquitectura Hexagonal · DDD  
**Fuente de Verdad:** [models.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py)

---

## Resumen Ejecutivo

| Pilar | Hallazgos Críticos | Advertencias | OK |
|---|---|---|---|
| 1. El Orden Maestro (Data Consistency) | 🔴 6 | 🟡 8 | 🟢 Parcial |
| 2. Fugas de Capas (Layer Leaks) | 🔴 3 | 🟡 2 | 🟢 Parcial |
| 3. Testabilidad de Servicios (Pureza) | 🔴 0 | 🟡 1 | 🟢 Buena |

---

# PILAR 1: EL ORDEN MAESTRO (Data Consistency Transversal)

## 1.1 — DOMINIO: USUARIOS

### Fuente de Verdad — [UsuarioModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#27-88) (models.py L27-87)

Orden canónico de campos:
```
1. nombre_completo, correo_electronico, password
2. tipo_documento, numero_identificacion, fecha_nacimiento, profesion
3. numero_telefono, direccion, foto_perfil
4. rol, estado, autenticacion_2fa_habilitada
5. fecha_creacion, fecha_verificacion_correo, ultima_conexion
6. intereses, habilidades, disponibilidad
```

#### a) Entidad de Dominio — [user.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/user.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| U-E1 | **Orden de agrupación diferente.** El modelo agrupa: Identificación → Info Personal → Contacto → Config. La entidad agrupa: Identificación → Contacto → Perfil Voluntario → Seguridad. Los campos `numero_telefono` y `direccion` (L18-19) se ubican antes de `fecha_nacimiento`, `tipo_documento`, `numero_identificacion`, `profesion` (L22-25), mientras que en el modelo van al revés (Info Personal L39-46 → Contacto L48-51). | 🟡 |  L17-29 |
| U-E2 | **Campo `fecha_verificacion_correo` OMITIDO** en la entidad. El modelo lo define en L61 pero la entidad no lo contiene. | 🟡 | — |
| U-E3 | **Nomenclatura asimétrica:** Modelo usa `password` (heredado de `AbstractBaseUser`), la entidad usa `contrasena_hash`. Esto es aceptable como decisión de diseño (desacoplar del framework), pero debe documentarse como regla explícita. | 🟡 | L13 |

#### b) Serializer — [user_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| U-S1 | **[RegisterUserSerializer](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py#3-25): Orden de campos diverge del modelo.** El serializer pone `numero_telefono, direccion` (L10-11) **antes** de `fecha_nacimiento, tipo_documento, numero_identificacion` (L14-16). En el modelo, Info Personal (tipo_documento, numero_identificacion, fecha_nacimiento, profesion) **precede** a Contacto (numero_telefono, direccion). | 🟡 | L10-24 |
| U-S2 | **Campo `foto_perfil` AUSENTE** en [RegisterUserSerializer](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py#3-25) y [ActualizarPerfilSerializer](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py#33-53). No se serializa en ningún serializer de entrada, pero sí se retorna en la respuesta del login y actualización (L120, L193 de [user_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py)). La subida se maneja implícitamente via `MultiPartParser`. | 🟡 | — |

#### c) Caso de Uso [RegisterUser](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/register_user.py#11-72) — [register_user.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/register_user.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| U-UC1 | 🔴 **BUG CRÍTICO: `password_hasher` no se inyecta en [__init__](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/listar_convocatorias.py#7-10).** El constructor (L12) solo acepta [user_repository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#60-65), pero en L49 se invoca `self.password_hasher.hash(password)`. El [Container](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#40-223) (L68-71) sí le pasa `password_hasher=Container._password_hasher`, pero el [__init__](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/listar_convocatorias.py#7-10) no lo almacena. **Esto lanzará un `AttributeError` en tiempo de ejecución.** | 🔴 | L12, L49 |
| U-UC2 | **Nomenclatura Spanglish en parámetros.** El Use Case usa [email](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/user_repository.py#20-27) y `password` (inglés, L17-18), pero [telefono](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/user_service.py#71-84), `direccion`, `fecha_nacimiento` (español, L21-23). El modelo y la entidad usan español consistentemente (`correo_electronico`, `contrasena_hash`). La Vista (L31-33) hace el mapeo `email=data['correo_electronico']`, `password=data['contrasena']`. | 🟡 | L15-28 |

#### d) Repositorio — [postgres_user_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_user_repository.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| U-R1 | **Orden del mapeo [_to_domain](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py#8-36) no sigue el Orden Maestro del modelo.** Mezcla: `id, nombre_completo, correo_electronico, contrasena_hash, numero_telefono, direccion, rol, estado...` (L59-80). Según el modelo, `rol` y [estado](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/postulacion_service.py#132-179) (Config L54-56) van **después** de `foto_perfil` (Contacto L51), pero en el mapeo `foto_perfil` va al final (L80). | 🟡 | L59-80 |
| U-R2 | **Campo `fecha_verificacion_correo` NO SE MAPEA** en [_to_domain](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py#8-36) (el modelo lo tiene en L61). Hay pérdida de datos silenciosa. | 🟡 | L57-81 |

#### e) Frontend — [AppContext.jsx](file:///c:/Users/ismae/Desktop/plataforma-funsamez/frontend/src/context/AppContext.jsx)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| U-F1 | **Estado [user](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#12-21) en [login()](file:///c:/Users/ismae/Desktop/plataforma-funsamez/frontend/src/context/AppContext.jsx#86-123) ordena campos diferente** al modelo y a la entidad. El objeto `setUser({...})` (L106-121) usa un orden arbitrario: `id, nombre_completo, rol, correo_electronico, numero_telefono, numero_identificacion, profesion, direccion...`. El modelo: nombre_completo → correo → tipo_doc → num_id → fecha_nac → profesion → telefono → direccion. | 🟡 | L106-121 |
| U-F2 | **Campo `autenticacion_2fa_habilitada` NO existe en el estado del frontend.** El modelo lo tiene (L57), la entidad lo tiene (L33), pero ni la respuesta del login ni el AppContext lo gestionan. | 🟡 | — |

---

## 1.2 — DOMINIO: CAMPAÑAS

### Fuente de Verdad — [CampanaModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#144-194) (models.py L144-193)

Orden canónico:
```
1. usuario_creador (FK)
2. titulo, descripcion, imagen_url
3. fecha_inicio, fecha_fin, estado, fecha_creacion, fecha_actualizacion
4. monto_objetivo, recaudo_actual, permite_donacion_monetaria, permite_donacion_especie
5. objetivos, galeria_imagenes, video_urls, necesidades, categoria, tipo_impacto
```

#### a) Entidad — [campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/campana.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| C-E1 | **[id](file:///c:/Users/ismae/Desktop/plataforma-funsamez/frontend/src/context/AppContext.jsx#21-475) suelto después de `id_usuario_creador` (L9).** En el modelo, [id](file:///c:/Users/ismae/Desktop/plataforma-funsamez/frontend/src/context/AppContext.jsx#21-475) es auto-generado e implícito. En la entidad, está como segundo campo del bloque 1. Consistente pero cosmético. | ✅ OK | L8-9 |
| C-E2 | **Tipo de `fecha_inicio` es `Optional[datetime]`** (L17), pero en el modelo es `DateField` (L162, `models.DateField`). **Inconsistencia de tipo: La entidad espera `datetime` pero el modelo almacena [date](file:///c:/Users/ismae/Desktop/plataforma-funsamez/frontend/src/context/AppContext.jsx#129-165).** | 🔴 | L17 vs models L162 |

#### b) Serializer — [campana_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| C-S1 | **`video_urls` OMITIDO en `fields` list… ¡NO!** Re-verificado: sí está en L58. ✅ | ✅ OK | L58 |

#### c) Caso de Uso [CrearCampanaUseCase](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/campana/crear_campana.py#11-72) — [crear_campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/campana/crear_campana.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| C-UC1 | **Nomenclatura acortada y Spanglish en parámetros.** `permite_monetaria` y `permite_especie` (L23) en vez de `permite_donacion_monetaria` y `permite_donacion_especie` como en el modelo. `galeria` (L28) en vez de `galeria_imagenes`. La Vista (L32-39 de [campana_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py)) hace el mapeo explícito. | 🟡 | L23, L28 |
| C-UC2 | **`video_urls` NO es parámetro del [execute()](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/input/postulacion_use_cases.py#18-20)** del Use Case [CrearCampana](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py#8-51). El modelo tiene este campo (L183), la entidad lo tiene (L32), el serializer lo tiene, pero **no se puede crear una campaña con videos desde el Use Case**. | 🔴 | L15-31 |
| C-UC3 | **[repository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#60-65) se inyecta sin type hint de Puerto.** [__init__(self, repository)](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/listar_convocatorias.py#7-10) (L12) no tipifica con [CampanaRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/campana_repository.py#5-28). Comparar con el [CrearConvocatoriaUseCase](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/crear_convocatoria.py#11-61) que sí lo hace: `repository: ConvocatoriaRepository` (L13). | 🟡 | L12 |

#### d) Repositorio — [postgres_campana_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| C-R1 | **Orden de [_to_domain](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_campana_repository.py#8-36) es fiel al modelo.** ✅ | ✅ OK | L8-35 |

---

## 1.3 — DOMINIO: CONVOCATORIAS

### Fuente de Verdad — [ConvocatoriaModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#94-138) (models.py L94-138)

Orden canónico:
```
1. usuario_creador (FK)
2. titulo, descripcion
3. ubicacion, link_google_maps, link_whatsapp, modalidad
4. fecha_inicio, fecha_fin, cupos_disponibles
5. estado, fecha_creacion
6. habilidades_requeridas, categorias, horario, beneficios
```

#### a) Entidad — [convocatoria.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/convocatoria.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| CV-E1 | **Campo `cupos_ocupados` (L25) NO EXISTE en el modelo.** Es un campo calculado (count de postulaciones aprobadas). La entidad lo declara como campo persistente. Esto es una **mezcla de datos derivados con datos persistidos** en la entidad. No viola Clean Architecture per se, pero es un anti-pattern de DDD al contaminar la entidad con datos de otra entidad. | 🟡 | L25 |

#### b) Caso de Uso [CrearConvocatoriaUseCase](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/crear_convocatoria.py#11-61) — [crear_convocatoria.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/convocatoria/crear_convocatoria.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| CV-UC1 | **Nombre acortado de parámetros.** [cupos](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/convocatoria_service.py#126-132) (L20) en vez de `cupos_disponibles`, [habilidades](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/user_service.py#104-112) (L20) en vez de `habilidades_requeridas`. La Vista hace el mapeo (L26, L34 de [convocatoria_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py)). | 🟡 | L20 |

#### c) Vista — [convocatoria_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| CV-V1 | **Orden de parámetros en `CrearConvocatoriaView.post()` NO sigue el orden del modelo.** Info Básica (titulo, descripcion) → Tiempos → Identificación → Logística → JSON. En el modelo: FK → Básica → Logística → Tiempos → Estado → JSON. | 🟡 | L19-37 |

---

## 1.4 — DOMINIO: POSTULACIONES

### Fuente de Verdad — [PostulacionModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#199-249) (models.py L199-248)

Orden canónico:
```
1. usuario (FK), convocatoria (FK)
2. observaciones, motivo_rechazo, match_habilidades, match_disponibilidad
3. estado
4. fecha_postulacion, fecha_actualizacion
5. historial_estados
```

#### a) Entidad — [postulacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/postulacion.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| P-E1 | 🔴 **7 campos calculados/de lectura que NO existen en el modelo** se declaran en la entidad: `titulo_convocatoria` (L12), `nombre_usuario` (L13), `correo_usuario` (L14), `telefono_usuario` (L15), `documento_usuario` (L16), `habilidades_usuario` (L17), `disponibilidad_usuario` (L18). Son datos de **otra entidad** ([UsuarioModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#27-88)) inyectados en la entidad [Postulacion](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/postulacion.py#5-38). | 🔴 | L12-18 |
| P-E2 | **Campos adicionales calculados:** `estado_convocatoria` (L28) y `es_activa` (L29) no existen en el modelo, son enriquecidos por el Use Case. | 🟡 | L28-29 |

#### b) Repositorio — [postgres_postulacion_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_postulacion_repository.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| P-R1 | **[_to_entity](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_postulacion_repository.py#13-44) realiza JOINs y concatenaciones ad-hoc** para poblar los campos foráneos (`model.usuario.nombre_completo`, `model.usuario.correo_electronico`, etc. en L20-26). Esto mezcla la responsabilidad de mapeo con lógica de enriquecimiento que debería estar en el Use Case. | 🟡 | L13-43 |

---

## 1.5 — DOMINIO: NOTIFICACIONES

### Fuente de Verdad — [NotificacionModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#254-287) (models.py L254-286)

Orden canónico:
```
1. usuario (FK)
2. titulo, mensaje
3. tipo
4. referencia_id, leida
5. fecha_creacion
```

#### a) Entidad — [notificacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/notificacion.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| N-E1 | **Nomenclatura asimétrica FK:** Modelo usa FK [usuario](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_notificacion_repository.py#18-31) (L259), entidad usa `id_usuario` (L10). Consistente internamente con las demás entidades, pero diferente al nombre del modelo. | ✅ OK | L10 |
| N-E2 | **Orden correcto y campos completos.** ✅ | ✅ OK | — |

#### b) Repositorio — [postgres_notificacion_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_notificacion_repository.py)

| # | Hallazgo | Severidad | Líneas |
|---|---|---|---|
| N-R1 | **[obtener_por_usuario](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_notificacion_repository.py#18-31) retorna `List[Dict]` en vez de `List[Notificacion]`.** No mapea a la entidad de dominio. Devuelve diccionarios crudos directamente desde el ORM (L18-30). El puerto ([NotificacionRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/notificacion_repository.py#4-38)) lo declara como `List[Dict]` (L15), avalando esta decisión, pero **viola el principio de que la entidad de dominio es el contrato de datos**. La entidad [Notificacion](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/notificacion.py#5-19) existe pero no se usa nunca como objeto de retorno. | 🔴 | L18-30 |

---

# PILAR 2: FUGAS DE CAPAS (Layer Leaks)

## 2.1 — Controladores/Vistas → ¿Llaman directamente al Repositorio o BD?

| Vista | ¿Usa Container + Use Case? | ¿Acceso directo a repo/BD? | Veredicto |
|---|---|---|---|
| [user_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py) | ✅ Sí (L30, L90, L172) | ❌ No | 🟢 LIMPIO |
| [campana_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py) | ✅ Sí (L21, L57, L77, L91) | ❌ No | 🟢 LIMPIO |
| [convocatoria_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py) | ✅ Sí (L19, L62, L82, L100, L112) | ❌ No | 🟢 LIMPIO |
| [postulacion_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/postulacion_views.py) | ✅ Sí (L35, L72, L107, L154, L181) | ❌ No | 🟢 LIMPIO |
| [notificacion_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/notificacion_views.py) | ✅ Sí (L14, L30, L50, L73) | ❌ No | 🟢 LIMPIO |

> ✅ **Veredicto: TODAS las vistas están limpias.** Ninguna accede directamente a un repositorio ni a la BD. Todas pasan por el [Container](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#40-223).

## 2.2 — Serializers → ¿Importan modelos de Infraestructura?

| # | Hallazgo | Archivo | Severidad | Líneas |
|---|---|---|---|---|
| LL-1 | 🔴 **[CampanaSerializer](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py#4-63) importa [CampanaModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#144-194) directamente** con `from core.infrastructure.persistence.django.models import CampanaModel`. Es un `ModelSerializer`, lo que **acopla la capa de adaptadores (API/REST) directamente a la capa de infraestructura (Django ORM)**. Viola la Dependency Rule de Clean Architecture: los adaptadores deberían depender solo del dominio/aplicación, nunca de infraestructura. | [campana_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py) | 🔴 | L2 |
| LL-2 | 🔴 **[ConvocatoriaSerializer](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/convocatoria_serializers.py#4-38) importa [ConvocatoriaModel](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/models.py#94-138) directamente** con el mismo patrón `ModelSerializer`. Misma violación. | [convocatoria_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/convocatoria_serializers.py) | 🔴 | L2 |
| LL-3 | ✅ [user_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/user_serializers.py) y [postulacion_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/postulacion_serializers.py) usan `serializers.Serializer` (no `ModelSerializer`). **No tienen acople con infraestructura.** | — | 🟢 | — |

> [!CAUTION]
> Los `ModelSerializer` de [campana_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py) (L2) y [convocatoria_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/convocatoria_serializers.py) (L2) crean una dependencia directa: **Adaptadores → Infraestructura**, saltándose la capa de Dominio/Aplicación. Deberían ser `serializers.Serializer` simples o DTOs puros.

## 2.3 — Casos de Uso → ¿Importan frameworks externos directamente?

| Caso de Uso | ¿Importa framework externo? | ¿Usa Puerto/Interface? | Veredicto |
|---|---|---|---|
| [RegisterUser](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/register_user.py#11-72) | No | Sí ([PasswordHasher](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/password_hasher.py#3-13)) | 🟢 LIMPIO |
| [LoginUser](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/login_user.py#6-21) | No | Sí ([PasswordHasher](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/password_hasher.py#3-13), [UserRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/user_repository.py#5-41)) | 🟢 LIMPIO |
| [ActualizarPerfilUsuario](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/actualizar_perfil_usuario.py#7-30) | No | Sí ([UserRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/user_repository.py#5-41)) | 🟢 LIMPIO |
| [CrearCampana](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py#8-51) | No | Sí (via [repository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#60-65)) | 🟢 LIMPIO |
| [ListarCampanas](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/campana_views.py#52-62) | No | Sí (via [repository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/container.py#60-65)) | 🟢 LIMPIO |
| [CrearConvocatoria](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py#8-51) | No | Sí ([ConvocatoriaRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/convocatoria_repository.py#5-27)) | 🟢 LIMPIO |
| [ListarConvocatorias](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/convocatoria_views.py#52-67) | No | Sí (repos) | 🟢 LIMPIO |
| [PostularVoluntario](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/postulacion_views.py#8-63) | No | Sí (repos) | 🟢 LIMPIO |
| [CambiarEstadoPostulacion](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/postulacion_views.py#140-172) | No | Sí ([PostulacionRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/postulacion_repository.py#5-38), [NotificacionRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/notificacion_repository.py#4-38), [EmailService](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/email_service.py#3-11), [ConvocatoriaRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/convocatoria_repository.py#5-27)) | 🟢 LIMPIO |
| [ListarNotificaciones](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/notificacion_views.py#8-24) | No | Sí ([NotificacionRepository](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/output/notificacion_repository.py#4-38)) | 🟢 LIMPIO |

> ✅ **Veredicto: TODOS los Use Cases están limpios.** Ninguno importa Django, librerías criptográficas, ni frameworks externos directamente. Todos usan Puertos/Interfaces definidos en `ports/output/`.

## 2.4 — Vista [LoginUserView](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py#78-132) → Acople con JWT

| # | Hallazgo | Archivo | Severidad | Líneas |
|---|---|---|---|---|
| LL-4 | 🟡 **[LoginUserView](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py#78-132) importa y usa `RefreshToken` de `rest_framework_simplejwt`** directamente (L4, L96-98). La generación de tokens JWT está en la capa de adaptadores (Vista), no desacoplada a través de un puerto `TokenService`. Si se cambiara el mecanismo de autenticación (ej. de JWT a sesiones), habría que modificar la Vista. En arquitectura hexagonal estricta, esto debería abstraerse en un `ports/output/token_service.py`. | [user_views.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/views/user_views.py) | 🟡 | L4, L96-98 |

---

# PILAR 3: TESTABILIDAD DE SERVICIOS (Pureza de Dominio)

## Auditoría de `backend/core/domain/services/`

### [user_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/user_service.py)
- **Imports:** `datetime`, `typing`, `re` (solo stdlib de Python)
- **¿Importa `infrastructure`?** ❌ No
- **¿Importa `django.db`?** ❌ No
- **¿Usa ORM?** ❌ No
- **¿Hace peticiones externas?** ❌ No
- **Veredicto:** 🟢 **100% LÓGICA PURA. Testeable con `unittest` sin mocks.**

### [campana_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/campana_service.py)
- **Imports:** `datetime`, `typing`, `core.domain.entities.campana` (solo dominio)
- **¿Importa `infrastructure`?** ❌ No
- **¿Importa `django.db`?** ❌ No
- **¿Usa ORM?** ❌ No
- **¿Hace peticiones externas?** ❌ No
- **Veredicto:** 🟢 **100% LÓGICA PURA.**

### [convocatoria_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/convocatoria_service.py)
- **Imports:** `datetime`, `typing`, `core.domain.entities.convocatoria` (solo dominio)
- **¿Importa `infrastructure`?** ❌ No
- **¿Importa `django.db`?** ❌ No
- **¿Usa ORM?** ❌ No
- **¿Hace peticiones externas?** ❌ No
- **Veredicto:** 🟢 **100% LÓGICA PURA.**

### [postulacion_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/postulacion_service.py)
- **Imports:** `datetime`, `typing`, `core.domain.entities.postulacion`, `core.domain.exceptions.postulacion_exceptions` (solo dominio)
- **¿Importa `infrastructure`?** ❌ No
- **¿Importa `django.db`?** ❌ No
- **¿Usa ORM?** ❌ No
- **¿Hace peticiones externas?** ❌ No
- **Veredicto:** 🟢 **100% LÓGICA PURA.**

### [notificacion_service.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/services/notificacion_service.py)
- **Imports:** `typing` (solo stdlib)
- **¿Importa `infrastructure`?** ❌ No
- **¿Importa `django.db`?** ❌ No
- **¿Usa ORM?** ❌ No
- **¿Hace peticiones externas?** ❌ No
- **Veredicto:** 🟢 **100% LÓGICA PURA.**

> ✅ **Veredicto General del Pilar 3: EXCELENTE.** Los 5 Domain Services son 100% lógica pura. No importan ningún framework, ORM ni librería de infraestructura. Son completamente testeables sin Django ni mocks.

---

# HALLAZGOS CRÍTICOS CONSOLIDADOS (Acción Inmediata)

| ID | Severidad | Dominio | Archivo | Línea(s) | Descripción |
|---|---|---|---|---|---|
| **U-UC1** | 🔴 CRÍTICO | Usuarios | [register_user.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/user/register_user.py) | L12, L49 | `__init__` recibe solo `user_repository` pero L49 usa `self.password_hasher`. No se asigna en el constructor. **RuntimeError garantizado.** |
| **C-E2** | 🔴 CRÍTICO | Campañas | [campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/campana.py) | L17 | `fecha_inicio` tipificada como `datetime` en la entidad, pero el modelo Django usa `DateField` (`date`). Inconsistencia de tipos. |
| **C-UC2** | 🔴 CRÍTICO | Campañas | [crear_campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/campana/crear_campana.py) | L15-31 | `video_urls` no es parámetro del `execute()`. Campo del modelo inalcanzable en la creación. |
| **P-E1** | 🔴 CRÍTICO | Postulaciones | [postulacion.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/domain/entities/postulacion.py) | L12-18 | 7 campos de **otra entidad** (Usuario) declarados en la entidad Postulación. Viola el principio de Bounded Context de DDD. |
| **N-R1** | 🔴 CRÍTICO | Notificaciones | [postgres_notificacion_repository.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/infrastructure/persistence/django/repositories/postgres_notificacion_repository.py) | L18-30 | El repositorio retorna `List[Dict]` crudos en vez de `List[Notificacion]`. La entidad de dominio `Notificacion` nunca se usa como DTO de retorno. |
| **LL-1** | 🔴 CRÍTICO | Campañas | [campana_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/campana_serializers.py) | L2 | `ModelSerializer` importa `CampanaModel` de infraestructura → acopla Adaptadores con Infraestructura. |
| **LL-2** | 🔴 CRÍTICO | Convocatorias | [convocatoria_serializers.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/adapters/api/rest/serializers/convocatoria_serializers.py) | L2 | Mismo patrón `ModelSerializer` → acople directo con infraestructura. |

---

# HALLAZGOS ADICIONALES TRANSVERSALES

| ID | Tipo | Archivo | Línea | Descripción |
|---|---|---|---|---|
| T-1 | Nomenclatura | Vistas y Use Cases | Varios | Mezcla de inglés/español en nombres de parámetros: `email` vs `correo_electronico`, `password` vs `contrasena`, `galeria` vs `galeria_imagenes`. Debería estandarizarse a 100% español para consistencia. |
| T-2 | Input Ports | [user_use_cases.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/ports/input/user_use_cases.py) | — | Solo `ActualizarPerfilUsuarioInputPort` tiene Input Port. `RegisterUser` y `LoginUser` **no implementan ningún Input Port**. |
| T-3 | Input Ports | Campañas, Convocatorias | — | **No existen Input Ports** para Campañas ni Convocatorias. Solo Postulaciones tiene input ports completos. Inconsistencia en el uso del patrón hexagonal. |
| T-4 | Type Hints | [crear_campana.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/campana/crear_campana.py), [listar_campanas.py](file:///c:/Users/ismae/Desktop/plataforma-funsamez/backend/core/application/use_cases/campana/listar_campanas.py) | L12, L6 | `repository` inyectado sin type hint al Puerto de Salida (`CampanaRepository`). Reduce la auto-documentación del contrato. |
