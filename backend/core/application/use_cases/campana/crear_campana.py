from datetime import date, datetime
from typing import List
from core.domain.entities.campana import Campana
from core.domain.services.campana_service import CampanaService
from core.domain.exceptions.campana_exceptions import (
    FechasIncoherentesError,
    FechaEnPasadoError,
    MontoNegativoError
)

class CrearCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def execute(self, 
                 # 1. Info Básica
                 titulo: str, descripcion: str, 
                 # 2. Tiempos
                 fecha_inicio: datetime, fecha_fin: date,
                 # 3. Identificación
                 id_usuario: int, 
                 # 4. Financiero
                 monto_objetivo: int, permite_monetaria: bool, permite_especie: bool,
                 # 5. Opcionales (Imagen)
                 imagen_url: str = "",
                 # 6. Listas / JSON
                 objetivos: List[str] = None,
                 galeria: List[str] = None,
                 necesidades: List[str] = None,
                 categoria: List[str] = None, 
                 tipo_impacto: List[str] = None) -> Campana:
        
        # Validación de Negocio orquestada por el Service
        inicio_date = fecha_inicio.date() if isinstance(fecha_inicio, datetime) else fecha_inicio
        
        # 1. Validar inicio en el pasado
        if not CampanaService.validar_fecha_no_pasada(inicio_date):
            raise FechaEnPasadoError(inicio_date)

        # 2. Validar fechas lógicas
        if fecha_fin and not CampanaService.validar_fechas_coherentes(inicio_date, fecha_fin):
            raise FechasIncoherentesError()

        # 3. Validar Montos
        if not CampanaService.validar_monto_no_negativo(monto_objetivo):
            raise MontoNegativoError(monto_objetivo)
        
        # 4. Creación (Orden de campos idéntico al de models.py)
        nueva_campana = Campana(
            # --- 1. Identificación ---
            id_usuario_creador=id_usuario,
            # --- 2. Información Básica ---
            titulo=titulo,
            descripcion=descripcion,
            imagen_url=imagen_url,
            # --- 3. Tiempos ---
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            # --- 4. Financiero ---
            monto_objetivo=monto_objetivo,
            permite_donacion_monetaria=permite_monetaria,
            permite_donacion_especie=permite_especie,
            # --- 5. Listas / JSON ---
            objetivos=objetivos or [],
            galeria_imagenes=galeria or [],
            necesidades=necesidades or [],
            categoria=categoria or [],
            tipo_impacto=tipo_impacto or [],
        )
        
        return self.repository.crear(nueva_campana)