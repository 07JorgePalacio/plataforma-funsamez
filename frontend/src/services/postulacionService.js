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