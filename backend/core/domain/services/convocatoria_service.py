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
    def validar_periodo(fecha_inicio, fecha_fin) -> bool:
        """
        Valida que la fecha de fin sea estrictamente posterior a la fecha de inicio.
        """
        return fecha_inicio < fecha_fin

    @staticmethod
    def validar_cupos(cupos: int) -> bool:
        """
        Valida que la cantidad de cupos disponibles sea mayor a cero.
        """
        return cupos > 0
    
    @staticmethod
    def calcular_porcentaje_cupos(convocatoria: Convocatoria) -> float:
        """
        Calcula el porcentaje matemático de cupos ocupados (0 a 100).
        """
        cupos_ocupados = getattr(convocatoria, 'cupos_ocupados', 0)
        cupos_disp = getattr(convocatoria, 'cupos_disponibles', 0)
        
        if not cupos_disp or cupos_disp <= 0:
            return 0.0
            
        return min((cupos_ocupados / cupos_disp) * 100, 100.0)

    @staticmethod
    def calcular_match_score(convocatoria: Convocatoria, usuario) -> dict:
        """
        Calcula el desglose de compatibilidad (Match Score) entre una convocatoria y un usuario.
        Lógica pura de negocio (DDD) extraída del frontend.
        """
        if not usuario:
            return {"total": 0, "habilidades": 0, "disponibilidad": False}
            
        hab_user = getattr(usuario, 'habilidades', []) or []
        disp_user = getattr(usuario, 'disponibilidad', {}) or {}
        
        # Normalizar habilidades de la convocatoria
        hab_req_raw = getattr(convocatoria, 'habilidades_requeridas', "") or ""
        if isinstance(hab_req_raw, list):
            hab_req = [str(h).strip().lower() for h in hab_req_raw]
        else:
            hab_req = [h.strip().lower() for h in str(hab_req_raw).split(',')] if hab_req_raw else []
            
        horario_req = getattr(convocatoria, 'horario', {}) or {}
        
        # --- 1. Match de Habilidades (Base 50 puntos) ---
        hab_score = 50
        porcentaje_hab = 100
        if hab_req:
            coincidencias = 0
            for req in hab_req:
                if any(req in hu.lower() or hu.lower() in req for hu in hab_user):
                    coincidencias += 1
            hab_score = int((coincidencias / len(hab_req)) * 50)
            porcentaje_hab = int((coincidencias / len(hab_req)) * 100)
            
        # --- 2. Match de Disponibilidad (Base 50 puntos) ---
        disp_score = 50
        disp_match = True
        dias_map = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        
        tipo_horario = horario_req.get('tipo')
        if not tipo_horario:
            # Deducir tipo si no viene explícito
            tipo_horario = 'recurrente' if any(dia in horario_req for dia in dias_map) else 'unico'
        
        if tipo_horario == 'recurrente':
            dias_req = [k for k in horario_req.keys() if k in dias_map]
            if dias_req:
                disp_score = 0
                disp_match = False
                for dia in dias_req:
                    if dia in disp_user and disp_user[dia]:
                        disp_score = 50
                        disp_match = True
                        break
        elif tipo_horario == 'unico':
            fecha_evento = horario_req.get('fecha')
            if fecha_evento:
                disp_score = 0
                disp_match = False
                try:
                    # Convertir "YYYY-MM-DD" al día de la semana
                    from datetime import datetime
                    fecha_obj = datetime.strptime(fecha_evento, "%Y-%m-%d")
                    dia_semana = dias_map[fecha_obj.weekday()]
                    if dia_semana in disp_user and disp_user[dia_semana]:
                        disp_score = 50
                        disp_match = True
                except ValueError:
                    pass
                    
        return {
            "total": hab_score + disp_score,
            "habilidades": porcentaje_hab,
            "disponibilidad": disp_match
        }

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