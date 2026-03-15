from datetime import date
"""
Excepciones específicas del dominio Campaña
"""

class CampanaNoEncontradaError(ValueError):
    """Se lanza cuando no se encuentra una campaña por ID"""
    def __init__(self, id_campana: int):
        super().__init__(f"Campaña no encontrada: ID {id_campana}")
        self.id_campana = id_campana


class FechaEnPasadoError(ValueError):
    """Se lanza cuando se intenta crear una campaña con fecha de inicio en el pasado"""
    def __init__(self, fecha: date):
        super().__init__(f"La campaña no puede iniciar en el pasado. Fecha recibida: {fecha}")
        self.fecha = fecha

class FechasIncoherentesError(ValueError):
    """Se lanza cuando fecha_fin es anterior a fecha_inicio"""
    def __init__(self):
        super().__init__(
            "La fecha de fin debe ser posterior a la fecha de inicio"
        )


class MontoNegativoError(ValueError):
    """Se lanza cuando el monto objetivo es negativo o cero"""
    def __init__(self, monto: int):
        super().__init__(
            f"El monto objetivo debe ser positivo. Recibido: ${monto:,}"
        )
        self.monto = monto


class CampanaFinalizadaError(ValueError):
    """Se lanza cuando se intenta modificar una campaña finalizada"""
    def __init__(self, id_campana: int):
        super().__init__(
            f"La campaña {id_campana} ya finalizó y no puede modificarse"
        )
        self.id_campana = id_campana