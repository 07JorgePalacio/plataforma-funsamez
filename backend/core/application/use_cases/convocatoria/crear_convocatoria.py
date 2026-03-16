from datetime import datetime
from typing import List, Dict, Any
from core.domain.entities.convocatoria import Convocatoria
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.services.convocatoria_service import ConvocatoriaService
from core.domain.exceptions.convocatoria_exceptions import (
    FechaConvocatoriaInvalidaError,
    CuposInvalidosError
)

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def execute(self, 
                 # --- PARÁMETROS OBLIGATORIOS (Sin default) ---
                 id_usuario: int, 
                 titulo: str, 
                 fecha_inicio: datetime, 
                 fecha_fin: datetime, 
                 cupos_disponibles: int, 
                 # --- PARÁMETROS OPCIONALES (Con default) ---
                 descripcion: str = "",
                 ubicacion: str = "", 
                 link_google_maps: str = "",
                 link_whatsapp: str = "",
                 modalidad: str = "presencial", 
                 habilidades_requeridas: str = "",
                 categorias: List[str] = None, 
                 horario: Dict[str, Any] = None,
                 beneficios: List[str] = None) -> Convocatoria:
        
        # Validaciones de Negocio delegadas al Service
        if not ConvocatoriaService.validar_periodo(fecha_inicio, fecha_fin):
            raise FechaConvocatoriaInvalidaError()
            
        if not ConvocatoriaService.validar_cupos(cupos_disponibles):
            raise CuposInvalidosError(cupos_disponibles)

        # Crear Entidad (Orden Maestro estricto de la BD)
        nueva_convocatoria = Convocatoria(
            id_usuario_creador=id_usuario,
            titulo=titulo,
            descripcion=descripcion,
            ubicacion=ubicacion,
            link_google_maps=link_google_maps,
            link_whatsapp=link_whatsapp,
            modalidad=modalidad, 
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos_disponibles,
            estado="abierta",
            habilidades_requeridas=habilidades_requeridas,
            categorias=categorias or [],
            horario=horario or {},
            beneficios=beneficios or [] 
        )

        return self.repository.crear(nueva_convocatoria)