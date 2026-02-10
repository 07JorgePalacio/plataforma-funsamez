from django.apps import AppConfig

class PersistenceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core.infrastructure.persistence.django'  # ⬅️ NO CAMBIA
    label = 'persistence'  # ⬅️ SOLO AGREGAMOS ESTO
    verbose_name = 'FUNSAMEZ Persistence Layer'