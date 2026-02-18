from datetime import datetime
from typing import List, Dict, Any
from core.domain.entities.convocatoria import Convocatoria
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def ejecutar(self, 
                 # Datos Obligatorios
                 titulo: str, descripcion: str, 
                 fecha_inicio: datetime, fecha_fin: datetime, 
                 cupos: int, id_usuario: int, habilidades: str,
                 # Datos Opcionales (Defaults)
                 ubicacion: str = "", 
                 link_whatsapp: str = "",
                 modalidad: str = "presencial", # 🟢
                 beneficios: List[str] = None,  # 🟢
                 categorias: List[str] = None, 
                 horario: Dict[str, Any] = None) -> Convocatoria:
        
        # Validaciones de Negocio
        if fecha_inicio >= fecha_fin:
            raise ValueError("La fecha de inicio debe ser anterior a la fecha de fin.")
        if cupos <= 0:
            raise ValueError("Debe haber al menos 1 cupo disponible.")

        # Crear Entidad (Siguiendo el Orden Maestro de Tanda 1)
        nueva_convocatoria = Convocatoria(
            id_usuario_creador=id_usuario,
            titulo=titulo,
            descripcion=descripcion,
            ubicacion=ubicacion,
            link_whatsapp=link_whatsapp,
            modalidad=modalidad, # 🟢
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos,
            habilidades_requeridas=habilidades,
            categorias=categorias or [],
            horario=horario or {},
            beneficios=beneficios or [] # 🟢
        )

        return self.repository.crear(nueva_convocatoria)