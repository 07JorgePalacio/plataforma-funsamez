import os
from django.core.wsgi import get_wsgi_application

# Le decimos a Django dónde está su configuración
# Asumimos que 'core' está en el path gracias a tu manage.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.config.settings')

# Esta es la variable que Django está buscando y no encontraba:
application = get_wsgi_application()