from typing import List
from core.domain.entities.postulacion import Postulacion

class ListarMisPostulacionesUseCase:
    """
    Caso de Uso: Obtiene el historial de postulaciones de un voluntario (HU09/FUN-41).
    """
    def __init__(self, postulacion_repository):
        self.postulacion_repo = postulacion_repository

    def execute(self, id_usuario: int) -> List[Postulacion]:
        # El repositorio ya hace el trabajo pesado de filtrar y ordenar
        return self.postulacion_repo.listar_por_voluntario(id_usuario)