import axios from 'axios'; // ✅ CORREGIDO: Importación directa

// Ajusta la URL si es necesario
const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. CREAR
export const crearConvocatoria = async (formData) => {
    // Convertir array de skills a string para la BD
    const habilidadesString = Array.isArray(formData.skills) 
        ? formData.skills.join(', ') 
        : formData.skills;

    // Payload LIMPIO: Cada dato en su campo correspondiente
    const payload = {
        titulo: formData.title,
        descripcion: formData.description,
        ubicacion: formData.location,           // <--- Campo exclusivo
        link_whatsapp: formData.whatsappGroupLink, // <--- Campo exclusivo
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario
    };

    try {
        const response = await axios.post(`${API_URL}/crear/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. OBTENER LISTA
export const obtenerConvocatorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al obtener convocatorias');
    }
};

// 3. ACTUALIZAR (Para Editar) - FALTABA ESTA
export const actualizarConvocatoria = async (id, formData) => {
    // Misma lógica de limpieza para editar
    const habilidadesString = Array.isArray(formData.skills) 
        ? formData.skills.join(', ') 
        : formData.skills;

    const payload = {
        titulo: formData.title,
        descripcion: formData.description,
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario
    };

    try {
        const response = await axios.put(`${API_URL}/${id}/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar');
    }
};

// 4. CAMBIAR ESTADO (Para Pausar/Cerrar) - FALTABA ESTA
export const cambiarEstadoConvocatoria = async (id, nuevoEstado) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/`, { estado: nuevoEstado }, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cambiar estado');
    }
};

// 5. ELIMINAR - FALTABA ESTA
export const eliminarConvocatoria = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};