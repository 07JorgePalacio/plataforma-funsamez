"""
Excepciones específicas del dominio Usuario
"""

class EmailDuplicadoError(ValueError):
    """
    Se lanza cuando se intenta registrar un email que ya existe.
    
    Uso en Use Case:
        if self.repository.existe_email(email):
            raise EmailDuplicadoError(email)
    
    Captura en View:
        except EmailDuplicadoError as e:
            return Response({"error": str(e)}, status=400)
    """
    def __init__(self, email: str):
        super().__init__(f"El email '{email}' ya está registrado")
        self.email = email


class UsuarioMenorDeEdadError(ValueError):
    """Se lanza cuando el usuario es menor de 18 años"""
    def __init__(self, edad: int):
        super().__init__(f"Debes ser mayor de 18 años. Edad: {edad}")
        self.edad = edad


class UsuarioNoEncontradoError(ValueError):
    """Se lanza cuando no se encuentra un usuario"""
    def __init__(self, identificador: str):
        super().__init__(f"Usuario no encontrado: {identificador}")
        self.identificador = identificador


class CredencialesInvalidasError(ValueError):
    """Se lanza en login cuando email/password son incorrectos"""
    def __init__(self):
        super().__init__("Email o contraseña incorrectos")


class UsuarioInactivoError(ValueError):
    """Se lanza cuando un usuario inactivo intenta iniciar sesión"""
    def __init__(self):
        super().__init__("El usuario está inactivo")


class FormatoEmailInvalidoError(ValueError):
    """Se lanza cuando el email no cumple con el formato estándar"""
    def __init__(self, email: str):
        super().__init__(f"El formato del correo electrónico '{email}' no es válido.")
        self.email = email