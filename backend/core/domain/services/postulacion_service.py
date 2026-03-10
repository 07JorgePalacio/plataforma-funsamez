from datetime import datetime, timedelta
from typing import List
from core.domain.entities.postulacion import Postulacion

class PostulacionService:
    """
    Servicios de dominio para Postulación.
    
    ¿Cuándo usar este service?
    - Calcular tiempos
    - Validar cancelación
    - Generar resúmenes
    """
    
    @staticmethod
    def calcular_dias_desde_postulacion(postulacion: Postulacion) -> int:
        """
        Calcula cuántos días han pasado desde la postulación.
        
        Returns:
            int: Días transcurridos
        """
        if not postulacion.fecha_postulacion:
            return 0
        
        ahora = datetime.now()
        
        # Manejar fechas naive vs aware
        fecha_post = postulacion.fecha_postulacion
        if fecha_post.tzinfo is None:
            delta = ahora.replace(tzinfo=None) - fecha_post
        else:
            delta = ahora - fecha_post
        
        return delta.days
    
    @staticmethod
    def puede_cancelar(postulacion: Postulacion, fecha_inicio_convocatoria: datetime) -> bool:
        """
        Verifica si el usuario puede cancelar su postulación.
        
        Reglas de negocio:
        1. Solo si está "pendiente"
        2. Faltan al menos 2 días para el inicio
        
        Args:
            postulacion: Entidad
            fecha_inicio_convocatoria: Fecha de inicio de la convocatoria
        
        Returns:
            bool: True si puede cancelar
        """
        if postulacion.estado != "pendiente":
            return False
        
        hoy = datetime.now()
        inicio = (
            fecha_inicio_convocatoria.replace(tzinfo=None) 
            if fecha_inicio_convocatoria.tzinfo 
            else fecha_inicio_convocatoria
        )
        hoy = hoy.replace(tzinfo=None)
        
        dias_faltantes = (inicio - hoy).days
        return dias_faltantes >= 2
    
    @staticmethod
    def esta_pendiente_mucho_tiempo(postulacion: Postulacion, umbral_dias: int = 7) -> bool:
        """
        Verifica si lleva más de N días pendiente.
        
        Útil para: Alertas automáticas, recordatorios
        
        Args:
            postulacion: Entidad
            umbral_dias: Número de días (default 7)
        
        Returns:
            bool: True si excede el umbral
        """
        if postulacion.estado != "pendiente":
            return False
        
        dias = PostulacionService.calcular_dias_desde_postulacion(postulacion)
        return dias > umbral_dias
    
    @staticmethod
    def generar_resumen_historial(historial_estados: List[dict]) -> str:
        """
        Genera un resumen legible del historial.
        
        Args:
            historial_estados: [{"estado": "aprobada", "fecha": "2026-02-20"}, ...]
        
        Returns:
            str: Resumen legible
        
        Ejemplo:
            >>> historial = [{"estado": "aprobada", "fecha": "2026-02-20"}]
            >>> PostulacionService.generar_resumen_historial(historial)
            "Aprobada el 2026-02-20"
        """
        if not historial_estados:
            return "Sin cambios registrados"
        
        ultimo = historial_estados[-1]
        estado = ultimo.get('estado', 'desconocido')
        fecha = ultimo.get('fecha', 'fecha desconocida')
        
        return f"{estado.capitalize()} el {fecha}"
    
    @staticmethod
    def validar_observaciones(observaciones: str, min_caracteres: int = 10) -> bool:
        """
        Valida que las observaciones tengan contenido significativo.
        
        Regla: Si se proporcionan, deben tener al menos 10 caracteres
        
        Args:
            observaciones: Texto de observaciones
            min_caracteres: Mínimo requerido
        
        Returns:
            bool: True si es válido
        """
        if not observaciones:
            return True  # Opcionales
        
        texto_limpio = observaciones.strip()
        return len(texto_limpio) >= min_caracteres

    @staticmethod
    def transicionar_estado(postulacion: Postulacion, nuevo_estado: str, estado_convocatoria: str = "abierta", motivo_rechazo: str = None) -> Postulacion:
        """
        Regla de negocio para cambiar el estado de forma segura.
        Asegura que el estado sea válido, respeta el ciclo de la convocatoria y deja registro.
        """
        # Importación local para evitar dependencias circulares si las hubiera
        from core.domain.exceptions.postulacion_exceptions import EstadoPostulacionInvalidoError

        estados_permitidos = ["en_revision", "en_espera", "aprobada", "rechazada"]
        
        if nuevo_estado not in estados_permitidos:
            raise ValueError(f"El estado '{nuevo_estado}' no está permitido.")

        # 🟢 REGLA DE NEGOCIO ESTRICTA: 
        # No se puede devolver a estado activo si el evento ya caducó/cerró.
        if nuevo_estado in ["en_revision", "en_espera"] and estado_convocatoria in ["cerrada", "closed", "finalizada"]:
            raise EstadoPostulacionInvalidoError(
                "No se puede restablecer la postulación porque la convocatoria ya se encuentra cerrada o finalizada."
            )
            
        # Si no hay cambio real, devolvemos la misma entidad
        if postulacion.estado == nuevo_estado:
            return postulacion
            
        # 1. Cambiamos el estado base
        postulacion.estado = nuevo_estado
        
        # 2. Si es rechazada, asignamos el motivo (si lo hay)
        if nuevo_estado == "rechazada":
            postulacion.motivo_rechazo = motivo_rechazo
            
        # 3. Registramos en el historial
        nuevo_registro = {
            "estado": nuevo_estado,
            "fecha": datetime.now().isoformat(),
            "motivo": motivo_rechazo if nuevo_estado == "rechazada" else None
        }
        
        # Blindaje por si en base de datos era un string vacío o null
        if not isinstance(postulacion.historial_estados, list):
            postulacion.historial_estados = []
            
        postulacion.historial_estados.append(nuevo_registro)
        postulacion.fecha_actualizacion = datetime.now()
        
        return postulacion