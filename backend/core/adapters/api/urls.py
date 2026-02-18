from django.urls import path

# Vistas de Usuarios
from core.adapters.api.rest.views.user_views import (
    RegisterUserView, LoginUserView
)
# Vistas de Convocatorias
from core.adapters.api.rest.views.convocatoria_views import (
    CrearConvocatoriaView, ListarConvocatoriasView, DetalleConvocatoriaView
)
# Vistas de Campañas
from core.adapters.api.rest.views.campana_views import (
    CrearCampanaView, ListarCampanasView, DetalleCampanaView
)

urlpatterns = [
    # --- USUARIOS ---
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
    
    # --- CONVOCATORIAS ---
    path('convocatorias/crear/', CrearConvocatoriaView.as_view(), name='crear_convocatoria'),
    path('convocatorias/', ListarConvocatoriasView.as_view(), name='listar_convocatorias'),
    path('convocatorias/<int:pk>/', DetalleConvocatoriaView.as_view(), name='detalle_convocatoria'),
    
    # --- CAMPAÑAS ---
    path('campanas/crear/', CrearCampanaView.as_view(), name='crear_campana'),
    path('campanas/', ListarCampanasView.as_view(), name='listar_campanas'),
    path('campanas/<int:pk>/', DetalleCampanaView.as_view(), name='detalle_campana'),
]