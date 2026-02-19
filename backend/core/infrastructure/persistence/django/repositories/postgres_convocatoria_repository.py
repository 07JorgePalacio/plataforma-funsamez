from typing import List, Optional
from core.application.ports.output.convocatoria_repository import ConvocatoriaRepository
from core.domain.entities.convocatoria import Convocatoria
from core.infrastructure.persistence.django.models import ConvocatoriaModel, UsuarioModel

class PostgresConvocatoriaRepository(ConvocatoriaRepository):

    def _to_domain(self, model: ConvocatoriaModel) -> Convocatoria:
        return Convocatoria(
            # 1. Identificación
            id=model.id,
            id_usuario_creador=model.usuario_creador.id,
            # 2. Info Básica
            titulo=model.titulo,
            descripcion=model.descripcion,
            # 3. Logística
            ubicacion=model.ubicacion or "",
            link_whatsapp=model.link_whatsapp or "",
            modalidad=model.modalidad,
            # 4. Tiempos
            fecha_inicio=model.fecha_inicio,
            fecha_fin=model.fecha_fin,
            cupos_disponibles=model.cupos_disponibles,
            # 5. Estado
            estado=model.estado,
            fecha_creacion=model.fecha_creacion,
            # 6. JSON/Listas
            habilidades_requeridas=model.habilidades_requeridas or "",
            categorias=model.categorias or [], 
            horario=model.horario or {},       
            beneficios=model.beneficios or []
        )

    def crear(self, convocatoria: Convocatoria) -> Convocatoria:
        usuario_db = UsuarioModel.objects.get(id=convocatoria.id_usuario_creador)
        
        modelo = ConvocatoriaModel.objects.create(
            # 1. Identificación
            usuario_creador=usuario_db,
            # 2. Info Básica
            titulo=convocatoria.titulo,
            descripcion=convocatoria.descripcion,
            # 3. Logística
            ubicacion=convocatoria.ubicacion,
            link_whatsapp=convocatoria.link_whatsapp,
            modalidad=convocatoria.modalidad,
            # 4. Tiempos
            fecha_inicio=convocatoria.fecha_inicio,
            fecha_fin=convocatoria.fecha_fin,
            cupos_disponibles=convocatoria.cupos_disponibles,
            # 5. Estado
            estado=convocatoria.estado,
            # 6. JSON/Listas
            habilidades_requeridas=convocatoria.habilidades_requeridas,
            categorias=convocatoria.categorias, 
            horario=convocatoria.horario,
            beneficios=convocatoria.beneficios
        )
        return self._to_domain(modelo)

    def actualizar(self, id: int, datos: dict) -> Convocatoria:
        """
        Actualiza una convocatoria existente.
        SOLUCIÓN ERROR 🟢: Asignación explícita de campos críticos.
        """
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            
            # 1. Actualización Explícita (Blindaje contra errores de tipo)
            if 'modalidad' in datos: modelo.modalidad = datos['modalidad'] 
            if 'beneficios' in datos: modelo.beneficios = datos['beneficios'] 
            if 'horario' in datos: modelo.horario = datos['horario']
            if 'categorias' in datos: modelo.categorias = datos['categorias']
            if 'habilidades_requeridas' in datos: modelo.habilidades_requeridas = datos['habilidades_requeridas']

            # 2. Actualización Genérica para el resto (titulo, descripcion, fechas, etc.)
            campos_especiales = ['modalidad', 'beneficios', 'horario', 'categorias', 'habilidades_requeridas']
            
            for key, value in datos.items():
                if key not in campos_especiales:
                    if hasattr(modelo, key):
                        setattr(modelo, key, value)
            
            modelo.save()
            modelo.refresh_from_db()
            
            return self._to_domain(modelo)

        except ConvocatoriaModel.DoesNotExist:
            raise ValueError(f"No existe la convocatoria {id}")

    def obtener_por_id(self, id: int) -> Optional[Convocatoria]:
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            return self._to_domain(modelo)
        except ConvocatoriaModel.DoesNotExist:
            return None

    def listar_todas(self, estado: str = None) -> List[Convocatoria]:
        modelos = ConvocatoriaModel.objects.all()
        if estado:
            modelos = modelos.filter(estado=estado)
        modelos = modelos.order_by('-fecha_creacion')
        return [self._to_domain(m) for m in modelos]

    def eliminar(self, id: int):
        try:
            modelo = ConvocatoriaModel.objects.get(id=id)
            modelo.delete()
        except ConvocatoriaModel.DoesNotExist:
            pass