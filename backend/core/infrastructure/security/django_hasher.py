from django.contrib.auth.hashers import check_password
from core.application.ports.output.password_hasher import PasswordHasher

class DjangoPasswordHasher(PasswordHasher):
    def verify(self, password: str, hashed_password: str) -> bool:
        return check_password(password, hashed_password)