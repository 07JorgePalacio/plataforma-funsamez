from datetime import datetime
from core.domain.entities.convocatoria import Convocatoria
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository

class CrearConvocatoriaUseCase:
    
    def __init__(self, repository: ConvocatoriaRepository):
        self.repository = repository

    def ejecutar(self, titulo: str, descripcion: str, fecha_inicio: datetime, 
                 fecha_fin: datetime, cupos: int, id_usuario: int, habilidades: str) -> Convocatoria:
        
        # 1. Validaciones de Negocio (Ejemplo simple)
        if fecha_inicio >= fecha_fin:
            raise ValueError("La fecha de inicio debe ser anterior a la fecha de fin.")
            
        if cupos <= 0:
            raise ValueError("Debe haber al menos 1 cupo disponible.")

        # 2. Crear la Entidad
        nueva_convocatoria = Convocatoria(
            id=None, # Se genera en BD
            titulo=titulo,
            descripcion=descripcion,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            cupos_disponibles=cupos,
            id_usuario_creador=id_usuario,
            habilidades_requeridas=habilidades
        )

        # 3. Persistir usando el Puerto
        return self.repository.crear(nueva_convocatoria)