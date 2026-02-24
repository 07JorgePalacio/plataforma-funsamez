from datetime import date, datetime
from typing import Optional
from core.domain.entities.campana import Campana

class CampanaService:
    """
    Servicios de dominio para Campaña.
    
    ¿Cuándo usar este service?
    - Calcular progreso, días restantes
    - Validar fechas, montos
    - Clasificar impacto
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
    
    @staticmethod
    def esta_activa(campana: Campana) -> bool:
        """
        Verifica si la campaña está en periodo activo.
        
        Regla de negocio:
        - Debe estar entre fecha_inicio y fecha_fin
        - Estado debe ser "activa"
        """
        if not campana.fecha_inicio or not campana.fecha_fin:
            return False
        
        hoy = date.today()
        
        # Convertir fecha_inicio a date si es datetime
        inicio_date = (
            campana.fecha_inicio.date() 
            if isinstance(campana.fecha_inicio, datetime) 
            else campana.fecha_inicio
        )
        
        return (
            inicio_date <= hoy <= campana.fecha_fin and 
            campana.estado == "activa"
        )
    
    @staticmethod
    def validar_fechas_coherentes(fecha_inicio: date, fecha_fin: date) -> bool:
        """
        Valida que fecha_fin sea posterior a fecha_inicio.
        
        ¿Por qué en Service?
        Es una regla de negocio pura, sin acceso a BD.
        """
        return fecha_fin > fecha_inicio
    
    @staticmethod
    def validar_monto_positivo(monto: int) -> bool:
        """
        Valida que el monto sea positivo.
        """
        return monto > 0
    
    @staticmethod
    def calcular_monto_faltante(campana: Campana) -> int:
        """
        Calcula cuánto falta para alcanzar el objetivo.
        
        Returns:
            int: Monto faltante (0 si ya se alcanzó)
        """
        faltante = campana.monto_objetivo - campana.recaudo_actual
        return max(faltante, 0)
    
    @staticmethod
    def clasificar_impacto(campana: Campana) -> str:
        """
        Clasifica el impacto potencial según el monto.
        
        Regla de negocio:
        - Bajo: < $500,000
        - Medio: $500,000 - $2,000,000
        - Alto: > $2,000,000
        
        Returns:
            str: "bajo", "medio", "alto"
        """
        if campana.monto_objetivo < 500000:
            return "bajo"
        elif campana.monto_objetivo < 2000000:
            return "medio"
        else:
            return "alto"