import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users';

// Configuración para inyectar el token JWT en las peticiones seguras
const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const actualizarPerfil = async (datos) => {
    try {
        const response = await axios.patch(`${API_URL}/perfil/actualizar/`, datos, getAuthHeaders());
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Error al actualizar el perfil');
        }
        throw new Error('Error de conexión con el servidor');
    }
};