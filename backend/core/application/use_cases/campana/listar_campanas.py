from typing import List
from core.domain.entities.campana import Campana
from core.domain.services.campana_service import CampanaService

class ListarCampanasUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self) -> List[Campana]:
        campanas = self.repository.obtener_todas()
        
        # Orquestación: Enriquecemos las entidades con la lógica de negocio pura
        for campana in campanas:
            campana.porcentaje_progreso = CampanaService.calcular_porcentaje_progreso(campana)
            campana.dias_restantes = CampanaService.calcular_dias_restantes(campana)
            
        return campanas