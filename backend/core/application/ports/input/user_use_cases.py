from abc import ABC, abstractmethod
from typing import Dict, Any
from core.domain.entities.user import User

class ActualizarPerfilUsuarioInputPort(ABC):
    """
    Puerto de Entrada (Interface).
    Define el contrato para el caso de uso de actualizar el perfil de un usuario.
    La capa de adaptadores (API REST) se comunicará a través de esta interface.
    """
    
    @abstractmethod
    def execute(self, user_id: int, datos_actualizados: Dict[str, Any]) -> User:
        """
        Ejecuta la lógica de negocio para actualizar un usuario.
        """
        pass