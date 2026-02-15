from typing import List, Optional
from core.domain.entities.campana import Campana
from core.infrastructure.persistence.django.models import CampanaModel, UsuarioModel

class PostgresCampanaRepository:
    
    def _to_domain(self, model: CampanaModel) -> Campana:
        return Campana(
            id=model.id,
            titulo=model.titulo,
            descripcion=model.descripcion,
            fecha_fin=model.fecha_fin,
            id_usuario_creador=model.usuario_creador.id,
            monto_objetivo=model.monto_objetivo,
            permite_donacion_monetaria=model.permite_donacion_monetaria,
            permite_donacion_especie=model.permite_donacion_especie,
            categoria=model.categoria or "General",
            tipo_impacto=model.tipo_impacto or "Social",
            recaudo_actual=model.recaudo_actual,
            imagen_url=model.imagen_url or "",
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            # 🔥 Mapeo de listas JSON
            objetivos=model.objetivos or [],
            galeria_imagenes=model.galeria_imagenes or []
        )

    def crear(self, campana: Campana) -> Campana:
        # Obtenemos la instancia del usuario creador
        usuario_db = UsuarioModel.objects.get(id=campana.id_usuario_creador)
        
        modelo = CampanaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=campana.titulo,
            descripcion=campana.descripcion,
            fecha_fin=campana.fecha_fin,
            monto_objetivo=campana.monto_objetivo,
            permite_donacion_monetaria=campana.permite_donacion_monetaria,
            permite_donacion_especie=campana.permite_donacion_especie,
            categoria=campana.categoria,
            tipo_impacto=campana.tipo_impacto,
            recaudo_actual=campana.recaudo_actual,
            imagen_url=campana.imagen_url,
            estado=campana.estado,
            # 🔥 Django guarda listas automáticamente en JSONField
            objetivos=campana.objetivos,
            galeria_imagenes=campana.galeria_imagenes
        )
        return self._to_domain(modelo)

    def obtener_todas(self) -> List[Campana]:
        qs = CampanaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in qs]