from core.application.ports.input.postulacion_use_cases import CambiarEstadoPostulacionInputPort
from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.application.ports.output.notificacion_repository import NotificacionRepository
from core.domain.entities.postulacion import Postulacion
from core.domain.services.postulacion_service import PostulacionService
from core.domain.exceptions.postulacion_exceptions import PostulacionNoEncontradaError

class CambiarEstadoPostulacionUseCase(CambiarEstadoPostulacionInputPort):
    """
    Caso de Uso: Administrador cambia el estado de una postulación.
    """
    def __init__(self, postulacion_repository: PostulacionRepository, notificacion_repository: NotificacionRepository):
        self.postulacion_repository = postulacion_repository
        self.notificacion_repository = notificacion_repository

    def execute(self, id_postulacion: int, nuevo_estado: str, motivo_rechazo: str = None) -> Postulacion:
        # 1. Extraer la Entidad Pura
        postulacion = self.postulacion_repository.obtener_por_id(id_postulacion)
        if not postulacion:
            raise PostulacionNoEncontradaError(id_postulacion)
        
        # 2. Delegar la lógica de negocio al Servicio de Dominio
        postulacion_actualizada = PostulacionService.transicionar_estado(
            postulacion=postulacion, 
            nuevo_estado=nuevo_estado, 
            motivo_rechazo=motivo_rechazo
        )
        
        # 3. Guardar cambios usando el Puerto de Salida
        postulacion_guardada = self.postulacion_repository.actualizar(postulacion_actualizada)
        
        # 4. Desacoplamiento: Disparar notificación a través del Puerto
        titulos = {
            "aprobada": "¡Postulación Aprobada!",
            "rechazada": "Actualización de Postulación",
            "en_espera": "Postulación en Lista de Espera",
            "en_revision": "Postulación en Revisión"
        }
        tipos = {
            "aprobada": "success",
            "rechazada": "error",
            "en_espera": "warning",
            "en_revision": "info"
        }
        
        titulo_conv = postulacion_guardada.titulo_convocatoria or "una convocatoria"
        mensaje = f"El estado de tu postulación para '{titulo_conv}' ha cambiado a: {nuevo_estado.replace('_', ' ').title()}."
        
        if motivo_rechazo:
            mensaje += f" Observación: {motivo_rechazo}"
            
        self.notificacion_repository.enviar_notificacion(
            id_usuario=postulacion_guardada.id_usuario,
            titulo=titulos.get(nuevo_estado, "Actualización"),
            mensaje=mensaje,
            tipo=tipos.get(nuevo_estado, "info"),
            referencia_id=postulacion_guardada.id 
        )
        
        return postulacion_guardada