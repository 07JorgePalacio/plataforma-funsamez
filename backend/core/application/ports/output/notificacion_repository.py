from abc import ABC, abstractmethod
from typing import List, Dict

class NotificacionRepository(ABC):
    """
    Puerto de Salida: Contrato para el sistema de notificaciones.
    Cualquier adaptador (In-App, Email, SMS) debe cumplir con esta interfaz.
    """
    @abstractmethod
    def enviar_notificacion(self, id_usuario: int, titulo: str, mensaje: str, tipo: str, referencia_id: int = None) -> None:
        """Envía o almacena una notificación para un usuario."""
        pass

    @abstractmethod
    def obtener_por_usuario(self, id_usuario: int) -> List[Dict]:
        """Obtiene la lista de notificaciones de un usuario."""
        pass

    @abstractmethod
    def marcar_como_leida(self, id_notificacion: int) -> bool:
        """Marca una notificación específica como leída."""
        pass

    @abstractmethod
    def eliminar(self, id_notificacion: int) -> bool:
        """Elimina físicamente una notificación de la base de datos."""
        pass

    @abstractmethod
    def eliminar_todas_por_usuario(self, id_usuario: int) -> int:
        """Elimina todas las notificaciones de un usuario y retorna la cantidad eliminada."""
        pass

    @abstractmethod
    def limpiar_antiguas_por_usuario(self, id_usuario: int, dias_leidas: int = 15, dias_todas: int = 30) -> None:
        """Limpia notificaciones antiguas (Garbage Collection) para mantener la BD optimizada."""
        pass