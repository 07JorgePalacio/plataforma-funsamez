from core.application.ports.output.notificacion_repository import NotificacionRepository

class EliminarTodasNotificacionesUseCase:

    def __init__(self, notificacion_repository: NotificacionRepository):
        self.notificacion_repository = notificacion_repository

    def execute(self, id_usuario: int) -> int:
        # Retorna la cantidad de notificaciones eliminadas
        return self.notificacion_repository.eliminar_todas_por_usuario(id_usuario)