from typing import List, Optional
from core.domain.entities.postulacion import Postulacion
from core.infrastructure.persistence.django.models import PostulacionModel
from django.core.exceptions import ObjectDoesNotExist

class PostgresPostulacionRepository:
    """
    Repositorio para Postulaciones.
    Traduce entre la Entidad de Dominio y el Modelo ORM de Django.
    """

    def _to_entity(self, model: PostulacionModel) -> Postulacion:
        """Convierte el modelo de la BD a una Entidad pura de Dominio usando El Orden Maestro."""
        return Postulacion(
            # --- 1. Identificación ---
            id=model.id,
            id_usuario=model.usuario_id,
            id_convocatoria=model.convocatoria_id,
            
            # --- 2. Información Básica ---
            observaciones=model.observaciones,
            motivo_rechazo=model.motivo_rechazo,
            
            # --- 3. Logística/Configuración ---
            estado=model.estado,
            
            # --- 4. Tiempos ---
            fecha_postulacion=model.fecha_postulacion,
            fecha_actualizacion=model.fecha_actualizacion,
            
            # --- 5. Listas y JSON ---
            historial_estados=model.historial_estados
        )

    def crear(self, postulacion: Postulacion) -> Postulacion:
        modelo = PostulacionModel.objects.create(
            # --- 1. Identificación ---
            usuario_id=postulacion.id_usuario,
            convocatoria_id=postulacion.id_convocatoria,
            
            # --- 2. Información Básica ---
            observaciones=postulacion.observaciones,
            
            # --- 3. Logística/Configuración ---
            estado=postulacion.estado,
            
            # --- 5. Listas y JSON ---
            historial_estados=postulacion.historial_estados
        )
        return self._to_entity(modelo)

    def obtener_por_usuario_y_convocatoria(self, id_usuario: int, id_convocatoria: int) -> Optional[Postulacion]:
        """Busca si el usuario ya se postuló a esta convocatoria."""
        try:
            modelo = PostulacionModel.objects.get(usuario_id=id_usuario, convocatoria_id=id_convocatoria)
            return self._to_entity(modelo)
        except ObjectDoesNotExist:
            return None

    def listar_por_voluntario(self, id_usuario: int) -> List[Postulacion]:
        """Para la vista 'Mis Postulaciones' de la HU09."""
        modelos = PostulacionModel.objects.filter(usuario_id=id_usuario).order_by('-fecha_postulacion')
        return [self._to_entity(m) for m in modelos]

    def actualizar(self, postulacion: Postulacion) -> Postulacion:
        """Actualización BLINDADA campo por campo."""
        try:
            modelo = PostulacionModel.objects.get(id=postulacion.id)
            
            # --- 2. Información Básica ---
            if postulacion.motivo_rechazo is not None:
                modelo.motivo_rechazo = postulacion.motivo_rechazo
                
            # --- 3. Logística/Configuración ---
            if postulacion.estado is not None:
                modelo.estado = postulacion.estado
                
            # --- 5. Listas y JSON ---
            # Protegemos el JSON, solo lo actualizamos si viene una lista real
            if isinstance(postulacion.historial_estados, list):
                modelo.historial_estados = postulacion.historial_estados
                
            modelo.save()
            return self._to_entity(modelo)
        except ObjectDoesNotExist:
            raise ValueError(f"La postulación con ID {postulacion.id} no existe.")