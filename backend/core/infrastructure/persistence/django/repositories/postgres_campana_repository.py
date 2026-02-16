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
            fecha_inicio=model.fecha_inicio,
            id_usuario_creador=model.usuario_creador.id,
            monto_objetivo=model.monto_objetivo,
            permite_donacion_monetaria=model.permite_donacion_monetaria,
            permite_donacion_especie=model.permite_donacion_especie,
            recaudo_actual=model.recaudo_actual,
            imagen_url=model.imagen_url or "",
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            fecha_actualizacion=model.fecha_actualizacion,
            # 🔥 Mapeo de listas JSON
            objetivos=model.objetivos or [],
            galeria_imagenes=model.galeria_imagenes or [],
            necesidades=model.necesidades or [],
            categoria=model.categoria or [],       
            tipo_impacto=model.tipo_impacto or []
        )

    def crear(self, campana: Campana) -> Campana:
        # Obtenemos la instancia del usuario creador
        usuario_db = UsuarioModel.objects.get(id=campana.id_usuario_creador)
        
        modelo = CampanaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=campana.titulo,
            descripcion=campana.descripcion,
            fecha_fin=campana.fecha_fin,
            fecha_inicio=campana.fecha_inicio,
            monto_objetivo=campana.monto_objetivo,
            permite_donacion_monetaria=campana.permite_donacion_monetaria,
            permite_donacion_especie=campana.permite_donacion_especie,
            recaudo_actual=campana.recaudo_actual,
            imagen_url=campana.imagen_url,
            estado=campana.estado,
            # 🔥 Django guarda listas automáticamente en JSONField
            objetivos=campana.objetivos,
            galeria_imagenes=campana.galeria_imagenes,
            necesidades=campana.necesidades,
            categoria=campana.categoria,
            tipo_impacto=campana.tipo_impacto, 
        )
        return self._to_domain(modelo)

    def obtener_todas(self) -> List[Campana]:
        qs = CampanaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in qs]
    
    def actualizar(self, id: int, datos: dict) -> Campana:
        modelo = CampanaModel.objects.get(id=id)
        # Actualizamos campo por campo si viene en los datos
        for key, value in datos.items():
            if hasattr(modelo, key):
                setattr(modelo, key, value)
        modelo.save()
        return self._to_domain(modelo)  

    def eliminar(self, id: int):
        try:
            modelo = CampanaModel.objects.get(id=id)
            modelo.delete()
        except CampanaModel.DoesNotExist:
            pass # Opcional: lanzar error si no existe