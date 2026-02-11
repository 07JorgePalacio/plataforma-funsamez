import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/convocatorias';

// Obtener token del almacenamiento
const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const crearConvocatoria = async (formData) => {
    // --- LÓGICA DE TRADUCCIÓN (Frontend -> Backend) ---
    // El diseño tiene campos separados (Requirements, Benefits, WhatsApp),
    // pero la Base de Datos actual espera todo en 'descripcion' o 'habilidades'.
    // Aquí los unimos para cumplir el Requisito Funcional sin romper la BD.

    const habilidadesString = formData.skills.join(', ');

    let descripcionExtendida = formData.description;
    
    if (formData.requirements.length > 0) {
        descripcionExtendida += '\n\n📋 Requisitos:\n- ' + formData.requirements.join('\n- ');
    }
    
    if (formData.benefits.length > 0) {
        descripcionExtendida += '\n\n🎁 Beneficios:\n- ' + formData.benefits.join('\n- ');
    }
    
    if (formData.whatsappGroupLink) {
        descripcionExtendida += `\n\n📲 Grupo de WhatsApp (Solo aprobados): ${formData.whatsappGroupLink}`;
    }

    if (formData.location) {
        descripcionExtendida += `\n\n📍 Ubicación: ${formData.location} (${formData.locationType})`;
    }

    // Objeto final que se envía a Django
    const payload = {
        titulo: formData.title,
        descripcion: descripcionExtendida,
        fecha_inicio: formData.startDate, // Asegúrate que el input sea type="date"
        fecha_fin: formData.endDate,
        cupos_disponibles: parseInt(formData.spots),
        habilidades_requeridas: habilidadesString
    };

    try {
        const response = await axios.post(`${API_URL}/crear/`, payload, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al conectar con el servidor');
    }
};

export const obtenerConvocatorias = async () => {
    try {
        // Hacemos una petición GET a /api/convocatorias/
        const response = await axios.get(`${API_URL}/`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Error al obtener convocatorias');
    }
};