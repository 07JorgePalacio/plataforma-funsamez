from typing import List
from core.domain.entities.campana import Campana

class ListarCampanasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self) -> List[Campana]:
        return self.repository.obtener_todas()