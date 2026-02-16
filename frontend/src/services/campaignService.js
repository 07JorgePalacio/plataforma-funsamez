import axios from 'axios';

// 1. Definimos la URL exacta del Backend (Igual que en Convocatorias)
const API_URL = 'http://127.0.0.1:8000/api/campanas';

// 2. Función auxiliar para sacar el Token (Igual que en Convocatorias)
const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// --- FUNCIONES DEL SERVICIO ---

export const obtenerCampanas = async () => {
    try {
        // Usamos la URL completa y pasamos el header con el token
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo campañas:", error);
        throw error.response ? error.response.data : new Error('Error de conexión');
    }
};

export const crearCampana = async (data) => {
    try {
        // Ajustamos la ruta a /crear/ tal como la definiste en Django
        const response = await axios.post(`${API_URL}/crear/`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error("Error creando campaña:", error);
        throw error.response ? error.response.data : new Error('Error al crear campaña');
    }
};

export const eliminarCampana = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}/`, getAuthHeader());
        return true;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al eliminar');
    }
};

export const actualizarCampana = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al actualizar campaña');
    }
};

// (Opcional) Si en el futuro implementas actualizar o cambiar estado en Backend:
export const cambiarEstadoCampana = async (id, estado) => {
    console.warn("Endpoint cambiarEstadoCampana no implementado en backend aún.");
    return null;
};