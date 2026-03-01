from core.application.ports.output.notificacion_repository import NotificacionRepository

class MarcarNotificacionLeidaUseCase:
    
    def __init__(self, notificacion_repository: NotificacionRepository):
        self.notificacion_repository = notificacion_repository

    def execute(self, id_notificacion: int) -> bool:
        exito = self.notificacion_repository.marcar_como_leida(id_notificacion)
        if not exito:
            raise ValueError(f"La notificación con ID {id_notificacion} no existe o no pudo ser actualizada.")
        return True
    