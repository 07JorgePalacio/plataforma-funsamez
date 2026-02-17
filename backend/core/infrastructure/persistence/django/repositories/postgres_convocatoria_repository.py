from typing import List, Optional
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.entities.convocatoria import Convocatoria
from core.infrastructure.persistence.django.models import ConvocatoriaModel, UsuarioModel

class PostgresConvocatoriaRepository(ConvocatoriaRepository):

    def _to_domain(self, model: ConvocatoriaModel) -> Convocatoria:
        """Helper para convertir de Django Model -> Entidad de Dominio"""
        return Convocatoria(
            id=model.id,
            titulo=model.titulo,
            descripcion=model.descripcion,
            ubicacion=model.ubicacion or "",
            link_whatsapp=model.link_whatsapp or "",
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            cupos_disponibles=model.cupos_disponibles,
            id_usuario_creador=model.usuario_creador.id,
            estado=model.estado,
            habilidades_requeridas=model.habilidades_requeridas,
            categorias=model.categorias, 
            horario=model.horario,       
            fecha_creacion=model.fecha_creacion
        )

    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        # Buscamos la instancia del usuario creador
        usuario_db = UsuarioModel.objects.get(id=convocatoria.id_usuario_creador)
        
        # Creamos el registro en BD
        modelo = ConvocatoriaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=convocatoria.titulo,
            descripcion=convocatoria.descripcion,
            ubicacion=convocatoria.ubicacion,
            link_whatsapp=convocatoria.link_whatsapp,
            fecha_inicio=convocatoria.fecha_inicio,
            fecha_fin=convocatoria.fecha_fin,
            cupos_disponibles=convocatoria.cupos_disponibles,
            estado=convocatoria.estado,
            habilidades_requeridas=convocatoria.habilidades_requeridas,
            categorias=convocatoria.categorias, 
            horario=convocatoria.horario        
        )
        return self._to_domain(modelo)

    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except ConvocatoriaModel.DoesNotExist:
            return None

    def listar_todas(self) -> List[Convocatoria]:
        modelos = ConvocatoriaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in modelos]

    # --- 🔥 NUEVOS MÉTODOS AÑADIDOS PARA COMPLETAR LA ARQUITECTURA 🔥 ---

    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        """
        Actualiza una convocatoria existente campo por campo.
        """
        modelo = ConvocatoriaModel.objects.get(id=id)
        
        # Iteramos sobre los datos recibidos y actualizamos el modelo si el campo existe
        for key, value in datos.items():
            if hasattr(modelo, key):
                setattr(modelo, key, value)
        
        modelo.save()
        return self._to_domain(modelo)

    def eliminar(self, id: int):
        """
        Elimina físicamente el registro de la BD.
        """
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            modelo.delete()
        except ConvocatoriaModel.DoesNotExist:
            pass # Si no existe, no hacemos nada (idempotencia)