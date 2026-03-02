import threading
from django.core.mail import send_mail
from django.conf import settings
from core.application.ports.output.email_service import EmailService

class DjangoEmailService(EmailService):
    """
    Adaptador de Infraestructura que implementa el envío de correos 
    usando la utilidad nativa de Django (SMTP) mediante hilos (Threads) 
    para evitar bloquear la respuesta HTTP.
    """
    def _enviar_en_segundo_plano(self, destinatario: str, asunto: str, cuerpo: str):
        try:
            send_mail(
                subject=asunto,
                message=cuerpo,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[destinatario],
                fail_silently=False,
            )
            print(f"✅ Correo enviado exitosamente a {destinatario} (Segundo plano)")
        except Exception as e:
            print(f"❌ Error al enviar correo a {destinatario}: {e}")

    def enviar_correo(self, destinatario: str, asunto: str, cuerpo: str) -> bool:
        hilo = threading.Thread(
            target=self._enviar_en_segundo_plano, 
            args=(destinatario, asunto, cuerpo)
        )
        hilo.start()
        return True