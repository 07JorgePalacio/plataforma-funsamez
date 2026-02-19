from typing import List
from core.domain.entities.convocatoria import Convocatoria

class ListarConvocatoriasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, estado: str = None) -> List[Convocatoria]:
        return self.repository.listar_todas(estado=estado)