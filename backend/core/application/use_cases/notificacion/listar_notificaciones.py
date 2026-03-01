from typing import List, Dict
from core.application.ports.output.notificacion_repository import NotificacionRepository

class ListarNotificacionesUseCase:

    def __init__(self, notificacion_repository: NotificacionRepository):
        self.notificacion_repository = notificacion_repository

    def execute(self, id_usuario: int) -> List[Dict]:
        # Podemos agregar lógica extra aquí en el futuro (ej. paginación)
        return self.notificacion_repository.obtener_por_usuario(id_usuario)