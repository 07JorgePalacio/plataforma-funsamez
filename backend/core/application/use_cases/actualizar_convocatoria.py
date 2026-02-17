from typing import Dict, Any
from core.domain.entities.convocatoria import Convocatoria

class ActualizarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, id: int, datos: Dict[str, Any]) -> Convocatoria:
        # Aquí es donde irían validaciones de negocio adicionales si fueran necesarias
        # Por ejemplo: Validar que no se reduzca el cupo a menos de los inscritos actuales
        
        return self.repository.actualizar(id, datos)