from datetime import datetime
from core.domain.entities.postulacion import Postulacion

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
            raise ValueError("La convocatoria a la que intentas postularte no existe.")
        
        if convocatoria.estado not in ['publicada', 'abierta']:
            raise ValueError("Esta convocatoria no está disponible actualmente para postulaciones.")
        
        # Regla 2: Validar que el voluntario no esté postulado ya [cite: 1056]
        postulacion_existente = self.postulacion_repo.obtener_por_usuario_y_convocatoria(id_usuario, id_convocatoria)
        if postulacion_existente:
            raise ValueError("Ya te encuentras postulado a esta convocatoria.")
            
        # Regla 3: Extraer usuario y calcular Nivel de Compatibilidad (Smart Match)
        usuario = self.user_repo.obtener_por_id(id_usuario)
        if not usuario:
            raise ValueError("El usuario no existe.")

        habilidades_req = convocatoria.habilidades_requeridas or ""
        habilidades_req_list = [h.strip().lower() for h in habilidades_req.split(",") if h.strip()]
        
        habilidades_user = [h.lower() for h in usuario.habilidades] if usuario.habilidades else []
        
        if not habilidades_req_list:
            match_hab = 100
        else:
            coincidencias = sum(1 for req in habilidades_req_list if any(req in hab or hab in req for hab in habilidades_user))
            match_hab = int((coincidencias / len(habilidades_req_list)) * 100)
            if match_hab > 100: match_hab = 100

        horario_req = convocatoria.horario or {}
        disp_user = usuario.disponibilidad or {}
        
        match_disp = True
        if horario_req:
            match_disp = False
            for dia, turnos_req in horario_req.items():
                turnos_user = disp_user.get(dia, [])
                if turnos_user and any(turno in turnos_user for turno in turnos_req):
                    match_disp = True
                    break
                
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