import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/postulaciones';

// Helper - Token de Seguridad
const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
};


export const postularAConvocatoria = async (idConvocatoria, observaciones = '') => {
    try {
        const response = await axios.post(
            `${API_URL}/postular/`,
            {
                id_convocatoria: idConvocatoria,
                observaciones: observaciones
            },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {

        if (error.response && error.response.data) {
             throw new Error(error.response.data.error || 'Error al postularse');
        }
        throw error;
    }
};

export const obtenerMisPostulaciones = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/mis-postulaciones/`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error('Error al obtener postulaciones:', error);
        throw error;
    }
};

// --- SERVICIOS DE ADMINISTRADOR ---

export const obtenerTodasLasPostulaciones = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/admin/todas/`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las postulaciones (Admin):', error);
        throw error;
    }
};

export const cambiarEstadoPostulacion = async (idPostulacion, nuevoEstado, motivoRechazo = null) => {
    try {
        const payload = { estado: nuevoEstado };
        if (motivoRechazo) {
            payload.motivo_rechazo = motivoRechazo;
        }
        
        const response = await axios.patch(
            `${API_URL}/admin/${idPostulacion}/estado/`,
            payload,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error(`Error al cambiar el estado de la postulación ${idPostulacion}:`, error);
        throw error;
    }
};

export const eliminarPostulacion = async (idPostulacion) => {
    try {
        const response = await axios.delete(
            `${API_URL}/admin/${idPostulacion}/`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar la postulación ${idPostulacion}:`, error);
        throw error;
    }
};