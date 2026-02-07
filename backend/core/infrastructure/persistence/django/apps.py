from django.apps import AppConfig

class PersistenceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.infrastructure.persistence.django'  # <--- Ruta completa a la carpeta donde está models.py
    label = 'persistence'  # <--- Un apodo corto para que Django lo use internamente