# --- REPOSITORIOS (INFRAESTRUCTURA) ---
from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.infrastructure.persistence.django.repositories.postgres_convocatoria_repository import PostgresConvocatoriaRepository
from core.infrastructure.persistence.django.repositories.postgres_campana_repository import PostgresCampanaRepository
from core.infrastructure.persistence.django.repositories.postgres_postulacion_repository import PostgresPostulacionRepository
from core.infrastructure.security.django_hasher import DjangoPasswordHasher

# --- CASOS DE USO: USUARIOS ---
from core.application.use_cases.user.register_user import RegisterUser
from core.application.use_cases.user.login_user import LoginUser

# --- CASOS DE USO: CONVOCATORIAS ---
from core.application.use_cases.convocatoria.crear_convocatoria import CrearConvocatoriaUseCase
from core.application.use_cases.convocatoria.listar_convocatorias import ListarConvocatoriasUseCase
from core.application.use_cases.convocatoria.actualizar_convocatoria import ActualizarConvocatoriaUseCase
from core.application.use_cases.convocatoria.eliminar_convocatoria import EliminarConvocatoriaUseCase

# --- CASOS DE USO: CAMPAÑAS ---
from core.application.use_cases.campana.crear_campana import CrearCampanaUseCase
from core.application.use_cases.campana.listar_campanas import ListarCampanasUseCase
from core.application.use_cases.campana.actualizar_campana import ActualizarCampanaUseCase
from core.application.use_cases.campana.eliminar_campana import EliminarCampanaUseCase

# --- CASOS DE USO: POSTULACIONES ---
from core.application.use_cases.postulacion.postular_voluntario import PostularVoluntarioUseCase
from core.application.use_cases.postulacion.listar_mis_postulaciones import ListarMisPostulacionesUseCase

class Container:
    """
    Contenedor de Inyección de Dependencias (DI).
    PATRÓN ESTANDARIZADO: Factory Methods con @staticmethod y Singleton para repositorios.
    """
    
    # ==========================================
    #  REPOSITORIOS (Instancias Privadas - Singleton)
    # ==========================================
    _user_repository = None
    _convocatoria_repository = None
    _campana_repository = None
    _postulacion_repository = None
    _password_hasher = DjangoPasswordHasher()

    # ==========================================
    #  1. USUARIOS
    # ==========================================
    @staticmethod
    def get_user_repository():
        if Container._user_repository is None:
            Container._user_repository = PostgresUserRepository()
        return Container._user_repository

    @staticmethod
    def register_user_use_case() -> RegisterUser:
        return RegisterUser(user_repository=Container.get_user_repository())
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        return LoginUser(
            user_repository=Container.get_user_repository(),
            password_hasher=Container._password_hasher
            )


    # ==========================================
    #  2. CONVOCATORIAS
    # ==========================================
    @staticmethod
    def get_convocatoria_repository():
        if Container._convocatoria_repository is None:
            Container._convocatoria_repository = PostgresConvocatoriaRepository()
        return Container._convocatoria_repository

    @staticmethod
    def crear_convocatoria_use_case() -> CrearConvocatoriaUseCase:
        return CrearConvocatoriaUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def listar_convocatorias_use_case() -> ListarConvocatoriasUseCase:
        return ListarConvocatoriasUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def actualizar_convocatoria_use_case() -> ActualizarConvocatoriaUseCase:
        return ActualizarConvocatoriaUseCase(repository=Container.get_convocatoria_repository())
    
    @staticmethod
    def eliminar_convocatoria_use_case() -> EliminarConvocatoriaUseCase:
        return EliminarConvocatoriaUseCase(repository=Container.get_convocatoria_repository())

    # ==========================================
    #  3. CAMPAÑAS
    # ==========================================
    @staticmethod
    def get_campana_repository():
        if Container._campana_repository is None:
            Container._campana_repository = PostgresCampanaRepository()
        return Container._campana_repository

    @staticmethod
    def crear_campana_use_case() -> CrearCampanaUseCase:
        return CrearCampanaUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def listar_campanas_use_case() -> ListarCampanasUseCase:
        return ListarCampanasUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def actualizar_campana_use_case() -> ActualizarCampanaUseCase:
        return ActualizarCampanaUseCase(repository=Container.get_campana_repository())
    
    @staticmethod
    def eliminar_campana_use_case() -> EliminarCampanaUseCase:
        return EliminarCampanaUseCase(repository=Container.get_campana_repository())

    # ==========================================
    #  4. POSTULACIONES (VOLUNTARIADO)
    # ==========================================
    @staticmethod
    def get_postulacion_repository():
        if Container._postulacion_repository is None:
            Container._postulacion_repository = PostgresPostulacionRepository()
        return Container._postulacion_repository

    @staticmethod
    def postular_voluntario_use_case() -> PostularVoluntarioUseCase:
        return PostularVoluntarioUseCase(
            postulacion_repository=Container.get_postulacion_repository(),
            convocatoria_repository=Container.get_convocatoria_repository()
        )

    @staticmethod
    def listar_mis_postulaciones_use_case() -> ListarMisPostulacionesUseCase:
        return ListarMisPostulacionesUseCase(
            postulacion_repository=Container.get_postulacion_repository()
        )