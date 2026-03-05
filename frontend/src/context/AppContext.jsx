import { createContext, useContext, useState, useEffect } from 'react';
// Servicios de Convocatorias
import { obtenerConvocatorias } from '../services/convocatoriaService';
// Servicios de Campañas
import { obtenerCampanas } from '../services/campaignService';
// Servicios de Postulaciones
import { postularAConvocatoria, obtenerMisPostulaciones, obtenerTodasLasPostulaciones, cambiarEstadoPostulacion, eliminarPostulacion } from '../services/postulacionService';
// Servicios de Notificaciones
import { obtenerMisNotificaciones, marcarNotificacionComoLeida, eliminarNotificacion, eliminarTodasLasNotificaciones } from '../services/notificacionService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp debe ser usado dentro de un AppProvider');
    return context;
};

export const AppProvider = ({ children }) => {
    // --- ESTADOS GLOBALES ---
    const [convocations, setConvocations] = useState([]);
    const [campaigns, setCampaigns] = useState([]); 
    const [myApplications, setMyApplications] = useState([]);
    const [adminApplications, setAdminApplications] = useState([]); 
    const [notifications, setNotifications] = useState([]); 
    const [loading, setLoading] = useState(true);

    // ==========================================
    // 0. ESTADO DEL USUARIO Y SESIÓN
    // ==========================================
    const [user, setUser] = useState(() => {
        const name = localStorage.getItem('user_name');
        const role = localStorage.getItem('user_role');
        const id = localStorage.getItem('user_id');
        
        if (!name) return null;

        let habilidades = [];
        let disponibilidad = {};
        try {
            const habs = localStorage.getItem('user_habilidades');
            const disp = localStorage.getItem('user_disponibilidad');
            if (habs) habilidades = JSON.parse(habs);
            if (disp) disponibilidad = JSON.parse(disp);
        } catch (e) {
            console.error("Error al cargar los datos del usuario:", e);
        }

        return { 
            name, 
            role, 
            id: id ? parseInt(id) : null, 
            habilidades, 
            disponibilidad 
        };
    });

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const updateProfile = (data) => {
        setUser({ ...user, ...data });
    };

    const showToast = (message) => {
        console.log("Notificación:", message); 
    };

    // ==========================================
    // 1. MÓDULO CONVOCATORIAS
    // ==========================================
    const fetchConvocations = async () => {
        try {
            const data = await obtenerConvocatorias();
            console.log('📦 Convocatorias recibidas:', data);
            
            const formattedData = data.map(item => ({
                ...item, // Mantenemos todo lo original
                // Aseguramos alias para UI si es necesario
                title: item.titulo,
                description: item.descripcion || 'Sin descripción',
                status: item.estado === 'abierta' ? 'published' : item.estado === 'cerrada' ? 'closed' : item.estado,
                // Garantizamos tipos de datos
                categorias: item.categorias || [],
                horario: item.horario || {},
                beneficios: item.beneficios || [],
                modalidad: item.modalidad || 'presencial'
            }));
            
            setConvocations(formattedData);
        } catch (error) {
            console.error("❌ Error cargando convocatorias:", error);
        }
    };

    // ==========================================
    // 2. MÓDULO CAMPAÑAS
    // ==========================================
    const fetchCampaigns = async () => {
        try {
            const data = await obtenerCampanas();
            console.log('📦 Campañas recibidas:', data);

            // Mapeo y Limpieza de Datos (Igual que hicimos con Convocatorias)
            const formattedCampaigns = data.map(camp => ({
                // 1. Identificación y Básicos
                id: camp.id,
                titulo: camp.titulo,
                descripcion: camp.descripcion,
                
                // 2. Fechas y Estado
                fecha_inicio: camp.fecha_inicio,
                fecha_fin: camp.fecha_fin,
                fecha_creacion: camp.fecha_creacion,
                estado: camp.estado,
                
                // 3. Financiero (Garantizamos números)
                monto_objetivo: Number(camp.monto_objetivo) || 0,
                recaudo_actual: Number(camp.recaudo_actual) || 0,
                permite_donacion_monetaria: camp.permite_donacion_monetaria,
                permite_donacion_especie: camp.permite_donacion_especie,

                // 4. Multimedia
                imagen_url: camp.imagen_url,

                // 5. Listas JSON (Garantizamos Arrays vacíos si vienen null)
                objetivos: Array.isArray(camp.objetivos) ? camp.objetivos : [],
                galeria_imagenes: Array.isArray(camp.galeria_imagenes) ? camp.galeria_imagenes : [],
                video_urls: Array.isArray(camp.video_urls) ? camp.video_urls : [],
                necesidades: Array.isArray(camp.necesidades) ? camp.necesidades : [],
                categoria: Array.isArray(camp.categoria) ? camp.categoria : [],
                tipo_impacto: Array.isArray(camp.tipo_impacto) ? camp.tipo_impacto : []
            }));

            setCampaigns(formattedCampaigns);
        } catch (error) {
            console.error("❌ Error cargando campañas:", error);
        }
    };

    // ==========================================
    // 3. MÓDULO VOLUNTARIO 
    // ==========================================
    const fetchMyApplications = async () => {
        //1. Verificamos autenticación
        if (localStorage.getItem('user_role') !== 'voluntario') return;
        
        try {
            const data = await obtenerMisPostulaciones();
            setMyApplications(data);
            console.log('📦 Postulaciones reales recibidas:', data);
        } catch (error) {
            console.error('Error al cargar postulaciones:', error);
        }
    };

    const fetchAllApplications = async () => {
        if (localStorage.getItem('user_role') === 'voluntario') return;
        try {
            const data = await obtenerTodasLasPostulaciones();
            setAdminApplications(data);
            console.log('📦 Todas las postulaciones (Admin) recibidas:', data);
        } catch (error) {
            console.error('Error al cargar todas las postulaciones:', error);
        }
    };

    const updateApplicationStatus = async (id, newStatus, reason = null) => {
        try {
            await cambiarEstadoPostulacion(id, newStatus, reason);
            await fetchAllApplications(); // Recargamos para ver los cambios
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            throw error;
        }
    };

    const deleteApplication = async (id) => {
        try {
            await eliminarPostulacion(id);
            await fetchAllApplications(); // Recargamos para ver los cambios
        } catch (error) {
            console.error('Error al eliminar postulación:', error);
            throw error;
        }
    };

    const applyToConvocation = async (convocationId, observaciones = '') => {
        try {
            // 2. Llamamos al backend
            await postularAConvocatoria(convocationId, observaciones);
            // 3. Si sale bien, recargamos la lista desde la base de datos
            await fetchMyApplications(); 
            return { success: true };
        } catch (error) {
            console.error("Error en la postulación:", error);
            throw error; 
        }
    };
    
    // 4. Validar si el voluntario ya está postulado a una convocatoria específica
    const hasApplied = (convocationId) => {
        return myApplications.some(app => app.id_convocatoria === convocationId);
    };
    // 5. Obtener mis postulaciones (Filtra por el usuario logueado)
    const getApplicationsByVolunteer = () => {
        return myApplications;
    };

    // ==========================================
    // 4. MÓDULO DE NOTIFICACIONES
    // ==========================================
    const fetchNotifications = async () => {
        try {
            const data = await obtenerMisNotificaciones();
            setNotifications(data);
            console.log('🔔 Notificaciones recibidas:', data);
        } catch (error) {
            console.error('❌ Error al cargar notificaciones:', error);
        }
    };

    const markNotificationAsRead = async (id) => {
        try {
            await marcarNotificacionComoLeida(id);
            // Actualizamos el estado local para que la campanita se apague de inmediato sin recargar toda la BD
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
        } catch (error) {
            console.error('Error al marcar notificación como leída:', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await eliminarNotificacion(id);
            // Eliminamos localmente del estado para una UX instantánea
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('Error al eliminar notificación:', error);
            throw error;
        }
    };

    const deleteAllNotifications = async () => {
        try {
            await eliminarTodasLasNotificaciones();
            // Vaciamos el estado local instantáneamente
            setNotifications([]);
        } catch (error) {
            console.error('Error al vaciar notificaciones:', error);
            throw error;
        }
    };

    const unreadNotificationsCount = notifications.filter(n => !n.leida).length;


    // ==========================================
    // CARGA UNIFICADA
    // ==========================================
    const refreshAllData = async () => {
        setLoading(true);
        const promises = [fetchConvocations(), fetchCampaigns(), fetchNotifications()]; // 🟢 Añadimos fetchNotifications
        
        if (localStorage.getItem('user_role') === 'voluntario') {
            promises.push(fetchMyApplications());
        } else {
            promises.push(fetchAllApplications()); 
        }
        
        await Promise.all(promises);
        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            refreshAllData();
        } else {
            setLoading(false);
        }
    }, []);

    // ==========================================
    // FILTRO DE CAMPAÑAS (Helpers)
    // ==========================================
    const getActiveCampaigns = () => {
        return campaigns.filter(c => c.estado === 'activa' || c.estado === 'pausada');
    };

    const getClosedCampaigns = () => {
        return campaigns.filter(c => c.estado === 'completada' || c.estado === 'cancelada');
    };
    

    // ==========================================
    // ESTADOS
    // ==========================================
    const value = {
        // Estado General
        loading,
        refreshAllData,

        // Convocatorias
        convocations,
        fetchConvocations,
        getActiveConvocations: () => convocations.filter(c => c.status !== 'closed'),
        getClosedConvocations: () => convocations.filter(c => c.status === 'closed'),
        getPublishedConvocations: () => convocations.filter(c => c.status === 'published'),

        // Campañas
        campaigns,
        fetchCampaigns, 
        getActiveCampaigns,
        getClosedCampaigns,

        // Voluntarios
        user,
        logout,
        updateProfile,
        showToast,
        getApplicationsByVolunteer,
        hasApplied,
        applyToConvocation,
        
        // Exportar para el Admin
        adminApplications,
        fetchAllApplications,
        updateApplicationStatus,
        deleteApplication,

        // Exportar Notificaciones
        notifications,
        fetchNotifications,
        markNotificationAsRead,
        deleteNotification, 
        deleteAllNotifications,
        unreadNotificationsCount
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};