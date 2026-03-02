from abc import ABC, abstractmethod

class EmailService(ABC):
    """
    Puerto de Salida (Interface) para el envío de correos electrónicos.
    Garantiza el desacople de la infraestructura.
    """
    @abstractmethod
    def enviar_correo(self, destinatario: str, asunto: str, cuerpo: str) -> bool:
        pass