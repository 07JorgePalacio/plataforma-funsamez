from django.urls import path
from core.adapters.api.rest.views.user_views import RegisterUserView, LoginUserView
from core.adapters.api.rest.views.convocatoria_views import CrearConvocatoriaView, ListarConvocatoriasView, DetalleConvocatoriaView

urlpatterns = [
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
    
    path('convocatorias/crear/', CrearConvocatoriaView.as_view(), name='crear_convocatoria'),
    path('convocatorias/', ListarConvocatoriasView.as_view(), name='listar_convocatorias'),
    path('convocatorias/<int:pk>/', DetalleConvocatoriaView.as_view(), name='detalle_convocatoria'),
]