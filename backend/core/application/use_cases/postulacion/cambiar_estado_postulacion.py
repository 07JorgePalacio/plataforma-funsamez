from core.application.ports.input.postulacion_use_cases import CambiarEstadoPostulacionInputPort
from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.domain.entities.postulacion import Postulacion
from core.domain.services.postulacion_service import PostulacionService
from core.domain.exceptions.postulacion_exceptions import PostulacionNoEncontradaError

class CambiarEstadoPostulacionUseCase(CambiarEstadoPostulacionInputPort):
    """
    Caso de Uso: Administrador cambia el estado de una postulación.
    """
    def __init__(self, postulacion_repository: PostulacionRepository):
        self.postulacion_repository = postulacion_repository

    def execute(self, id_postulacion: int, nuevo_estado: str, motivo_rechazo: str = None) -> Postulacion:
        # 1. Extraer la Entidad Pura
        postulacion = self.postulacion_repository.obtener_por_id(id_postulacion)
        if not postulacion:
            raise PostulacionNoEncontradaError(id_postulacion)
        
        # 2. Delegar la lógica de negocio al Servicio de Dominio
        postulacion_actualizada = PostulacionService.transicionar_estado(
            postulacion=postulacion, 
            nuevo_estado=nuevo_estado, 
            motivo_rechazo=motivo_rechazo
        )
        
        # 3. Guardar cambios usando el Puerto de Salida
        return self.postulacion_repository.actualizar(postulacion_actualizada)