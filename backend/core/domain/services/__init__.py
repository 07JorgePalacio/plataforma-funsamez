"""
Services de Dominio - Lógica de negocio PURA (sin BD)
"""
from .user_service import UserService
from .campana_service import CampanaService
from .convocatoria_service import ConvocatoriaService
from .postulacion_service import PostulacionService

__all__ = [
    'UserService',
    'CampanaService',
    'ConvocatoriaService',
    'PostulacionService',
]