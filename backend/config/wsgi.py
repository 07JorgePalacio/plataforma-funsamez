import os
from django.core.wsgi import get_wsgi_application

# Le decimos a Django dónde está su configuración
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.config.settings')

# Esta es la variable que DJAngo busca
application = get_wsgi_application()