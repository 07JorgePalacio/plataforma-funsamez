from typing import List
from django.utils import timezone
from datetime import timedelta
from core.application.ports.output.notificacion_repository import NotificacionRepository
from core.infrastructure.persistence.django.models import NotificacionModel
from core.domain.entities.notificacion import Notificacion

class PostgresNotificacionRepository(NotificacionRepository):
    
    def enviar_notificacion(self, id_usuario: int, titulo: str, mensaje: str, tipo: str, referencia_id: int = None) -> None:
        NotificacionModel.objects.create(
            usuario_id=id_usuario,
            titulo=titulo,
            mensaje=mensaje,
            tipo=tipo,
            referencia_id=referencia_id 
        )

    def _to_entity(self, model: NotificacionModel) -> Notificacion:
        """Convierte el modelo de Django a una Entidad de Dominio pura."""
        return Notificacion(
            id_usuario=model.usuario_id,
            titulo=model.titulo,
            mensaje=model.mensaje,
            tipo=model.tipo,
            id=model.id,
            referencia_id=model.referencia_id,
            leida=model.leida,
            fecha_creacion=model.fecha_creacion
        )

    def obtener_por_usuario(self, id_usuario: int) -> List[Notificacion]:
        notificaciones = NotificacionModel.objects.filter(usuario_id=id_usuario).order_by('-fecha_creacion')
        return [self._to_entity(n) for n in notificaciones]

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

    def limpiar_antiguas_por_usuario(self, id_usuario: int, dias_leidas: int = 15, dias_todas: int = 30) -> None:
        """Limpia notificaciones leídas de más de X días, y CUALQUIERA de más de Y días."""
        ahora = timezone.now()
        
        # 1. Borrar leídas muy viejas (Basura procesada)
        limite_leidas = ahora - timedelta(days=dias_leidas)
        NotificacionModel.objects.filter(
            usuario_id=id_usuario, 
            leida=True, 
            fecha_creacion__lt=limite_leidas
        ).delete()
        
        # 2. Borrar cualquiera que sea extremadamente vieja para evitar acumulación infinita
        limite_todas = ahora - timedelta(days=dias_todas)
        NotificacionModel.objects.filter(
            usuario_id=id_usuario, 
            fecha_creacion__lt=limite_todas
        ).delete()