from typing import List, Optional
from core.domain.entities.convocatoria import Convocatoria
from core.domain.services.convocatoria_service import ConvocatoriaService
from core.application.ports.output.user_repository import UserRepository

class ListarConvocatoriasUseCase:
    def __init__(self, repository, user_repository: UserRepository):
        self.repository = repository
        self.user_repository = user_repository

    def execute(self, estado: str = None, usuario_id: Optional[int] = None) -> List[Convocatoria]:
        convocatorias = self.repository.listar_todas(estado=estado)
        
        # Obtener el perfil del usuario si viene un ID (Para el Match Score)
        usuario = None
        if usuario_id:
            usuario = self.user_repository.obtener_por_id(usuario_id)
        
        # Orquestación: Enriquecemos las entidades con la lógica de negocio pura
        for conv in convocatorias:
            conv.dias_para_inicio = ConvocatoriaService.calcular_dias_para_inicio(conv)
            conv.urgencia = ConvocatoriaService.clasificar_urgencia(conv)
            conv.porcentaje_cupos = ConvocatoriaService.calcular_porcentaje_cupos(conv)
            
            # Match Score Desglosado
            match_data = ConvocatoriaService.calcular_match_score(conv, usuario)
            conv.match_score = match_data["total"]
            conv.match_habilidades = match_data["habilidades"]
            conv.match_disponibilidad = match_data["disponibilidad"]
            
        return convocatorias