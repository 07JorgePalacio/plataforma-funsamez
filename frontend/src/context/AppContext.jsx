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
    const [misPostulaciones, setMisPostulaciones] = useState([]);
    const [postulacionesAdmin, setPostulacionesAdmin] = useState([]); 
    const [notificaciones, setNotificaciones] = useState([]); 
    const [conteoNoLeidas, setConteoNoLeidas] = useState(0);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // 0. ESTADO DEL USUARIO Y SESIÓN
    // ==========================================
    const [user, setUser] = useState(() => {

        const token = localStorage.getItem('access_token');
        if (!token) return null;

        // 1. Identificación y Credenciales
        const nombre_completo = localStorage.getItem('user_nombre_completo') || '';
        const correo_electronico = localStorage.getItem('user_correo_electronico') || '';

        if (!nombre_completo) return null;

        // 2. Información Personal
        const tipo_documento = localStorage.getItem('user_tipo_documento') || 'CC';
        const numero_identificacion = localStorage.getItem('user_numero_identificacion') || '';
        const fecha_nacimiento = localStorage.getItem('user_fecha_nacimiento') || '';
        const profesion = localStorage.getItem('user_profesion') || '';

        // 3. Contacto
        const numero_telefono = localStorage.getItem('user_numero_telefono') || '';
        const direccion = localStorage.getItem('user_direccion') || '';
        const foto_perfil = localStorage.getItem('user_foto_perfil') || null;

        // 4. Config y Estado
        const rol = localStorage.getItem('user_rol') || 'voluntario';
        const estado = localStorage.getItem('user_estado') || 'activo';
        const autenticacion_2fa_habilitada = localStorage.getItem('user_2fa') === 'true';

        // 5. Tiempos
        const id = localStorage.getItem('user_id');

        // 6. Listas y JSON
        let intereses = [];
        let habilidades = [];
        let disponibilidad = {}; 
        try {
            const ints = localStorage.getItem('user_intereses'); 
            const habs = localStorage.getItem('user_habilidades');
            const disp = localStorage.getItem('user_disponibilidad');
            if (ints) intereses = JSON.parse(ints); 
            if (habs) habilidades = JSON.parse(habs);
            if (disp) disponibilidad = JSON.parse(disp);
        } catch (e) {
            console.error("Error al cargar los datos del usuario:", e);
        }

        return { 
            nombre_completo,
            correo_electronico,
            tipo_documento,
            numero_identificacion,
            fecha_nacimiento,
            profesion,
            numero_telefono,
            direccion,
            foto_perfil,
            rol,
            estado,
            autenticacion_2fa_habilitada,
            id: id ? parseInt(id) : null,
            intereses,          
            habilidades, 
            disponibilidad
        };
    });

    const login = (userData, tokens) => {
        // 1. Persistencia física (Orden Maestro)
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);

        localStorage.setItem('user_nombre_completo', userData.nombre_completo || '');
        localStorage.setItem('user_correo_electronico', userData.correo_electronico || '');

        localStorage.setItem('user_tipo_documento', userData.tipo_documento || 'CC');
        localStorage.setItem('user_numero_identificacion', userData.numero_identificacion || '');
        localStorage.setItem('user_fecha_nacimiento', userData.fecha_nacimiento || '');
        localStorage.setItem('user_profesion', userData.profesion || '');

        localStorage.setItem('user_numero_telefono', userData.numero_telefono || '');
        localStorage.setItem('user_direccion', userData.direccion || '');
        localStorage.setItem('user_foto_perfil', userData.foto_perfil || '');

        localStorage.setItem('user_rol', userData.rol || 'voluntario');
        localStorage.setItem('user_estado', userData.estado || 'activo');
        localStorage.setItem('user_2fa', userData.autenticacion_2fa_habilitada || false);

        localStorage.setItem('user_id', userData.id || '');

        localStorage.setItem('user_intereses', JSON.stringify(userData.intereses || []));
        localStorage.setItem('user_habilidades', JSON.stringify(userData.habilidades || []));
        localStorage.setItem('user_disponibilidad', JSON.stringify(userData.disponibilidad || {}));

        // 2. Reactividad instantánea: Avisamos a React que el usuario cambió
        setUser({
            nombre_completo: userData.nombre_completo,
            correo_electronico: userData.correo_electronico,
            tipo_documento: userData.tipo_documento,
            numero_identificacion: userData.numero_identificacion,
            fecha_nacimiento: userData.fecha_nacimiento,
            profesion: userData.profesion,
            numero_telefono: userData.numero_telefono,
            direccion: userData.direccion,
            foto_perfil: userData.foto_perfil,
            rol: userData.rol,
            estado: userData.estado,
            autenticacion_2fa_habilitada: userData.autenticacion_2fa_habilitada,
            id: userData.id,
            intereses: userData.intereses || [],
            habilidades: userData.habilidades || [],
            disponibilidad: userData.disponibilidad || {}
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
                ...updatedUser
            }));
            
            // 3. Blindaje total: Actualizamos el localStorage (Orden Maestro)
            localStorage.setItem('user_nombre_completo', updatedUser.nombre_completo || '');
            localStorage.setItem('user_correo_electronico', updatedUser.correo_electronico || '');

            localStorage.setItem('user_tipo_documento', updatedUser.tipo_documento || 'CC');
            localStorage.setItem('user_numero_identificacion', updatedUser.numero_identificacion || '');
            localStorage.setItem('user_fecha_nacimiento', updatedUser.fecha_nacimiento || '');
            localStorage.setItem('user_profesion', updatedUser.profesion || '');

            localStorage.setItem('user_numero_telefono', updatedUser.numero_telefono || '');
            localStorage.setItem('user_direccion', updatedUser.direccion || '');
            if (updatedUser.foto_perfil) {
                localStorage.setItem('user_foto_perfil', updatedUser.foto_perfil);
            }

            localStorage.setItem('user_rol', updatedUser.rol || 'voluntario');
            localStorage.setItem('user_estado', updatedUser.estado || 'activo');
            localStorage.setItem('user_2fa', updatedUser.autenticacion_2fa_habilitada || false);

            localStorage.setItem('user_intereses', JSON.stringify(updatedUser.intereses || []));
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
                
                // Cálculos de Negocio (Enriquecidos desde el Backend)
                dias_para_inicio: Number(item.dias_para_inicio) || 0,
                urgencia: item.urgencia || 'normal',
                porcentaje_cupos: Number(item.porcentaje_cupos) || 0,
                match_score: Number(item.match_score) || 0,
                match_habilidades: Number(item.match_habilidades) || 0,
                match_disponibilidad: Boolean(item.match_disponibilidad),

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
    const fetchMisPostulaciones = async () => {
        //1. Verificamos autenticación
        if (localStorage.getItem('user_rol') !== 'voluntario') return;
        
        try {
            const data = await obtenerMisPostulaciones();
            setMisPostulaciones(data);
            console.log('📦 Postulaciones reales recibidas:', data);
        } catch (error) {
            console.error('Error al cargar postulaciones:', error);
        }
    };

    const fetchPostulacionesAdmin = async () => {
        if (localStorage.getItem('user_rol') === 'voluntario') return;
        try {
            const data = await obtenerTodasLasPostulaciones();
            setPostulacionesAdmin(data);
            console.log('📦 Todas las postulaciones (Admin) recibidas:', data);
        } catch (error) {
            console.error('Error al cargar todas las postulaciones:', error);
        }
    };

    const updateEstadoPostulacion = async (id, newStatus, reason = null) => {
        try {
            await cambiarEstadoPostulacion(id, newStatus, reason);
            await fetchPostulacionesAdmin(); // Recargamos para ver los cambios
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            throw error;
        }
    };

    const deletePostulacion = async (id) => {
        try {
            await eliminarPostulacion(id);
            await fetchPostulacionesAdmin(); // Recargamos para ver los cambios
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
            await fetchMisPostulaciones(); 
            return { success: true };
        } catch (error) {
            console.error("Error en la postulación:", error);
            throw error; 
        }
    };
    
    // 4. Validar si el voluntario ya está postulado a una convocatoria específica
    const hasApplied = (convocationId) => {
        return misPostulaciones.some(app => app.id_convocatoria === convocationId);
    };
    // 5. Obtener mis postulaciones (Filtra por el usuario logueado)
    const getPostulacionesVoluntario = () => {
        return misPostulaciones;
    };

    // ==========================================
    // 4. MÓDULO DE NOTIFICACIONES
    // ==========================================
    const cargarNotificaciones = async () => {
        try {
            const data = await obtenerMisNotificaciones();
            // El backend ahora devuelve { conteo_no_leidas: X, resultados: [...] }
            setNotificaciones(data.resultados || []);
            setConteoNoLeidas(data.conteo_no_leidas || 0);
            console.log('🔔 Notificaciones recibidas:', data);
        } catch (error) {
            console.error('❌ Error al cargar notificaciones:', error);
        }
    };

    const marcarComoLeida = async (id) => {
        try {
            await marcarNotificacionComoLeida(id);
            // Actualizamos el estado local UI Optimista
            setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));
            setConteoNoLeidas(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error al marcar notificación como leída:', error);
        }
    };

    const borrarNotificacion = async (id) => {
        try {
            await eliminarNotificacion(id);
            // Eliminamos localmente del estado para una UX instantánea
            setNotificaciones(prev => {
                const notif = prev.find(n => n.id === id);
                if (notif && !notif.leida) {
                    setConteoNoLeidas(c => Math.max(0, c - 1));
                }
                return prev.filter(n => n.id !== id);
            });
        } catch (error) {
            console.error('Error al eliminar notificación:', error);
            throw error;
        }
    };

    const vaciarNotificaciones = async () => {
        try {
            await eliminarTodasLasNotificaciones();
            // Vaciamos el estado local instantáneamente
            setNotificaciones([]);
            setConteoNoLeidas(0);
        } catch (error) {
            console.error('Error al vaciar notificaciones:', error);
            throw error;
        }
    };


    // ==========================================
    // CARGA UNIFICADA
    // ==========================================
    const refreshAllData = async () => {
        setLoading(true);
        // 1. Carga Pública (Siempre)
        const promises = [fetchConvocations(), fetchCampaigns()]; 
        
        // 2. Carga Privada (Solo si hay sesión)
        if (localStorage.getItem('access_token')) {
            promises.push(cargarNotificaciones());
            if (localStorage.getItem('user_rol') === 'voluntario') {
                promises.push(fetchMisPostulaciones());
            } else if (localStorage.getItem('user_rol') === 'administrador') {
                promises.push(fetchPostulacionesAdmin()); 
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
        getPostulacionesVoluntario,
        hasApplied,
        applyToConvocation,
        
        // Exportar para el Admin
        postulacionesAdmin,
        fetchPostulacionesAdmin,
        updateEstadoPostulacion,
        deletePostulacion,

        // Exportar Notificaciones
        notificaciones,
        cargarNotificaciones,
        marcarComoLeida,
        borrarNotificacion, 
        vaciarNotificaciones,
        conteoNoLeidas
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};