from datetime import datetime
from core.domain.entities.postulacion import Postulacion
from core.domain.exceptions.postulacion_exceptions import (
    PostulacionDuplicadaError,
    EstadoPostulacionInvalidoError
)
from core.domain.exceptions.convocatoria_exceptions import ConvocatoriaNoEncontradaError
from core.domain.services.convocatoria_service import ConvocatoriaService

class PostularVoluntarioUseCase:
    """
    Caso de Uso: Permite a un voluntario postularse a una convocatoria.
    Aplica las reglas de negocio de la HU09.
    """
    
    def __init__(self, postulacion_repository, convocatoria_repository, user_repository):
        # Inyectamos repositorios necesarios
        self.postulacion_repo = postulacion_repository
        self.convocatoria_repo = convocatoria_repository
        self.user_repo = user_repository

    def execute(self, id_usuario: int, id_convocatoria: int, observaciones: str = "") -> Postulacion:
        # Regla 1: Validar que la convocatoria exista y esté disponible
        convocatoria = self.convocatoria_repo.obtener_por_id(id_convocatoria)
        if not convocatoria:
            raise ConvocatoriaNoEncontradaError(id_convocatoria)
        
        if convocatoria.estado not in ['publicada', 'abierta']:
            raise EstadoPostulacionInvalidoError("Esta convocatoria no está disponible actualmente para postulaciones.")
        
        # Regla 2: Validar que el voluntario no esté postulado ya
        postulacion_existente = self.postulacion_repo.obtener_por_usuario_y_convocatoria(id_usuario, id_convocatoria)
        if postulacion_existente:
            raise PostulacionDuplicadaError(id_usuario, id_convocatoria)
            
        # Regla 3: Extraer usuario y calcular Nivel de Compatibilidad (Smart Match)
        usuario = self.user_repo.obtener_por_id(id_usuario)
        if not usuario:
            raise ValueError("El usuario no existe.") # TODO: Mover a UsuarioNoEncontradoError en el Módulo 4
        
        # Delegamos la lógica matemática pura al Service de Convocatoria (Reutilización de Dominio)
        match_data = ConvocatoriaService.calcular_match_score(convocatoria, usuario)
        match_hab = match_data["habilidades"]
        match_disp = match_data["disponibilidad"]
                
        # Armar el JSON del historial de estados
        historial_inicial = [{
            "estado": "en_revision",
            "fecha": datetime.now().isoformat(),
            "actor": f"usuario_{id_usuario}"
        }]

        # Crear Entidad Pura (Dominio)
        nueva_postulacion = Postulacion(
            # --- 1. Identificación ---
            id_usuario=id_usuario,
            id_convocatoria=id_convocatoria,
            
            # --- 2. Información Básica ---
            observaciones=observaciones,
            match_habilidades=match_hab,
            match_disponibilidad=match_disp,
            
            # --- 3. Logística/Configuración ---
            estado="en_revision",
            
            # --- 5. Listas y JSON ---
            historial_estados=historial_inicial
        )

        # Persistir a través del Puerto de Salida (Repositorio)
        return self.postulacion_repo.crear(nueva_postulacion)