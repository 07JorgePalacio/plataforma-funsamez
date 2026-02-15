from datetime import date
from typing import List
from core.domain.entities.campana import Campana

class CrearCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, titulo: str, descripcion: str, fecha_fin: date, 
                 id_usuario: int, monto_objetivo: int,
                 permite_monetaria: bool, permite_especie: bool,
                 imagen_url: str = "", categoria: str = "", tipo_impacto: str = "",
                 objetivos: List[str] = None, galeria: List[str] = None) -> Campana:
        
        # Aquí podrías validar reglas de negocio (ej: monto > 0)
        
        nueva_campana = Campana(
            titulo=titulo,
            descripcion=descripcion,
            fecha_fin=fecha_fin,
            id_usuario_creador=id_usuario,
            monto_objetivo=monto_objetivo,
            permite_donacion_monetaria=permite_monetaria,
            permite_donacion_especie=permite_especie,
            imagen_url=imagen_url,
            categoria=categoria,
            tipo_impacto=tipo_impacto,
            objetivos=objetivos or [],
            galeria_imagenes=galeria or []
        )
        
        return self.repository.crear(nueva_campana)