from typing import Dict, Any
from core.domain.entities.campana import Campana

class ActualizarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, id: int, datos: Dict[str, Any]) -> Campana:
        return self.repository.actualizar(id, datos)