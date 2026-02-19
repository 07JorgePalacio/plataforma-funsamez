import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/voluntariado';

const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. POSTULARSE A CONVOCATORIA (FUN-20)
export const postularseConvocatoria = async (idConvocatoria, observaciones = "") => {
    const payload = {
        id_convocatoria: idConvocatoria,
        observaciones: observaciones
    };

    try {
        const response = await axios.post(`${API_URL}/postular/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

// 2. OBTENER MIS POSTULACIONES (FUN-41)
export const obtenerMisPostulaciones = async () => {
    try {
        const response = await axios.get(`${API_URL}/mis-postulaciones/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al cargar tu historial de postulaciones');
    }
};