from typing import List
from core.domain.entities.convocatoria import Convocatoria
# Asumimos que la interfaz existe o Python usará duck typing con la implementación concreta
# from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class ListarConvocatoriasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self) -> List[Convocatoria]:
        return self.repository.listar_todas()