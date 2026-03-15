from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.campana import Campana
from core.domain.services.campana_service import CampanaService
from core.domain.exceptions.campana_exceptions import (
    CampanaNoEncontradaError,
    FechasIncoherentesError,
    MontoNegativoError
)

class ActualizarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Campana:
        # 1. Verificar que existe
        campana_existente = self.repository.obtener_por_id(id)
        if not campana_existente:
            raise CampanaNoEncontradaError(id)
        
        # 2. Validaciones de Negocio orquestadas por el Service
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if not CampanaService.validar_fechas_coherentes(inicio_date, fin_date):
                raise FechasIncoherentesError()
        
        if 'monto_objetivo' in datos and not CampanaService.validar_monto_no_negativo(datos['monto_objetivo']):
            raise MontoNegativoError(datos['monto_objetivo'])
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)