from core.application.ports.output.notificacion_repository import NotificacionRepository

class EliminarNotificacionUseCase:

    def __init__(self, notificacion_repository: NotificacionRepository):
        self.notificacion_repository = notificacion_repository

    def execute(self, id_notificacion: int) -> bool:
        exito = self.notificacion_repository.eliminar(id_notificacion)
        if not exito:
            raise ValueError(f"La notificación con ID {id_notificacion} no existe o ya fue eliminada.")
        return True