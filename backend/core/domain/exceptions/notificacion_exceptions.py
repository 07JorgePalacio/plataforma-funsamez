"""
Excepciones específicas del dominio Notificación
"""

class NotificacionNoEncontradaError(ValueError):
    """Se lanza cuando se intenta operar sobre una notificación que no existe o no pertenece al usuario"""
    def __init__(self, id_notificacion: int):
        super().__init__(f"La notificación con ID {id_notificacion} no existe o no pudo ser actualizada.")
        self.id_notificacion = id_notificacion