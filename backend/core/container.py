from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.application.use_cases.register_user import RegisterUser
from core.application.use_cases.login_user import LoginUser

class Container:
    """
    Contenedor de Inyección de Dependencias (Manual).
    Aquí se ensamblan las piezas de la arquitectura.
    Actúa como una 'Fábrica' de casos de uso.
    """
    
    # 1. Instanciamos el Repositorio Concreto (Infraestructura)
    # Como PostgresUserRepository no tiene estado, podemos usar una misma instancia.
    _user_repository = PostgresUserRepository()

    @staticmethod
    def get_user_repository():
        return Container._user_repository

    @staticmethod
    def register_user_use_case() -> RegisterUser:
        """
        Fabrica el Caso de Uso 'Registrar Usuario' inyectándole el repositorio real.
        """
        return RegisterUser(user_repository=Container._user_repository)
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        """
        Fabrica el Caso de Uso 'Login' inyectándole el repositorio.
        """
        return LoginUser(user_repository=Container._user_repository)