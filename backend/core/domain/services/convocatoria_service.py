from datetime import date, datetime
from typing import Dict, List
from core.domain.entities.convocatoria import Convocatoria

class ConvocatoriaService:
    """
    Servicios de dominio para Convocatoria.
    
    ¿Cuándo usar este service?
    - Calcular cupos, días para inicio
    - Validar horarios
    - Verificar vigencia
    """
    
    @staticmethod
    def calcular_dias_para_inicio(convocatoria: Convocatoria) -> int:
        """
        Calcula cuántos días faltan para que inicie.
        
        Returns:
            int: Días faltantes (0 si ya comenzó)
        """
        if not convocatoria.fecha_inicio:
            return 0
        
        hoy = date.today()
        
        inicio_date = (
            convocatoria.fecha_inicio.date() 
            if isinstance(convocatoria.fecha_inicio, datetime) 
            else convocatoria.fecha_inicio
        )
        
        delta = inicio_date - hoy
        return max(delta.days, 0)
    
    @staticmethod
    def esta_vigente(convocatoria: Convocatoria) -> bool:
        """
        Verifica si está dentro del periodo de vigencia.
        
        Regla: Debe estar entre fecha_inicio y fecha_fin
        """
        if not convocatoria.fecha_inicio or not convocatoria.fecha_fin:
            return False
        
        hoy = date.today()
        
        inicio_date = (
            convocatoria.fecha_inicio.date() 
            if isinstance(convocatoria.fecha_inicio, datetime) 
            else convocatoria.fecha_inicio
        )
        
        fin_date = (
            convocatoria.fecha_fin.date() 
            if isinstance(convocatoria.fecha_fin, datetime) 
            else convocatoria.fecha_fin
        )
        
        return inicio_date <= hoy <= fin_date
    
    @staticmethod
    def esta_abierta_para_postulaciones(convocatoria: Convocatoria, postulaciones_aprobadas: int) -> bool:
        """
        Verifica si acepta nuevas postulaciones.
        
        Reglas:
        1. Estado debe ser "abierta"
        2. Debe haber cupos disponibles
        3. Debe estar vigente
        
        Args:
            convocatoria: Entidad
            postulaciones_aprobadas: Número de postulaciones ya aprobadas
        """
        cupos_ocupados = postulaciones_aprobadas
        cupos_libres = convocatoria.cupos_disponibles - cupos_ocupados
        
        return (
            convocatoria.estado == "abierta" and
            cupos_libres > 0 and
            ConvocatoriaService.esta_vigente(convocatoria)
        )
    
    @staticmethod
    def validar_horario_compatible(
        horario_convocatoria: Dict, 
        disponibilidad_usuario: Dict
    ) -> bool:
        """
        Verifica si el usuario puede cumplir el horario.
        
        Args:
            horario_convocatoria: {"Lunes": ["manana"], "Martes": ["tarde"]}
            disponibilidad_usuario: {"Lunes": ["manana", "tarde"], ...}
        
        Returns:
            bool: True si hay al menos una coincidencia
        
        Ejemplo:
            >>> horario_conv = {"Lunes": ["manana"]}
            >>> disponibilidad = {"Lunes": ["manana", "tarde"]}
            >>> ConvocatoriaService.validar_horario_compatible(horario_conv, disponibilidad)
            True
        """
        if not horario_convocatoria or not disponibilidad_usuario:
            return True  # Si no hay restricción, acepta
        
        for dia, jornadas_req in horario_convocatoria.items():
            if dia in disponibilidad_usuario:
                jornadas_user = disponibilidad_usuario[dia]
                # Si hay al menos una jornada en común
                if any(j in jornadas_user for j in jornadas_req):
                    return True
        
        return False
    
    @staticmethod
    def clasificar_urgencia(convocatoria: Convocatoria) -> str:
        """
        Clasifica la urgencia según días para inicio.
        
        Regla de negocio:
        - Urgente: <= 3 días
        - Pronto: 4-7 días
        - Normal: > 7 días
        
        Returns:
            str: "urgente", "pronto", "normal"
        """
        dias = ConvocatoriaService.calcular_dias_para_inicio(convocatoria)
        
        if dias <= 3:
            return "urgente"
        elif dias <= 7:
            return "pronto"
        else:
            return "normal"