import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. CREAR
export const crearConvocatoria = async (formData) => {
    
    const habilidadesString = Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills;

    const payload = {
        // 2. Info Básica
        titulo: formData.title,
        descripcion: formData.description,
        // 3. Logística
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        modalidad: formData.modalidad, // 🟢 CRÍTICO: Asegurar envío
        // 4. Tiempos y Cupos
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        // 6. JSON/Listas
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario,
        beneficios: formData.beneficios // 🟢 CRÍTICO: Asegurar envío
    };

    try {
        const response = await axios.post(`${API_URL}/crear/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. ACTUALIZAR
export const actualizarConvocatoria = async (id, formData) => {
    const habilidadesString = Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills;

    // Payload Estandarizado (Orden Maestro)
    const payload = {
        // 2. Info Básica
        titulo: formData.title,
        descripcion: formData.description,
        // 3. Logística
        ubicacion: formData.location,
        link_whatsapp: formData.whatsappGroupLink,
        modalidad: formData.modalidad, // 🟢 CRÍTICO
        // 4. Tiempos y Cupos
        fecha_inicio: formData.startDate,
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        // 6. JSON/Listas
        habilidades_requeridas: habilidadesString,
        categorias: formData.categorias,
        horario: formData.horario,
        beneficios: formData.beneficios // 🟢 CRÍTICO
    };

    try {
        const response = await axios.put(`${API_URL}/${id}/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar');
    }
};

// 3. OBTENER LISTA
export const obtenerConvocatorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al obtener convocatorias');
    }
};

// 4. CAMBIAR ESTADO
export const cambiarEstadoConvocatoria = async (id, nuevoEstado) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/`, { estado: nuevoEstado }, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cambiar estado');
    }
};

// 5. ELIMINAR
export const eliminarConvocatoria = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};