# CONTEXTO TÉCNICO: FUNSAMEZ (SPRINT 2)
📅 Generado: 2026-03-15 17:59:11.118905
ℹ️ Modo: Escaneo Inteligente de Carpetas

## 1. ESTRUCTURA DE CARPETAS
```text
├── .gitignore
├── .vscode/
│   └── settings.json
├── CONTEXTO_FUNSAMEZ_2026-03-15_1759.md
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
│   │   │   │   │       ├── notificacion_views.py
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
│   │   │   │       ├── email_service.py
│   │   │   │       ├── notificacion_repository.py
│   │   │   │       ├── password_hasher.py
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
│   │   │       ├── notificacion/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── eliminar_notificacion.py
│   │   │       │   ├── eliminar_todas_notificaciones.py
│   │   │       │   ├── listar_notificaciones.py
│   │   │       │   └── marcar_notificacion_leida.py
│   │   │       ├── postulacion/
│   │   │       │   ├── __init__.py
│   │   │       │   ├── cambiar_estado_postulacion.py
│   │   │       │   ├── eliminar_postulacion.py
│   │   │       │   ├── listar_mis_postulaciones.py
│   │   │       │   ├── listar_postulaciones_admin.py
│   │   │       │   └── postular_voluntario.py
│   │   │       └── user/
│   │   │           ├── __init__.py
│   │   │           ├── actualizar_perfil_usuario.py
│   │   │           ├── login_user.py
│   │   │           └── register_user.py
│   │   ├── container.py
│   │   ├── domain/
│   │   │   ├── __init__.py
│   │   │   ├── entities/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── campana.py
│   │   │   │   ├── convocatoria.py
│   │   │   │   ├── notificacion.py
│   │   │   │   ├── postulacion.py
│   │   │   │   └── user.py
│   │   │   ├── exceptions/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── campana_exceptions.py
│   │   │   │   ├── convocatoria_exceptions.py
│   │   │   │   ├── notificacion_exceptions.py
│   │   │   │   ├── postulacion_exceptions.py
│   │   │   │   └── user_exceptions.py
│   │   │   ├── services/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── campana_service.py
│   │   │   │   ├── convocatoria_service.py
│   │   │   │   ├── notificacion_service.py
│   │   │   │   ├── postulacion_service.py
│   │   │   │   └── user_service.py
│   │   │   └── value_objects/
│   │   │       └── __init__.py
│   │   └── infrastructure/
│   │       ├── external_services/
│   │       │   ├── __init__.py
│   │       │   └── django_email_service.py
│   │       ├── persistence/
│   │       │   ├── __init__.py
│   │       │   └── django/
│   │       │       ├── __init__.py
│   │       │       ├── apps.py
│   │       │       ├── models.py
│   │       │       └── repositories/
│   │       │           ├── __init__.py
│   │       │           ├── postgres_campana_repository.py
│   │       │           ├── postgres_convocatoria_repository.py
│   │       │           ├── postgres_notificacion_repository.py
│   │       │           ├── postgres_postulacion_repository.py
│   │       │           └── postgres_user_repository.py
│   │       └── security/
│   │           └── django_hasher.py
│   ├── manage.py
│   └── media/
│       └── perfiles/
│           ├── foto_perfil.jpg
│           └── foto_perfil_fGsHhIG.jpg
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
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── DonationModal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Snackbar.jsx
│   │   │   └── TimePickerMD3.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminCampaignsPage.jsx
│   │   │   │   ├── AdminConvocationsPage.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   └── VolunteersPage.jsx
│   │   │   ├── public/
│   │   │   │   ├── CampaignDetailPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── PublicCampaignsPage.jsx
│   │   │   │   ├── PublicConvocationsPage.jsx
│   │   │   │   ├── PublicLayout.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   └── volunteer/
│   │   │       ├── ConvocationsPage.jsx
│   │   │       ├── MisPostulacionesPage.jsx
│   │   │       ├── ProfilePage.jsx
│   │   │       ├── VolunteerDashboard.jsx
│   │   │       └── VolunteerLayout.jsx
│   │   ├── services/
│   │   │   ├── campaignService.js
│   │   │   ├── convocatoriaService.js
│   │   │   ├── notificacionService.js
│   │   │   ├── postulacionService.js
│   │   │   └── userService.js
│   │   └── utils/
│   │       ├── constants.js
│   │       └── cropImage.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── generar_contexto.py
├── package-lock.json
├── package.json
└── requirements.txt
```