from django.contrib.auth.hashers import check_password, make_password
from core.application.ports.output.password_hasher import PasswordHasher

class DjangoPasswordHasher(PasswordHasher):
    def hash(self, password: str) -> str:
        return make_password(password)

    def verify(self, password: str, hashed_password: str) -> bool:
        return check_password(password, hashed_password)