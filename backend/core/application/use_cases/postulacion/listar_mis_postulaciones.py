from typing import List
from core.domain.entities.postulacion import Postulacion
from core.domain.services.postulacion_service import PostulacionService

class ListarMisPostulacionesUseCase:
    """
    Caso de Uso: Obtiene el historial de postulaciones de un voluntario.
    """
    def __init__(self, postulacion_repository, convocatoria_repository):
        self.postulacion_repo = postulacion_repository
        self.convocatoria_repo = convocatoria_repository

    def execute(self, id_usuario: int) -> List[Postulacion]:
        postulaciones = self.postulacion_repo.listar_por_voluntario(id_usuario)
        
        # Orquestación: Enriquecer con lógica de negocio pura
        for post in postulaciones:
            convocatoria = self.convocatoria_repo.obtener_por_id(post.id_convocatoria)
            estado_convocatoria = convocatoria.estado if convocatoria else 'cerrada'
            
            post.estado_convocatoria = estado_convocatoria
            post.es_activa = PostulacionService.es_postulacion_activa(post.estado, estado_convocatoria)
            
        return postulaciones