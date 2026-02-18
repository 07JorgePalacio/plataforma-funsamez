from typing import List, Optional
from core.domain.entities.campana import Campana
from core.infrastructure.persistence.django.models import CampanaModel, UsuarioModel

class PostgresCampanaRepository:
    
    def _to_domain(self, model: CampanaModel) -> Campana:
        return Campana(
            # 1. Identificación
            id=model.id,
            id_usuario_creador=model.usuario_creador.id,
            # 2. Info Básica
            titulo=model.titulo,
            descripcion=model.descripcion,
            imagen_url=model.imagen_url or "",
            # 3. Tiempos y Estado
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            fecha_actualizacion=model.fecha_actualizacion,
            # 4. Financiero
            monto_objetivo=model.monto_objetivo or 0,
            recaudo_actual=model.recaudo_actual or 0,
            permite_donacion_monetaria=model.permite_donacion_monetaria,
            permite_donacion_especie=model.permite_donacion_especie,
            # 5. Listas JSON
            objetivos=model.objetivos or [],
            galeria_imagenes=model.galeria_imagenes or [],
            necesidades=model.necesidades or [],
            categoria=model.categoria or [],       
            tipo_impacto=model.tipo_impacto or []
        )

    def crear(self, campana: Campana) -> Campana:
        usuario_db = UsuarioModel.objects.get(id=campana.id_usuario_creador)
        
        modelo = CampanaModel.objects.create(
            usuario_creador=usuario_db,
            titulo=campana.titulo,
            descripcion=campana.descripcion,
            imagen_url=campana.imagen_url,
            fecha_inicio=campana.fecha_inicio,
            fecha_fin=campana.fecha_fin,
            estado=campana.estado,
            monto_objetivo=campana.monto_objetivo,
            recaudo_actual=campana.recaudo_actual,
            permite_donacion_monetaria=campana.permite_donacion_monetaria,
            permite_donacion_especie=campana.permite_donacion_especie,
            # JSONField
            objetivos=campana.objetivos,
            galeria_imagenes=campana.galeria_imagenes,
            necesidades=campana.necesidades,
            categoria=campana.categoria,
            tipo_impacto=campana.tipo_impacto, 
        )
        return self._to_domain(modelo)

    def actualizar(self, id: int, datos: dict) -> Campana:
        """
        Actualiza campaña con blindaje explícito para campos complejos.
        """
        try:
            modelo = CampanaModel.objects.get(id=id)
            
            # 1. Actualización Explícita (Blindaje)
            # Booleanos
            if 'permite_donacion_monetaria' in datos: 
                modelo.permite_donacion_monetaria = datos['permite_donacion_monetaria']
            if 'permite_donacion_especie' in datos: 
                modelo.permite_donacion_especie = datos['permite_donacion_especie']
            
            # Listas JSON
            if 'objetivos' in datos: modelo.objetivos = datos['objetivos']
            if 'galeria_imagenes' in datos: modelo.galeria_imagenes = datos['galeria_imagenes']
            if 'necesidades' in datos: modelo.necesidades = datos['necesidades']
            if 'categoria' in datos: modelo.categoria = datos['categoria']
            if 'tipo_impacto' in datos: modelo.tipo_impacto = datos['tipo_impacto']

            # 2. Actualización Genérica para el resto (titulo, descripcion, fechas, montos)
            campos_especiales = [
                'permite_donacion_monetaria', 'permite_donacion_especie',
                'objetivos', 'galeria_imagenes', 'necesidades', 'categoria', 'tipo_impacto'
            ]
            
            for key, value in datos.items():
                if key not in campos_especiales and hasattr(modelo, key):
                    setattr(modelo, key, value)
            
            modelo.save()
            modelo.refresh_from_db()
            return self._to_domain(modelo)

        except CampanaModel.DoesNotExist:
            raise ValueError(f"No existe la campaña {id}")
    
    def obtener_todas(self) -> List[Campana]:
        qs = CampanaModel.objects.all().order_by('-fecha_creacion')
        return [self._to_domain(m) for m in qs]

    def eliminar(self, id: int):
        try:
            modelo = CampanaModel.objects.get(id=id)
            modelo.delete()
        except CampanaModel.DoesNotExist:
            pass