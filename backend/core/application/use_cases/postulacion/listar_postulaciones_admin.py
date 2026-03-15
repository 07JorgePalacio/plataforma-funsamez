from typing import List
from core.application.ports.input.postulacion_use_cases import ListarTodasPostulacionesInputPort
from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.domain.entities.postulacion import Postulacion
from core.domain.services.postulacion_service import PostulacionService

class ListarTodasPostulacionesUseCase(ListarTodasPostulacionesInputPort):
    """
    Caso de Uso: Listar Todas las Postulaciones (Exclusivo para Administradores)
    """
    def __init__(self, postulacion_repository: PostulacionRepository, convocatoria_repository):
        self.postulacion_repository = postulacion_repository
        self.convocatoria_repository = convocatoria_repository

    def execute(self) -> List[Postulacion]:
        postulaciones = self.postulacion_repository.listar_todas()
        
        # Orquestación: Enriquecer con lógica de negocio pura
        for post in postulaciones:
            convocatoria = self.convocatoria_repository.obtener_por_id(post.id_convocatoria)
            estado_convocatoria = convocatoria.estado if convocatoria else 'cerrada'
            
            post.estado_convocatoria = estado_convocatoria
            post.es_activa = PostulacionService.es_postulacion_activa(post.estado, estado_convocatoria)
            
        return postulaciones