# Auditoría de Dominio de Usuario: Backend & Frontend

A continuación se presenta el reporte detallado de la auditoría realizada sobre los artefactos del dominio de Autenticación y Usuario, siguiendo estrictamente los lineamientos de Clean Architecture, DDD y buenas prácticas de React.

---

## 1. EXCEPCIONES (BACKEND)

Se identificaron los siguientes puntos donde se lanzan excepciones genéricas en lugar de utilizar las excepciones de dominio personalizadas definidas en `user_exceptions.py`. Esto dificulta el manejo de errores específicos en las capas superiores (API) y viola el principio de encapsulamiento del dominio.

-   **Archivo:** `backend/core/application/use_cases/user/login_user.py`
    -   **Línea 12:**
        ```python
        if not user or not self.password_hasher.verify(password, user.contrasena_hash):
            raise ValueError("Credenciales inválidas")
        ```
    -   **Sugerencia:** Reemplazar `ValueError` con `CredencialesInvalidasError()`. Esta excepción ya está definida y es específica para este caso.

-   **Archivo:** `backend/core/application/use_cases/user/login_user.py`
    -   **Línea 15:**
        ```python
        if user.estado != 'activo':
            raise ValueError("El usuario está inactivo")
        ```
    -   **Sugerencia:** Crear y lanzar una nueva excepción de dominio como `UsuarioInactivoError` en `user_exceptions.py`. Una excepción genérica `ValueError` no comunica claramente la regla de negocio que se está violando.

-   **Archivo:** `backend/core/application/use_cases/user/register_user.py`
    -   **Línea 31:**
        ```python
        if not UserService.validar_formato_email(email):
            raise ValueError("El formato del correo electrónico no es válido.")
        ```
    -   **Sugerencia:** Crear y lanzar una nueva excepción de dominio como `FormatoEmailInvalidoError(email)` en `user_exceptions.py` para un manejo de errores más granular.

-   **Archivo:** `backend/core/application/use_cases/user/actualizar_perfil_usuario.py`
    -   **Línea 22:**
        ```python
        if not usuario_actualizado:
            raise ValueError(f"No se pudo actualizar: Usuario con ID {user_id} no encontrado.")
        ```
    -   **Sugerencia:** Reemplazar `ValueError` con `UsuarioNoEncontradoError(user_id)`. Esta excepción ya existe y es la adecuada para este escenario.

---

## 2. LÓGICA FILTRADA EN USE CASES (BACKEND)

Se encontró lógica que, si bien es simple, no pertenece a la orquestación del caso de uso. Debería ser extraída a un servicio de dominio (`user_service.py`) o a un servicio de infraestructura (como un `PasswordHasher`) para mejorar la cohesión y la reutilización.

-   **Archivo:** `backend/core/application/use_cases/user/register_user.py`
    -   **Línea 40:**
        ```python
        # 4. Hashear contraseña
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        ```
    -   **Sugerencia:** La responsabilidad de *cómo* se hashea una contraseña no pertenece al caso de uso `RegisterUser`. Este ya inyecta un `PasswordHasher` en `login_user.py` pero no lo utiliza aquí. Se debe mover esta lógica al `PasswordHasher` implementado (`django_hasher.py`) y usarlo a través de su interfaz. Si no se quisiera usar el hasher de Django, la lógica podría estar en un método estático `UserService.hashear_password(password)`.

---

## 3. INCONSISTENCIAS DE ORDEN (BACKEND)

Se ha detectado una divergencia en el orden de los campos entre la definición de la base de datos (`models.py`), la entidad de dominio (`user.py`) y los serializadores de la API (`user_serializers.py`). Esto puede llevar a errores sutiles durante el mapeo y reduce la predictibilidad del código.

-   **Comparativa de Orden:**

    -   **`models.py` (Fuente de la verdad):**
        1.  `nombre_completo`
        2.  `correo_electronico`
        3.  `tipo_documento`
        4.  `numero_identificacion`
        5.  `fecha_nacimiento`
        6.  `profesion`
        7.  `numero_telefono`
        8.  `direccion`
        ...y así sucesivamente.

    -   **`domain/entities/user.py`:**
        -   El orden es significativamente diferente. Por ejemplo, `fecha_nacimiento` y `tipo_documento` aparecen mucho después de `rol` y `estado`, rompiendo la agrupación lógica del modelo. `numero_telefono` y `direccion` aparecen antes que `rol`.

    -   **`serializers/user_serializers.py` (`RegisterUserSerializer`):**
        -   El orden también difiere. `telefono` y `direccion` se definen después de `fecha_nacimiento` y `numero_identificacion`, contrario al `models.py`.

    -   **`serializers/user_serializers.py` (`ActualizarPerfilSerializer`):**
        -   El orden es completamente diferente al de las otras definiciones, con `numero_telefono` apareciendo justo después de `nombre_completo`.

-   **Sugerencia:** Refactorizar la entidad `User` y los serializadores para que el orden y la agrupación de los campos (p. ej., "Información Personal", "Contacto", "Perfil") sea **idéntico** al definido en `UsuarioModel` de `models.py`. Esto mejora drásticamente la mantenibilidad y la legibilidad.

---

## 4. DEUDA TÉCNICA Y LENGUAJE UBICUO (FRONTEND)

El frontend presenta varios puntos críticos donde la lógica de negocio se ha filtrado en la capa de vista y donde el Lenguaje Ubicuo se rompe constantemente, especialmente en la gestión del estado del usuario.

### Deuda Técnica: Lógica de Negocio en Componentes

-   **Archivo:** `frontend/src/context/AppContext.jsx`
    -   **Bloques:** Funciones `fetchConvocations` y `fetchCampaigns`.
        ```javascript
        // Ejemplo en fetchConvocations
        const formattedData = data.map(item => ({
            ...item,
            // (...)
            // Cálculos de Negocio (Enriquecidos desde el Backend)
            dias_para_inicio: Number(item.dias_para_inicio) || 0,
            urgencia: item.urgencia || 'normal',
            porcentaje_cupos: Number(item.porcentaje_cupos) || 0,
            // (...)
        }));
        ```
    -   **Problema:** Campos como `dias_para_inicio`, `urgencia`, `porcentaje_cupos` (en convocatorias) y `porcentaje_progreso`, `dias_restantes` (en campañas) son datos derivados de reglas de negocio.
    -   **Sugerencia:** El Backend debe calcular y entregar estos campos listos para consumir. El frontend no debería ser responsable de calcular, convertir a `Number` ni de establecer valores por defecto para la lógica de negocio. Su única tarea debería ser mostrar los datos que recibe.

### Violación del Lenguaje Ubicuo (Spanglish y Sinónimos)

El problema más grave reside en la inconsistencia de nombres para los atributos del usuario, con `AppContext.jsx` como epicentro del caos.

-   **Archivo:** `frontend/src/context/AppContext.jsx`
    -   **Bloque:** `useState` inicial del `user` (líneas 30-74) y función `login` (líneas 78-109).
    -   **Problema:** Se intenta recuperar datos del `localStorage` usando múltiples nombres para el mismo concepto, mezclando inglés y español.
    -   **Evidencia:**
        -   `localStorage.getItem('user_name')` vs `userData.full_name`
        -   `localStorage.getItem('user_email')` vs `localStorage.getItem('user_correo_electronico')`
        -   `localStorage.getItem('user_telefono')` vs `localStorage.getItem('user_numero_telefono')`
        -   `localStorage.getItem('user_documento')` vs `localStorage.getItem('user_numero_identificacion')`
        -   `localStorage.getItem('user_profesion')` vs `localStorage.getItem('user_ocupacion')`

-   **Archivo:** `frontend/src/pages/volunteer/ProfilePage.jsx`
    -   **Bloque:** `useEffect` para inicializar `formData` (líneas 53-74).
    -   **Problema:** Este componente sufre las consecuencias del `AppContext`, teniendo que adivinar qué nombre de propiedad usar.
    -   **Evidencia:**
        ```javascript
        nombre_completo: user.nombre_completo || user.nombre || user.name || '',
        numero_telefono: user.numero_telefono || user.telefono || user.phone || '',
        numero_identificacion: user.numero_identificacion || user.documento || user.identificacion || '',
        profesion: user.profesion || user.ocupacion || '',
        ```

-   **Sugerencia General (Crítica):**
    1.  **Definir un Contrato Estricto:** El Backend (a través de sus Serializers) DEBE ser la única fuente de verdad y siempre devolver los mismos nombres de campo (p. ej., `nombre_completo`, `correo_electronico`).
    2.  **Centralizar la Consistencia:** La función `login` en `AppContext.jsx` debe guardar los datos en `localStorage` usando **un solo nombre canónico** (el mismo que envía el backend).
    3.  **Simplificar Componentes:** Los componentes como `ProfilePage.jsx` deben dejar de adivinar y confiar en que `user.nombre_completo` (o el nombre canónico elegido) siempre estará presente y correctamente nombrado, eliminando las cadenas de `||`.
    4.  **Refactorizar Teléfono:** La concatenación del código de país (`+57`) y el número en `RegisterPage.jsx` debería ser responsabilidad del backend para asegurar un formato unificado en la base de datos.
