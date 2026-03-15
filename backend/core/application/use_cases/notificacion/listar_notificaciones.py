from typing import List, Dict, Any
from core.application.ports.output.notificacion_repository import NotificacionRepository
from core.domain.services.notificacion_service import NotificacionService

class ListarNotificacionesUseCase:

    def __init__(self, notificacion_repository: NotificacionRepository):
        self.notificacion_repository = notificacion_repository

    def execute(self, id_usuario: int) -> Dict[str, Any]:
        # 1. Limpieza silenciosa previa (Garbage Collection)
        self.notificacion_repository.limpiar_antiguas_por_usuario(id_usuario)
            
        # 2. Obtenemos las notificaciones frescas
        notificaciones = self.notificacion_repository.obtener_por_usuario(id_usuario)
        
        # 3. Delegamos el cálculo y estructuración al Service (Lógica Pura)
        return NotificacionService.estructurar_respuesta_notificaciones(notificaciones)