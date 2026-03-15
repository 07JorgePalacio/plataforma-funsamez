# --- REPOSITORIOS (INFRAESTRUCTURA) ---
from core.infrastructure.persistence.django.repositories.postgres_user_repository import PostgresUserRepository
from core.infrastructure.persistence.django.repositories.postgres_convocatoria_repository import PostgresConvocatoriaRepository
from core.infrastructure.persistence.django.repositories.postgres_campana_repository import PostgresCampanaRepository
from core.infrastructure.persistence.django.repositories.postgres_postulacion_repository import PostgresPostulacionRepository
from core.infrastructure.persistence.django.repositories.postgres_notificacion_repository import PostgresNotificacionRepository
from core.infrastructure.security.django_hasher import DjangoPasswordHasher
from core.infrastructure.external_services.django_email_service import DjangoEmailService

# --- CASOS DE USO: USUARIOS ---
from core.application.use_cases.user.register_user import RegisterUser
from core.application.use_cases.user.login_user import LoginUser
from core.application.use_cases.user.actualizar_perfil_usuario import ActualizarPerfilUsuarioUseCase

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
from core.application.use_cases.postulacion.listar_postulaciones_admin import ListarTodasPostulacionesUseCase
from core.application.use_cases.postulacion.cambiar_estado_postulacion import CambiarEstadoPostulacionUseCase
from core.application.use_cases.postulacion.eliminar_postulacion import EliminarPostulacionUseCase

# --- CASOS DE USO: NOTIFICACIONES ---
from core.application.use_cases.notificacion.listar_notificaciones import ListarNotificacionesUseCase
from core.application.use_cases.notificacion.marcar_notificacion_leida import MarcarNotificacionLeidaUseCase
from core.application.use_cases.notificacion.eliminar_notificacion import EliminarNotificacionUseCase
from core.application.use_cases.notificacion.eliminar_todas_notificaciones import EliminarTodasNotificacionesUseCase

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
    _notificacion_repository = None
    _password_hasher = DjangoPasswordHasher()
    _email_service = None

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
        return RegisterUser(
            user_repository=Container.get_user_repository(),
            password_hasher=Container._password_hasher
        )
    
    @staticmethod
    def login_user_use_case() -> LoginUser:
        return LoginUser(
            user_repository=Container.get_user_repository(),
            password_hasher=Container._password_hasher
            )

    @staticmethod
    def actualizar_perfil_usuario_use_case() -> ActualizarPerfilUsuarioUseCase:
        return ActualizarPerfilUsuarioUseCase(
            user_repository=Container.get_user_repository()
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
        return ListarConvocatoriasUseCase(
            repository=Container.get_convocatoria_repository(),
            user_repository=Container.get_user_repository()
        )
    
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
            convocatoria_repository=Container.get_convocatoria_repository(),
            user_repository=Container.get_user_repository()
        )

    @staticmethod
    def listar_mis_postulaciones_use_case() -> ListarMisPostulacionesUseCase:
        return ListarMisPostulacionesUseCase(
            postulacion_repository=Container.get_postulacion_repository(),
            convocatoria_repository=Container.get_convocatoria_repository()
        )

    @staticmethod
    def listar_todas_postulaciones_use_case() -> ListarTodasPostulacionesUseCase:
        return ListarTodasPostulacionesUseCase(
            postulacion_repository=Container.get_postulacion_repository(),
            convocatoria_repository=Container.get_convocatoria_repository()
        )

    @staticmethod
    def get_notificacion_repository():
        if Container._notificacion_repository is None:
            Container._notificacion_repository = PostgresNotificacionRepository()
        return Container._notificacion_repository

    @staticmethod
    def get_email_service():
        if Container._email_service is None:
            Container._email_service = DjangoEmailService()
        return Container._email_service

    @staticmethod
    def cambiar_estado_postulacion_use_case() -> CambiarEstadoPostulacionUseCase:
        return CambiarEstadoPostulacionUseCase(
            postulacion_repository=Container.get_postulacion_repository(),
            notificacion_repository=Container.get_notificacion_repository(),
            email_service=Container.get_email_service(),
            convocatoria_repository=Container.get_convocatoria_repository()
        )

    @staticmethod
    def eliminar_postulacion_use_case() -> EliminarPostulacionUseCase:
        return EliminarPostulacionUseCase(
            postulacion_repository=Container.get_postulacion_repository()
        )

    # ==========================================
    #  5. NOTIFICACIONES
    # ==========================================
    @staticmethod
    def listar_notificaciones_use_case() -> ListarNotificacionesUseCase:
        return ListarNotificacionesUseCase(
            notificacion_repository=Container.get_notificacion_repository()
        )

    @staticmethod
    def marcar_notificacion_leida_use_case() -> MarcarNotificacionLeidaUseCase:
        return MarcarNotificacionLeidaUseCase(
            notificacion_repository=Container.get_notificacion_repository()
        )

    @staticmethod
    def eliminar_notificacion_use_case() -> EliminarNotificacionUseCase:
        return EliminarNotificacionUseCase(
            notificacion_repository=Container.get_notificacion_repository()
        )

    @staticmethod
    def eliminar_todas_notificaciones_use_case() -> EliminarTodasNotificacionesUseCase:
        return EliminarTodasNotificacionesUseCase(
            notificacion_repository=Container.get_notificacion_repository()
        )