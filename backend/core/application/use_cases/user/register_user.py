from typing import List, Optional
from core.domain.entities.user import User
from core.application.ports.output.user_repository import UserRepository
from core.application.ports.output.password_hasher import PasswordHasher
from core.domain.services.user_service import UserService
from core.domain.exceptions.user_exceptions import (
    EmailDuplicadoError,
    UsuarioMenorDeEdadError
)

class RegisterUser:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, 
                nombre_completo: str, 
                email: str, 
                password: str, 
                tipo_documento: str,
                numero_identificacion: str, 
                telefono: Optional[str] = None, 
                direccion: Optional[str] = None,
                fecha_nacimiento: Optional[str] = None, 
                profesion: Optional[str] = None, 
                intereses: List[str] = None, 
                habilidades: List[str] = None,
                disponibilidad: dict = None  
                ) -> User:
        
        # =============
        # VALIDACIONES 
        # =============

        # 1. Validar formato de email usando el Service (Regla Pura)
        if not UserService.validar_formato_email(email):
            raise ValueError("El formato del correo electrónico no es válido.")

        # 2. Verificar si el CORREO ya existe en BD (Lanza Exception específica)
        if self.user_repository.get_by_email(email):
            raise EmailDuplicadoError(email)

        # 3. Validar edad si se proporcionó fecha de nacimiento (Lanza Exception específica)
        if fecha_nacimiento:
            if not UserService.es_mayor_de_edad(fecha_nacimiento):
                edad = UserService.calcular_edad(fecha_nacimiento)
                raise UsuarioMenorDeEdadError(edad)

        # 4. Hashear contraseña delegando al puerto de salida (Infraestructura)
        hashed_password = self.password_hasher.hash(password)

        # 5. Crear Entidad
        new_user = User(
            nombre_completo=nombre_completo,
            correo_electronico=email,
            contrasena_hash=hashed_password,
            numero_telefono=telefono,
            direccion=direccion,
            rol="voluntario",
            
            # Campos de perfil
            fecha_nacimiento=fecha_nacimiento,
            tipo_documento=tipo_documento,       
            numero_identificacion=numero_identificacion,
            profesion=profesion,
            intereses=intereses or [],
            habilidades=habilidades or [],
            disponibilidad=disponibilidad or {} 
        )

        # 6. Guardar
        return self.user_repository.save(new_user)