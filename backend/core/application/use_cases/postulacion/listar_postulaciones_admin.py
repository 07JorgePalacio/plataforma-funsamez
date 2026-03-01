from typing import List
from core.application.ports.input.postulacion_use_cases import ListarTodasPostulacionesInputPort
from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.domain.entities.postulacion import Postulacion

class ListarTodasPostulacionesUseCase(ListarTodasPostulacionesInputPort):
    """
    Caso de Uso: Listar Todas las Postulaciones (Exclusivo para Administradores)
    """
    def __init__(self, postulacion_repository: PostulacionRepository):
        self.postulacion_repository = postulacion_repository

    def execute(self) -> List[Postulacion]:
        # Como es una consulta pura de lectura para el admin, 
        # delegamos directamente la carga al puerto de salida.
        return self.postulacion_repository.listar_todas()