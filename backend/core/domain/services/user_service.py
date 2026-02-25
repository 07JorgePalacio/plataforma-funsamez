from datetime import datetime, date
from typing import List
import re

class UserService:
    """
    Servicios de dominio para Usuario.
    
    ¿Cuándo usar este service?
    - Necesitas calcular edad
    - Validar formato de email (sin verificar duplicado)
    - Lógica de habilidades/intereses
    """
    
    @staticmethod
    def calcular_edad(fecha_nacimiento) -> int:

        if not fecha_nacimiento:
            return 0
        
        # 🛡️ FIX: Manejo inteligente de tipos de datos
        if isinstance(fecha_nacimiento, datetime):
            nacimiento = fecha_nacimiento.date()
        elif isinstance(fecha_nacimiento, date):
            nacimiento = fecha_nacimiento
        else:
            try:
                # Si llega como texto, lo convertimos
                nacimiento = datetime.strptime(str(fecha_nacimiento), '%Y-%m-%d').date()
            except ValueError:
                return 0
        
        hoy = date.today()
        edad = hoy.year - nacimiento.year
        
        # Ajustar si no ha cumplido años este año
        if (hoy.month, hoy.day) < (nacimiento.month, nacimiento.day):
            edad -= 1
        
        return edad
    
    @staticmethod
    def es_mayor_de_edad(fecha_nacimiento: str) -> bool:
        """
        Verifica si el usuario es mayor de 18 años.
        
        ¿Por qué en Service y no en Use Case?
        Porque es una regla de negocio PURA que no necesita BD.
        
        Returns:
            bool: True si tiene 18+ años
        """
        return UserService.calcular_edad(fecha_nacimiento) >= 18
    
    @staticmethod
    def validar_formato_email(email: str) -> bool:
        """
        Valida que el email tenga formato correcto.
        
        NOTA: NO verifica si existe en BD (eso es del Use Case)
        
        Args:
            email: Email a validar
        
        Returns:
            bool: True si formato es válido
        """
        patron = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(patron, email))
    
    @staticmethod
    def validar_telefono_formato(telefono: str) -> bool:
        """
        Valida formato de teléfono (solo números).
        
        Args:
            telefono: Número sin código de país
        
        Returns:
            bool: True si es válido
        """
        # Solo números, 7-10 dígitos
        return bool(re.match(r'^\d{7,10}$', telefono))
    
    @staticmethod
    def obtener_habilidades_destacadas(habilidades: List[str], limite: int = 3) -> List[str]:
        """
        Retorna las N habilidades más relevantes.
        
        ¿Por qué en Service?
        Es lógica de presentación del dominio, reutilizable.
        
        Args:
            habilidades: Lista completa
            limite: Número máximo a retornar
        
        Returns:
            List[str]: Primeras N habilidades
        """
        if not habilidades:
            return []
        return habilidades[:limite]
    
    @staticmethod
    def tiene_habilidades_minimas(habilidades: List[str], minimo: int = 2) -> bool:
        """
        Verifica que tenga al menos N habilidades.
        
        Regla de negocio: Mínimo 2 habilidades requeridas.
        """
        return len(habilidades) >= minimo