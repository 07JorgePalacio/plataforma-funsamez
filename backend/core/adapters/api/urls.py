from django.urls import path
from core.adapters.api.rest.views.user_views import RegisterUserView, LoginUserView

urlpatterns = [
    path('users/register/', RegisterUserView.as_view(), name='register_user'),
    path('users/login/', LoginUserView.as_view(), name='login_user'),
]