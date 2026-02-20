from typing import Dict, Any
from datetime import date, datetime
from core.domain.entities.convocatoria import Convocatoria

class ActualizarConvocatoriaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, id: int, datos: Dict[str, Any]) -> Convocatoria:
        # 1. Verificar que existe
        convocatoria_existente = self.repository.obtener_por_id(id)
        if not convocatoria_existente:
            raise ValueError(f"No existe la convocatoria con ID {id}")
        
        # 2. Validaciones de Negocio
        if 'fecha_inicio' in datos and 'fecha_fin' in datos:
            inicio = datos['fecha_inicio']
            fin = datos['fecha_fin']
            
            inicio_date = inicio.date() if isinstance(inicio, datetime) else inicio
            fin_date = fin.date() if isinstance(fin, datetime) else fin
            
            if fin_date < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")
        
        # 3. Actualizar
        return self.repository.actualizar(id, datos)