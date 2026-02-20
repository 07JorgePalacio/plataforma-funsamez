from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.campana import Campana

class ActualizarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Campana:
        # 1. Verificar que existe
        campana_existente = self.repository.obtener_por_id(id)
        if not campana_existente:
            raise ValueError(f"No existe la campaña con ID {id}")
        
        # 2. Validaciones de Negocio
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            # Convertir a date si es datetime
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if fin_date < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")
        
        if 'monto_objetivo' in datos and datos['monto_objetivo'] < 0:
            raise ValueError("El monto objetivo no puede ser negativo.")
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)