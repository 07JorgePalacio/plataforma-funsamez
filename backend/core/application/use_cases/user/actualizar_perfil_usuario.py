from typing import Dict, Any
from core.application.ports.input.user_use_cases import ActualizarPerfilUsuarioInputPort
from core.application.ports.output.user_repository import UserRepository
from core.domain.entities.user import User

class ActualizarPerfilUsuarioUseCase(ActualizarPerfilUsuarioInputPort):
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, user_id: int, datos_actualizados: Dict[str, Any]) -> User:
        """
        Orquesta la actualización del perfil del usuario.
        Aplica reglas de negocio y se comunica con el puerto de salida (Base de datos).
        """
        
        # 1. Podemos proteger campos sensibles para que no se puedan modificar por esta vía
        campos_protegidos = ['id', 'correo_electronico', 'contrasena_hash', 'rol', 'estado']
        for campo in campos_protegidos:
            datos_actualizados.pop(campo, None)
            
        # 2. Llamamos al repositorio para actualizar
        usuario_actualizado = self.user_repository.actualizar(user_id, datos_actualizados)
        
        # 3. Validamos que el usuario realmente existiera
        if not usuario_actualizado:
            raise ValueError(f"No se pudo actualizar: Usuario con ID {user_id} no encontrado.")
            
        return usuario_actualizado