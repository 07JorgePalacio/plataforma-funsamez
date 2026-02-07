from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Conectamos nuestras rutas de adaptadores aquí:
    path('api/', include('core.adapters.api.urls')),
]