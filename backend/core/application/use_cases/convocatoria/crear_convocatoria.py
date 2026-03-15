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
                 # Datos Obligatorios
                 titulo: str, descripcion: str, 
                 fecha_inicio: datetime, fecha_fin: datetime, 
                 cupos: int, id_usuario: int, habilidades: str,
                 # Datos Opcionales (Defaults)
                 ubicacion: str = "", 
                 link_google_maps: str = "",
                 link_whatsapp: str = "",
                 modalidad: str = "presencial", 
                 beneficios: List[str] = None,  
                 categorias: List[str] = None, 
                 horario: Dict[str, Any] = None) -> Convocatoria:
        
        # Validaciones de Negocio delegadas al Service
        if not ConvocatoriaService.validar_periodo(fecha_inicio, fecha_fin):
            raise FechaConvocatoriaInvalidaError()
            
        if not ConvocatoriaService.validar_cupos(cupos):
            raise CuposInvalidosError(cupos)

        # Crear Entidad (Alineado jerárquicamente con la Base de Datos)
        nueva_convocatoria = Convocatoria(
            # --- Identificación ---
            id_usuario_creador=id_usuario,
            # --- Info Básica ---
            titulo=titulo,
            descripcion=descripcion,
            ubicacion=ubicacion,
            link_google_maps=link_google_maps,
            link_whatsapp=link_whatsapp,
            modalidad=modalidad, 
            # --- Tiempos y Estado ---
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            # --- Cupos ---
            cupos_disponibles=cupos,
            # --- Requisitos y Detalles (Listas/JSON) ---
            habilidades_requeridas=habilidades,
            categorias=categorias or [],
            horario=horario or {},
            beneficios=beneficios or [] 
        )

        return self.repository.crear(nueva_convocatoria)