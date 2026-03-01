from typing import List, Dict
from core.application.ports.output.notificacion_repository import NotificacionRepository
from core.infrastructure.persistence.django.models import NotificacionModel

class PostgresNotificacionRepository(NotificacionRepository):
    
    def enviar_notificacion(self, id_usuario: int, titulo: str, mensaje: str, tipo: str, referencia_id: int = None) -> None:
        NotificacionModel.objects.create(
            usuario_id=id_usuario,
            titulo=titulo,
            mensaje=mensaje,
            tipo=tipo,
            referencia_id=referencia_id 
        )

    def obtener_por_usuario(self, id_usuario: int) -> List[Dict]:
        notificaciones = NotificacionModel.objects.filter(usuario_id=id_usuario).order_by('-fecha_creacion')
        return [
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

    def marcar_como_leida(self, id_notificacion: int) -> bool:
        try:
            notificacion = NotificacionModel.objects.get(id=id_notificacion)
            notificacion.leida = True
            notificacion.save()
            return True
        except NotificacionModel.DoesNotExist:
            return False

    def eliminar(self, id_notificacion: int) -> bool:
        try:
            notificacion = NotificacionModel.objects.get(id=id_notificacion)
            notificacion.delete()
            return True
        except NotificacionModel.DoesNotExist:
            return False

    def eliminar_todas_por_usuario(self, id_usuario: int) -> int:
        # filter().delete() retorna una tupla, el primer valor es la cantidad de elementos borrados
        cantidad, _ = NotificacionModel.objects.filter(usuario_id=id_usuario).delete()
        return cantidad