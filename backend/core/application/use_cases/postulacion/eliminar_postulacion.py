from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.domain.exceptions.postulacion_exceptions import PostulacionNoEncontradaError

class EliminarPostulacionUseCase:
    """
    Caso de Uso: Administrador elimina una postulación del historial.
    """
    def __init__(self, postulacion_repository: PostulacionRepository):
        self.postulacion_repository = postulacion_repository

    def execute(self, id_postulacion: int) -> bool:
        # Delegamos la eliminación al puerto de salida
        exito = self.postulacion_repository.eliminar(id_postulacion)
        
        if not exito:
            raise PostulacionNoEncontradaError(id_postulacion)
            
        return True