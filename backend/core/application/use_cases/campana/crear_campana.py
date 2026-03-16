from datetime import date, datetime
from typing import List
from core.domain.entities.campana import Campana
from core.domain.services.campana_service import CampanaService
from core.domain.exceptions.campana_exceptions import (
    FechasIncoherentesError,
    FechaEnPasadoError,
    MontoNegativoError
)
from core.application.ports.output.campana_repository import CampanaRepository

class CrearCampanaUseCase:
    def __init__(self, repository: CampanaRepository):
        self.repository = repository

    def execute(self, 
                 # --- PARÁMETROS OBLIGATORIOS (Sin default) ---
                 id_usuario: int, 
                 titulo: str, 
                 descripcion: str, 
                 fecha_inicio: date, 
                 fecha_fin: date,
                 monto_objetivo: int, 
                 permite_donacion_monetaria: bool, 
                 permite_donacion_especie: bool,
                 # --- PARÁMETROS OPCIONALES (Con default) ---
                 imagen_url: str = "",
                 objetivos: List[str] = None,
                 galeria_imagenes: List[str] = None,
                 video_urls: List[str] = None,
                 necesidades: List[str] = None,
                 categoria: List[str] = None, 
                 tipo_impacto: List[str] = None) -> Campana:
        
        # Validación de Negocio orquestada por el Service
        
        # 1. Validar inicio en el pasado
        if not CampanaService.validar_fecha_no_pasada(fecha_inicio):
            raise FechaEnPasadoError(fecha_inicio)

        # 2. Validar fechas lógicas
        if fecha_fin and not CampanaService.validar_fechas_coherentes(fecha_inicio, fecha_fin):
            raise FechasIncoherentesError()

        # 3. Validar Montos
        if not CampanaService.validar_monto_no_negativo(monto_objetivo):
            raise MontoNegativoError(monto_objetivo)
        
        # 4. Creación (Orden Maestro)
        nueva_campana = Campana(
            id_usuario_creador=id_usuario,
            titulo=titulo,
            descripcion=descripcion,
            imagen_url=imagen_url,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            estado="activa",
            monto_objetivo=monto_objetivo,
            recaudo_actual=0,
            permite_donacion_monetaria=permite_donacion_monetaria,
            permite_donacion_especie=permite_donacion_especie,
            objetivos=objetivos or [],
            galeria_imagenes=galeria_imagenes or [],
            video_urls=video_urls or [],
            necesidades=necesidades or [],
            categoria=categoria or [],
            tipo_impacto=tipo_impacto or [],
        )
        
        return self.repository.crear(nueva_campana)