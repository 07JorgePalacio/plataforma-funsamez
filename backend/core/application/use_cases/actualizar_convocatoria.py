from typing import Dict, Any
from core.domain.entities.convocatoria import Convocatoria

class ActualizarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, id: int, datos: Dict[str, Any]) -> Convocatoria:
        return self.repository.actualizar(id, datos)