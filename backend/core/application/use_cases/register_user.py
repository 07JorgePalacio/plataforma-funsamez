import bcrypt
from src.domain.entities import Usuario
from src.application.ports.output.user_repository import UserRepository

class RegistrarUsuarioUseCase:
    
    def __init__(self, repositorio: UserRepository):
        # Inyección de Dependencias: Recibimos el repositorio, no lo instanciamos aquí.
        self.repositorio = repositorio

    def ejecutar(self, nombre: str, email: str, contrasena: str) -> Usuario:
        # 1. Regla de Negocio: El correo no debe repetirse
        if self.repositorio.buscar_por_email(email):
            raise ValueError("El correo electrónico ya está registrado.")

        # 2. Seguridad: Encriptar la contraseña
        salt = bcrypt.gensalt()
        bytes_contrasena = contrasena.encode('utf-8')
        hash_contrasena = bcrypt.hashpw(bytes_contrasena, salt)

        # 3. Crear la Entidad (Dominio)
        nuevo_usuario = Usuario(
            id=None,  # La BD le pondrá ID después
            nombre_completo=nombre,
            correo_electronico=email,
            contrasena_hash=hash_contrasena.decode('utf-8'),
            estado='pendiente_activacion' # Según tu HU05, nace pendiente
        )

        # 4. Persistir
        return self.repositorio.guardar(nuevo_usuario)