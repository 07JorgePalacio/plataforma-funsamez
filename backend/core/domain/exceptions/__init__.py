"""
Excepciones de Dominio - Centralizadas
Importa todas las excepciones personalizadas
"""

# User
from .user_exceptions import (
    EmailDuplicadoError,
    UsuarioMenorDeEdadError,
    UsuarioNoEncontradoError,
    CredencialesInvalidasError
)

# Campaña
from .campana_exceptions import (
    CampanaNoEncontradaError,
    FechasIncoherentesError,
    MontoNegativoError,
    CampanaFinalizadaError
)

# Convocatoria
from .convocatoria_exceptions import (
    ConvocatoriaNoEncontradaError,
    CuposAgotadosError,
    ConvocatoriaCerradaError,
    HorarioIncompatibleError
)

# Postulación
from .postulacion_exceptions import (
    PostulacionDuplicadaError,
    PostulacionNoEncontradaError,
    PostulacionNoCancelableError
)

__all__ = [
    # User
    'EmailDuplicadoError',
    'UsuarioMenorDeEdadError',
    'UsuarioNoEncontradoError',
    'CredencialesInvalidasError',
    # Campaña
    'CampanaNoEncontradaError',
    'FechasIncoherentesError',
    'MontoNegativoError',
    'CampanaFinalizadaError',
    # Convocatoria
    'ConvocatoriaNoEncontradaError',
    'CuposAgotadosError',
    'ConvocatoriaCerradaError',
    'HorarioIncompatibleError',
    # Postulación
    'PostulacionDuplicadaError',
    'PostulacionNoEncontradaError',
    'PostulacionNoCancelableError',
]