from typing import List, Dict, Any
from core.domain.entities.notificacion import Notificacion

class NotificacionService:
    """
    Servicios de dominio para Notificaciones.
    Toda lógica pura que no toque base de datos va aquí.
    """
    
    @staticmethod
    def estructurar_respuesta_notificaciones(notificaciones: List[Notificacion]) -> Dict[str, Any]:
        """
        Calcula métricas de negocio (como el conteo de no leídas) 
        y estructura la respuesta final (DTO) para no delegar esta carga al Frontend
        ni exponer las entidades puras a la capa REST.
        """
        # 1. Lógica Pura operando directamente sobre las Entidades
        conteo_no_leidas = sum(1 for n in notificaciones if not n.leida)
        
        # 2. Mapeo a DTO (Data Transfer Object) para la Vista
        resultados_dto = [
            {
                "id": n.id,
                "titulo": n.titulo,
                "mensaje": n.mensaje,
                "tipo": n.tipo,
                "leida": n.leida,
                "fecha_creacion": n.fecha_creacion,
                "referencia_id": n.referencia_id
            } for n in notificaciones
        ]
        
        return {
            "conteo_no_leidas": conteo_no_leidas,
            "resultados": resultados_dto
        }