import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users';

const getAuthHeaders = (isFormData = false) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }
    
    return { headers };
};

export const iniciarSesion = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { 
            correo_electronico: email, 
            contrasena: password 
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Error al iniciar sesión');
        }
        throw new Error('Error de conexión con el servidor');
    }
};

export const actualizarPerfil = async (datos) => {
    try {
        const isFormData = datos instanceof FormData;
        const response = await axios.patch(`${API_URL}/perfil/actualizar/`, datos, getAuthHeaders(isFormData));
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const data = error.response.data;

            const firstKey = Object.keys(data)[0];
            const errorMessage = Array.isArray(data[firstKey]) ? data[firstKey][0] : (data.error || 'Error al actualizar el perfil');
            throw new Error(errorMessage);
        }
        throw new Error('Error de conexión con el servidor');
    }
};