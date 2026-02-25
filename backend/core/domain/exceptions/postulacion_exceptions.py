"""
Excepciones específicas del dominio Postulación
"""

class PostulacionDuplicadaError(ValueError):
    """Se lanza cuando el usuario ya se postuló"""
    def __init__(self, id_usuario: int, id_convocatoria: int):
        super().__init__(
            f"Ya existe una postulación del usuario {id_usuario} "
            f"a la convocatoria {id_convocatoria}"
        )
        self.id_usuario = id_usuario
        self.id_convocatoria = id_convocatoria


class PostulacionNoEncontradaError(ValueError):
    """Se lanza cuando no se encuentra una postulación"""
    def __init__(self, id_postulacion: int):
        super().__init__(f"Postulación no encontrada: ID {id_postulacion}")
        self.id_postulacion = id_postulacion


class PostulacionNoCancelableError(ValueError):
    """Se lanza cuando no se puede cancelar la postulación"""
    def __init__(self, motivo: str):
        super().__init__(f"No puedes cancelar esta postulación: {motivo}")
        self.motivo = motivo