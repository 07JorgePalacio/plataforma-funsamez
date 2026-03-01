import axios from 'axios';

const API_URL = 'http://localhost:8000/api/notificaciones';

// Helper para obtener el token
const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token'); 
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const obtenerMisNotificaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        throw error;
    }
};

export const eliminarNotificacion = async (idNotificacion) => {
    try {
        const response = await axios.delete(`${API_URL}/${idNotificacion}/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar notificación ${idNotificacion}:`, error);
        throw error;
    }
};

export const eliminarTodasLasNotificaciones = async () => {
    try {
        const response = await axios.delete(`${API_URL}/todas/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error al vaciar las notificaciones:', error);
        throw error;
    }
};

export const marcarNotificacionComoLeida = async (idNotificacion) => {
    try {
        const response = await axios.patch(`${API_URL}/${idNotificacion}/leer/`, {}, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error al marcar notificación ${idNotificacion} como leída:`, error);
        throw error;
    }
};