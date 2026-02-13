import axios from 'axios'; // ✅ CORREGIDO: Importación directa

// Ajusta la URL si es necesario
const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. CREAR
export const crearConvocatoria = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/crear/`, data, getAuthHeader());
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
export const actualizarConvocatoria = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, data, getAuthHeader());
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