import hashlib
from typing import List, Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository

class RegisterUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, nombre_completo: str, email: str, password: str, 
                tipo_documento: str,  # <--- NUEVO ARGUMENTO OBLIGATORIO
                numero_identificacion: str, # <--- NUEVO ARGUMENTO OBLIGATORIO
                telefono: Optional[str] = None, direccion: Optional[str] = None,
                fecha_nacimiento: Optional[str] = None, 
                profesion: Optional[str] = None, intereses: List[str] = None, 
                habilidades: List[str] = None) -> User:
        
        # 1. Verificar si el CORREO ya existe
        if self.user_repository.get_by_email(email):
            raise ValueError("El correo electrónico ya está registrado")

        # 2. Hashear contraseña
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # 3. Crear Entidad
        new_user = User(
            nombre_completo=nombre_completo,
            correo_electronico=email,
            contrasena_hash=hashed_password,
            numero_telefono=telefono,
            direccion=direccion,
            rol="voluntario",
            
            # Nuevos campos
            fecha_nacimiento=fecha_nacimiento,
            tipo_documento=tipo_documento,       # <--- ASIGNAMOS AQUÍ
            numero_identificacion=numero_identificacion,
            profesion=profesion,
            intereses=intereses or [],
            habilidades=habilidades or []
        )

        # 4. Guardar
        return self.user_repository.save(new_user)