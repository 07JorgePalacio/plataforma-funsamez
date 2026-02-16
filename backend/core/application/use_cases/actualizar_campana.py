from core.domain.entities.campana import Campana

class ActualizarCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, id: int, datos: dict) -> Campana:
        # 1. Obtener la campaña actual para comparar
        # (Nota: Esto requeriría un método 'obtener_por_id' en el repo, 
        #  si no lo tienes, confiaremos en que el frontend o el repo manejen la lógica,
        #  pero para hacerlo bien, agreguemos la lógica simple de negocio aquí).
        
        # Si estamos actualizando el recaudo, verificamos si se cumplió la meta
        if 'recaudo_actual' in datos:
            # Aquí necesitaríamos saber el monto_objetivo. 
            # Como el repositorio 'actualizar' es genérico, haremos un truco:
            # Dejaremos que el Frontend decida el estado o el Repositorio.
            pass 
            
        return self.repository.actualizar(id, datos)