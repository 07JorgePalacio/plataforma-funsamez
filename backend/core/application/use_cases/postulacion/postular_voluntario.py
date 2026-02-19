from datetime import datetime
from core.domain.entities.postulacion import Postulacion

class PostularVoluntarioUseCase:
    """
    Caso de Uso: Permite a un voluntario postularse a una convocatoria.
    Aplica las reglas de negocio de la HU09.
    """
    
    def __init__(self, postulacion_repository, convocatoria_repository):
        # Inyectamos ambos repositorios porque necesitamos verificar la convocatoria
        self.postulacion_repo = postulacion_repository
        self.convocatoria_repo = convocatoria_repository

    def execute(self, id_usuario: int, id_convocatoria: int, observaciones: str = "") -> Postulacion:
        # Regla 1: Validar que la convocatoria exista y esté disponible
        convocatoria = self.convocatoria_repo.obtener_por_id(id_convocatoria)
        if not convocatoria:
            raise ValueError("La convocatoria a la que intentas postularte no existe.")
        
        if convocatoria.estado not in ['publicada', 'abierta']:
            raise ValueError("Esta convocatoria no está disponible actualmente para postulaciones.")
        
        # Regla 2: Validar que el voluntario no esté postulado ya [cite: 1056]
        postulacion_existente = self.postulacion_repo.obtener_por_usuario_y_convocatoria(id_usuario, id_convocatoria)
        if postulacion_existente:
            raise ValueError("Ya te encuentras postulado a esta convocatoria.")
            
        # Regla 3: (Opcional) Si en el futuro quieres validar que el perfil esté completo 
        # antes de postularse[cite: 1055], inyectarías el user_repository y harías el chequeo aquí.

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
            
            # --- 3. Logística/Configuración ---
            estado="en_revision",
            
            # --- 5. Listas y JSON ---
            historial_estados=historial_inicial
        )

        # Persistir a través del Puerto de Salida (Repositorio)
        return self.postulacion_repo.crear(nueva_postulacion)