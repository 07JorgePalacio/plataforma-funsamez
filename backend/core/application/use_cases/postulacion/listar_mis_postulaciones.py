from typing import List, Dict, Any
from core.domain.services.postulacion_service import PostulacionService

class ListarMisPostulacionesUseCase:
    """
    Caso de Uso: Obtiene el historial de postulaciones y las enriquece (DTO)
    para no contaminar la Entidad pura.
    """
    def __init__(self, postulacion_repository, convocatoria_repository, user_repository):
        self.postulacion_repo = postulacion_repository
        self.convocatoria_repo = convocatoria_repository
        self.user_repo = user_repository

    def execute(self, id_usuario: int) -> List[Dict[str, Any]]:
        postulaciones = self.postulacion_repo.listar_por_voluntario(id_usuario)
        resultado_dto = []
        
        # Orquestación: Construcción del DTO enriquecido
        for post in postulaciones:
            convocatoria = self.convocatoria_repo.obtener_por_id(post.id_convocatoria)
            usuario = self.user_repo.obtener_por_id(post.id_usuario)
            
            estado_convocatoria = convocatoria.estado if convocatoria else 'cerrada'
            
            dto = {
                # 1. Identificación y Foráneos
                "id": post.id,
                "id_usuario": post.id_usuario,
                "id_convocatoria": post.id_convocatoria,
                "titulo_convocatoria": convocatoria.titulo if convocatoria else "Convocatoria Eliminada",
                "nombre_usuario": usuario.nombre_completo if usuario else "Desconocido",
                "correo_usuario": usuario.correo_electronico if usuario else "",
                "telefono_usuario": usuario.numero_telefono if usuario else "",
                "documento_usuario": f"{usuario.tipo_documento} {usuario.numero_identificacion}" if usuario else "",
                "habilidades_usuario": usuario.habilidades if usuario else [],
                "disponibilidad_usuario": usuario.disponibilidad if usuario else {},
                
                # 2. Datos Propios
                "observaciones": post.observaciones,
                "motivo_rechazo": post.motivo_rechazo,
                "match_habilidades": post.match_habilidades,
                "match_disponibilidad": post.match_disponibilidad,
                "estado": post.estado,
                "fecha_postulacion": post.fecha_postulacion,
                "fecha_actualizacion": post.fecha_actualizacion,
                "historial_estados": post.historial_estados,
                
                # 3. Datos Calculados
                "estado_convocatoria": estado_convocatoria,
                "es_activa": PostulacionService.es_postulacion_activa(post.estado, estado_convocatoria)
            }
            resultado_dto.append(dto)
            
        return resultado_dto