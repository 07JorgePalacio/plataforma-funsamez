from datetime import date
from core.domain.entities.campana import Campana

class CampanaService:
    """
    Servicios de Dominio: Lógica de negocio pura sin dependencias de frameworks.
    """
    
    @staticmethod
    def calcular_porcentaje_progreso(campana: Campana) -> float:
        if campana.monto_objetivo <= 0:
            return 0.0
        return min((campana.recaudo_actual / campana.monto_objetivo) * 100, 100.0)
    
    @staticmethod
    def calcular_dias_restantes(campana: Campana) -> int:
        if not campana.fecha_fin:
            return 0
        delta = campana.fecha_fin - date.today()
        return max(delta.days, 0)