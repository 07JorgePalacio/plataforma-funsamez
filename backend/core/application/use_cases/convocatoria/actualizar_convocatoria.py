from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.convocatoria import Convocatoria
from core.domain.services.convocatoria_service import ConvocatoriaService
from core.domain.exceptions.convocatoria_exceptions import (
    ConvocatoriaNoEncontradaError,
    FechaConvocatoriaInvalidaError
)

class ActualizarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Convocatoria:
        # 1. Verificar que existe
        convocatoria_existente = self.repository.obtener_por_id(id)
        if not convocatoria_existente:
            raise ConvocatoriaNoEncontradaError(id)
        
        # 2. Validaciones de Negocio orquestadas por el Service
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if not ConvocatoriaService.validar_periodo(inicio_date, fin_date):
                raise FechaConvocatoriaInvalidaError()
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)