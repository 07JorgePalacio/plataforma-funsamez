from datetime import date, datetime
from typing import List
from core.domain.entities.campana import Campana

class CrearCampanaUseCase:
    def __init__(self, repository):
        self.repository = repository

    def ejecutar(self, 
                 # 1. Info Básica
                 titulo: str, descripcion: str, 
                 # 2. Tiempos
                 fecha_inicio: datetime, fecha_fin: date,
                 # 3. Identificación
                 id_usuario: int, 
                 # 4. Financiero
                 monto_objetivo: int, permite_monetaria: bool, permite_especie: bool,
                 # 5. Opcionales (Imagen)
                 imagen_url: str = "",
                 # 6. Listas / JSON
                 objetivos: List[str] = None,
                 galeria: List[str] = None,
                 necesidades: List[str] = None,
                 categoria: List[str] = None, 
                 tipo_impacto: List[str] = None) -> Campana:
        
        # Validación de Negocio
        
        # 1. Validar fechas lógicas
        if fecha_fin and fecha_inicio:
            # Convertimos a date para comparar peras con peras
            inicio_date = fecha_inicio.date() if isinstance(fecha_inicio, datetime) else fecha_inicio
            if fecha_fin < inicio_date:
                raise ValueError("La fecha de fin debe ser posterior al inicio.")

        # 2. Validar inicio en el pasado (Solo al CREAR)
        hoy = date.today()
        inicio_check = fecha_inicio.date() if isinstance(fecha_inicio, datetime) else fecha_inicio
        if inicio_check < hoy:
            raise ValueError("La campaña no puede iniciar en el pasado.")

        # 3. Validar Montos
        if monto_objetivo < 0:
            raise ValueError("El monto objetivo no puede ser negativo.")
        
        nueva_campana = Campana(
            # 1. Info Básica
            titulo=titulo,
            descripcion=descripcion,
            imagen_url=imagen_url,
            # 2. Tiempos
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            # 3. Identificación
            id_usuario_creador=id_usuario,
            # 4. Financiero
            monto_objetivo=monto_objetivo,
            permite_donacion_monetaria=permite_monetaria,
            permite_donacion_especie=permite_especie,
            # 5. Listas / JSON
            objetivos=objetivos or [],
            galeria_imagenes=galeria or [],
            necesidades=necesidades or [],
            categoria=categoria or [],
            tipo_impacto=tipo_impacto or [],
        )
        
        return self.repository.crear(nueva_campana)