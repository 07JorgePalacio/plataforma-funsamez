# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)
📅 Generado: 2026-02-18 19:33:11.626796
ℹ️ Modo: Escaneo Inteligente de Carpetas

## 1. ESTRUCTURA DE CARPETAS
```text
├── .gitignore
├── CONTEXTO_FUNSAMEZ_2026-02-18_1933.md
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
│   │   │   │   │       ├── campana_views.py
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
│   │   │       ├── actualizar_campana.py
│   │   │       ├── actualizar_convocatoria.py
│   │   │       ├── crear_campana.py
│   │   │       ├── crear_convocatoria.py
│   │   │       ├── eliminar_campana.py
│   │   │       ├── eliminar_convocatoria.py
│   │   │       ├── listar_campanas.py
│   │   │       ├── listar_convocatorias.py
│   │   │       ├── login_user.py
│   │   │       └── register_user.py
│   │   ├── container.py
│   │   ├── domain/
│   │   │   ├── __init__.py
│   │   │   ├── entities/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── campana.py
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
│   │                   ├── postgres_campana_repository.py
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
│   │       └── convocatoriaService.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── generar_contexto.py
```