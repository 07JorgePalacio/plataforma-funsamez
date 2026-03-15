from typing import List, Dict, Any

class NotificacionService:
    """
    Servicios de dominio para Notificaciones.
    Toda lógica pura que no toque base de datos va aquí.
    """
    
    @staticmethod
    def estructurar_respuesta_notificaciones(notificaciones: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calcula métricas de negocio (como el conteo de no leídas) 
        y estructura la respuesta final para no delegar esta carga matemática al Frontend.
        """
        conteo_no_leidas = sum(1 for n in notificaciones if not n.get('leida', False))
        
        return {
            "conteo_no_leidas": conteo_no_leidas,
            "resultados": notificaciones
        }