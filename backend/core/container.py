# --- REPOSITORIOS (INFRAESTRUCTURA) ---
from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.infrastructure.persistence.django.repositories.postgres_convocatoria_repository import PostgresConvocatoriaRepository
from core.infrastructure.persistence.django.repositories.postgres_campana_repository import PostgresCampanaRepository

# --- CASOS DE USO: USUARIOS ---
from core.application.use_cases.register_user import RegisterUser
from core.application.use_cases.login_user import LoginUser

# --- CASOS DE USO: CONVOCATORIAS ---
from core.application.use_cases.crear_convocatoria import CrearConvocatoriaUseCase
from core.application.use_cases.listar_convocatorias import ListarConvocatoriasUseCase
from core.application.use_cases.actualizar_convocatoria import ActualizarConvocatoriaUseCase
from core.application.use_cases.eliminar_convocatoria import EliminarConvocatoriaUseCase

# --- CASOS DE USO: CAMPAÑAS ---
from core.application.use_cases.crear_campana import CrearCampanaUseCase
from core.application.use_cases.listar_campanas import ListarCampanasUseCase
from core.application.use_cases.actualizar_campana import ActualizarCampanaUseCase
from core.application.use_cases.eliminar_campana import EliminarCampanaUseCase

class Container:
    """
    Contenedor de Inyección de Dependencias (DI).
    Centraliza la creación de instancias y la inyección de repositorios.
    """
    
    # ==========================================
    #  1. USUARIOS
    # ==========================================
    _user_repository = PostgresUserRepository()

    @staticmethod
    def get_user_repository():
        return Container._user_repository

    @staticmethod
    def register_user_use_case() -> RegisterUser:
        return RegisterUser(user_repository=Container._user_repository)
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        return LoginUser(user_repository=Container._user_repository)
    

    # ==========================================
    #  2. CONVOCATORIAS
    # ==========================================
    convocatoria_repository = PostgresConvocatoriaRepository()

    crear_convocatoria_use_case = CrearConvocatoriaUseCase(repository=convocatoria_repository)
    listar_convocatorias_use_case = ListarConvocatoriasUseCase(repository=convocatoria_repository)
    actualizar_convocatoria_use_case = ActualizarConvocatoriaUseCase(repository=convocatoria_repository)
    eliminar_convocatoria_use_case = EliminarConvocatoriaUseCase(repository=convocatoria_repository)


    # ==========================================
    #  3. CAMPAÑAS
    # ==========================================
    campana_repository = PostgresCampanaRepository()

    crear_campana_use_case = CrearCampanaUseCase(campana_repository)
    listar_campanas_use_case = ListarCampanasUseCase(campana_repository)
    actualizar_campana_use_case = ActualizarCampanaUseCase(campana_repository)
    eliminar_campana_use_case = EliminarCampanaUseCase(campana_repository)