import { createContext, useContext, useState, useEffect } from 'react';
// Servicios de Convocatorias
import { obtenerConvocatorias } from '../services/convocatoriaService';
// Servicios de Campañas
import { obtenerCampanas } from '../services/campaignService';
// Servicios de Postulaciones
import { postularAConvocatoria, obtenerMisPostulaciones, obtenerTodasLasPostulaciones, cambiarEstadoPostulacion, eliminarPostulacion } from '../services/postulacionService';
// Servicios de Notificaciones
import { obtenerMisNotificaciones, marcarNotificacionComoLeida, eliminarNotificacion, eliminarTodasLasNotificaciones } from '../services/notificacionService';
// Servicios de Usuarios
import { actualizarPerfil } from '../services/userService';

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

        const token = localStorage.getItem('access_token');
        if (!token) return null;

        const role = localStorage.getItem('user_role') || 'voluntario';
        const name = localStorage.getItem('user_name') || (role === 'administrador' ? 'Administrador' : 'Usuario');
        const id = localStorage.getItem('user_id');
        
        const correo_electronico = localStorage.getItem('user_email') || localStorage.getItem('user_correo_electronico') || '';
        const numero_telefono = localStorage.getItem('user_telefono') || localStorage.getItem('user_numero_telefono') || '';
        const numero_identificacion = localStorage.getItem('user_documento') || localStorage.getItem('user_numero_identificacion') || '';
        const profesion = localStorage.getItem('user_profesion') || localStorage.getItem('user_ocupacion') || '';
        const direccion = localStorage.getItem('user_direccion') || '';
        const fecha_nacimiento = localStorage.getItem('user_fecha_nacimiento') || '';
        const tipo_documento = localStorage.getItem('user_tipo_documento') || 'CC';
        const foto_perfil = localStorage.getItem('user_foto_perfil') || null;

        if (!name) return null;

        let habilidades = [];
        let disponibilidad = {};
        let intereses = []; 
        try {
            const habs = localStorage.getItem('user_habilidades');
            const disp = localStorage.getItem('user_disponibilidad');
            const ints = localStorage.getItem('user_intereses'); 
            if (habs) habilidades = JSON.parse(habs);
            if (disp) disponibilidad = JSON.parse(disp);
            if (ints) intereses = JSON.parse(ints); 
        } catch (e) {
            console.error("Error al cargar los datos del usuario:", e);
        }

        return { 
            name, 
            role, 
            id: id ? parseInt(id) : null, 
            correo_electronico,
            numero_telefono,
            numero_identificacion,
            profesion,
            direccion,          
            fecha_nacimiento,   
            tipo_documento,     
            intereses,          
            habilidades, 
            disponibilidad,
            foto_perfil
        };
    });

    const login = (userData, tokens) => {
        // 1. Persistencia física para que resista el F5
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem('user_role', userData.role);
        localStorage.setItem('user_name', userData.full_name);
        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('user_email', userData.email || '');
        localStorage.setItem('user_telefono', userData.numero_telefono || '');
        localStorage.setItem('user_documento', userData.numero_identificacion || '');
        localStorage.setItem('user_profesion', userData.profesion || '');
        localStorage.setItem('user_direccion', userData.direccion || '');
        localStorage.setItem('user_fecha_nacimiento', userData.fecha_nacimiento || '');
        localStorage.setItem('user_tipo_documento', userData.tipo_documento || 'CC');
        localStorage.setItem('user_foto_perfil', userData.foto_perfil || '');
        localStorage.setItem('user_habilidades', JSON.stringify(userData.habilidades || []));
        localStorage.setItem('user_disponibilidad', JSON.stringify(userData.disponibilidad || {}));
        localStorage.setItem('user_intereses', JSON.stringify(userData.intereses || []));

        // 2. Reactividad instantánea: Avisamos a React que el usuario cambió
        setUser({
            id: userData.id,
            name: userData.full_name,
            role: userData.role,
            correo_electronico: userData.email,
            numero_telefono: userData.numero_telefono,
            numero_identificacion: userData.numero_identificacion,
            profesion: userData.profesion,
            direccion: userData.direccion,
            fecha_nacimiento: userData.fecha_nacimiento,
            tipo_documento: userData.tipo_documento,
            intereses: userData.intereses || [],
            habilidades: userData.habilidades || [],
            disponibilidad: userData.disponibilidad || {},
            foto_perfil: userData.foto_perfil
        });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const updateProfile = async (data) => {
        try {
            // 1. Enviamos los datos al backend para persistencia real
            const response = await actualizarPerfil(data);
            const updatedUser = response.user;
            
            // 2. Si es exitoso, actualizamos el estado local de React
            setUser(prev => ({ 
                ...prev, 
                ...updatedUser,
                // Garantizamos los alias que usa la UI
                name: updatedUser.full_name,
                nombre_completo: updatedUser.full_name
            }));
            
            // 3. Blindaje total: Actualizamos el localStorage para que no se borre al recargar
            localStorage.setItem('user_name', updatedUser.full_name || '');
            localStorage.setItem('user_email', updatedUser.email || '');
            localStorage.setItem('user_telefono', updatedUser.numero_telefono || '');
            localStorage.setItem('user_documento', updatedUser.numero_identificacion || '');
            localStorage.setItem('user_profesion', updatedUser.profesion || '');
            localStorage.setItem('user_direccion', updatedUser.direccion || '');
            localStorage.setItem('user_fecha_nacimiento', updatedUser.fecha_nacimiento || '');
            localStorage.setItem('user_tipo_documento', updatedUser.tipo_documento || 'CC');
            localStorage.setItem('user_intereses', JSON.stringify(updatedUser.intereses || []));
            
            if (updatedUser.foto_perfil) {
                localStorage.setItem('user_foto_perfil', updatedUser.foto_perfil);
            }
            
            localStorage.setItem('user_habilidades', JSON.stringify(updatedUser.habilidades || []));
            localStorage.setItem('user_disponibilidad', JSON.stringify(updatedUser.disponibilidad || {}));
            
            return response;
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            throw error;
        }
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

                // 5. Cálculos de Negocio (Enriquecidos desde el Backend)
                porcentaje_progreso: Number(camp.porcentaje_progreso) || 0,
                dias_restantes: Number(camp.dias_restantes) || 0,

                // 6. Listas JSON (Garantizamos Arrays vacíos si vienen null)
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
        // 1. Carga Pública (Siempre)
        const promises = [fetchConvocations(), fetchCampaigns()]; 
        
        // 2. Carga Privada (Solo si hay sesión)
        if (localStorage.getItem('access_token')) {
            promises.push(fetchNotifications());
            if (localStorage.getItem('user_role') === 'voluntario') {
                promises.push(fetchMyApplications());
            } else if (localStorage.getItem('user_role') === 'administrador') {
                promises.push(fetchAllApplications()); 
            }
        }
        
        // Usamos allSettled para que si una falla, las demás no se detengan
        await Promise.allSettled(promises);
        setLoading(false);
    };

    useEffect(() => {
        // Arquitectura Reactiva: Se ejecuta al abrir la app Y automáticamente después 
        // de cada Login/Logout para hidratar los datos privados (Postulaciones, Notificaciones)
        // Esto elimina el bug de "estado vacío" en los Dashboards sin necesidad de recargar la página.
        refreshAllData();
    }, [user?.id]);

    // ==========================================
    // FILTRO DE CAMPAÑAS (Helpers)
    // ==========================================
    const getActiveCampaigns = () => {
        return campaigns.filter(c => c.estado === 'activa' || c.estado === 'pausada');
    };

    const getClosedCampaigns = () => {
        return campaigns.filter(c => c.estado === 'completada' || c.estado === 'cancelada');
    };

    const getPublicCampaigns = () => {
        return campaigns.filter(c => c.estado === 'activa');
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
        getPublicCampaigns,

        // Voluntarios
        user,
        login,
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