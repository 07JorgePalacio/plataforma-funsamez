"""
Excepciones específicas del dominio Convocatoria
"""

class ConvocatoriaNoEncontradaError(ValueError):
    """Se lanza cuando no se encuentra una convocatoria"""
    def __init__(self, id_convocatoria: int):
        super().__init__(
            f"Convocatoria no encontrada: ID {id_convocatoria}"
        )
        self.id_convocatoria = id_convocatoria


class CuposAgotadosError(ValueError):
    """Se lanza cuando no quedan cupos disponibles"""
    def __init__(self, id_convocatoria: int):
        super().__init__(
            f"La convocatoria {id_convocatoria} no tiene cupos disponibles"
        )
        self.id_convocatoria = id_convocatoria


class ConvocatoriaCerradaError(ValueError):
    """Se lanza cuando se intenta postular a una convocatoria cerrada"""
    def __init__(self, id_convocatoria: int, estado: str):
        super().__init__(
            f"La convocatoria {id_convocatoria} está '{estado}' "
            f"y no acepta postulaciones"
        )
        self.id_convocatoria = id_convocatoria
        self.estado = estado


class HorarioIncompatibleError(ValueError):
    """Se lanza cuando la disponibilidad del usuario no coincide"""
    def __init__(self):
        super().__init__(
            "Tu disponibilidad horaria no coincide con la convocatoria"
        )


class FechaConvocatoriaInvalidaError(ValueError):
    """Se lanza cuando la fecha de inicio no es estrictamente anterior a la de fin"""
    def __init__(self):
        super().__init__(
            "La fecha de inicio debe ser anterior a la fecha de fin."
        )


class CuposInvalidosError(ValueError):
    """Se lanza cuando se define una cantidad de cupos menor o igual a cero"""
    def __init__(self, cupos: int):
        super().__init__(
            f"Debe haber al menos 1 cupo disponible. Recibido: {cupos}"
        )
        self.cupos = cupos