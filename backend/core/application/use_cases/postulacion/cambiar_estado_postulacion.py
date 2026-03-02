from core.application.ports.input.postulacion_use_cases import CambiarEstadoPostulacionInputPort
from core.application.ports.output.postulacion_repository import PostulacionRepository
from core.application.ports.output.notificacion_repository import NotificacionRepository
from core.application.ports.output.email_service import EmailService
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.entities.postulacion import Postulacion
from core.domain.services.postulacion_service import PostulacionService
from core.domain.exceptions.postulacion_exceptions import PostulacionNoEncontradaError

class CambiarEstadoPostulacionUseCase(CambiarEstadoPostulacionInputPort):
    """
    Caso de Uso: Administrador cambia el estado de una postulación.
    """
    def __init__(self, postulacion_repository: PostulacionRepository, notificacion_repository: NotificacionRepository, email_service: EmailService, convocatoria_repository: ConvocatoriaRepository):
        self.postulacion_repository = postulacion_repository
        self.notificacion_repository = notificacion_repository
        self.email_service = email_service
        self.convocatoria_repository = convocatoria_repository

    def execute(self, id_postulacion: int, nuevo_estado: str, motivo_rechazo: str = None) -> Postulacion:
        postulacion = self.postulacion_repository.obtener_por_id(id_postulacion)
        if not postulacion:
            raise PostulacionNoEncontradaError(id_postulacion)
            
        estado_anterior = postulacion.estado
        
        postulacion_actualizada = PostulacionService.transicionar_estado(
            postulacion=postulacion, 
            nuevo_estado=nuevo_estado, 
            motivo_rechazo=motivo_rechazo
        )
        
        postulacion_guardada = self.postulacion_repository.actualizar(postulacion_actualizada)
        
        if estado_anterior != "aprobada" and nuevo_estado == "aprobada":
            convocatoria = self.convocatoria_repository.obtener_por_id(postulacion_guardada.id_convocatoria)
            if convocatoria:
                if (convocatoria.cupos_ocupados + 1) >= convocatoria.cupos_disponibles:
                    self.convocatoria_repository.actualizar(convocatoria.id, {"estado": "pausada"})
                    
        elif estado_anterior == "aprobada" and nuevo_estado != "aprobada":
            convocatoria = self.convocatoria_repository.obtener_por_id(postulacion_guardada.id_convocatoria)
            if convocatoria and convocatoria.estado == "pausada":
                self.convocatoria_repository.actualizar(convocatoria.id, {"estado": "abierta"})

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
        
        # 5. Desacoplamiento: Enviar Correo Electrónico (Solo Aprobada o Rechazada)
        if nuevo_estado in ["aprobada", "rechazada"] and postulacion_guardada.correo_usuario:
            convocatoria = self.convocatoria_repository.obtener_por_id(postulacion_guardada.id_convocatoria)
            
            asunto_correo = f"Actualización de tu postulación: {titulo_conv}"
            
            if nuevo_estado == "aprobada":
                cuerpo_correo = f"¡Hola {postulacion_guardada.nombre_usuario or 'Voluntario'}!\n\nTenemos excelentes noticias. Tu postulación para la convocatoria '{titulo_conv}' ha sido APROBADA.\n\n"
                
                if convocatoria and convocatoria.link_whatsapp:
                    cuerpo_correo += "Para ver las instrucciones de inicio y unirte al grupo de WhatsApp oficial de esta convocatoria, por favor inicia sesión en nuestra plataforma y revisa la sección de 'Mis Postulaciones'.\n\n"
                else:
                    cuerpo_correo += "Para ver las instrucciones de inicio y los próximos pasos, por favor inicia sesión en nuestra plataforma y revisa la sección de 'Mis Postulaciones'.\n\n"
                
                cuerpo_correo += "¡Gracias por querer ser parte del cambio con FUNSAMEZ!"
            else:
                cuerpo_correo = f"Hola {postulacion_guardada.nombre_usuario or 'Voluntario'},\n\nTe informamos que el estado de tu postulación para la convocatoria '{titulo_conv}' ha cambiado a RECHAZADA.\n\n"
                if motivo_rechazo:
                    cuerpo_correo += f"Motivo/Observación de la fundación: {motivo_rechazo}\n\n"
                cuerpo_correo += "Agradecemos profundamente tu interés y tiempo. Te invitamos a seguir participando en futuras convocatorias."

            self.email_service.enviar_correo(
                destinatario=postulacion_guardada.correo_usuario,
                asunto=asunto_correo,
                cuerpo=cuerpo_correo
            )
        
        return postulacion_guardada