import { createContext, useContext, useState, useEffect } from 'react';
// Importamos Servicios de Convocatorias
import { obtenerConvocatorias } from '../services/convocatoriaService';
// Importamos Servicios de Campañas
import { obtenerCampanas } from '../services/campaignService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp debe ser usado dentro de un AppProvider');
    return context;
};

export const AppProvider = ({ children }) => {
    // --- ESTADOS GLOBALES ---
    const [convocations, setConvocations] = useState([]);
    const [campaigns, setCampaigns] = useState([]); // 🟢 Nuevo estado para Campañas
    const [loading, setLoading] = useState(true);

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
    // 3. MÓDULO VOLUNTARIO (Estados UI y Mocks)
    // ==========================================
    // Simulamos un usuario basado en el localStorage
    const [user, setUser] = useState({
        id: 1, 
        name: localStorage.getItem('user_name') || 'Voluntario',
        email: 'voluntario@funsamez.org',
        role: localStorage.getItem('user_role') || 'voluntario',
        skills: [],
        availability: []
    });

    const [applications, setApplications] = useState([]); // Simulador de postulaciones

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const updateProfile = (data) => {
        setUser({ ...user, ...data });
    };

    // --- Helpers de Convocatorias para el Voluntario ---
    const getPublishedConvocations = () => {
        return convocations.filter(c => c.status === 'published' || c.estado === 'abierta');
    };

    const getApplicationsByVolunteer = (userId) => {
        return applications.filter(a => a.userId === userId);
    };

    const hasApplied = (userId, convocationId) => {
        return applications.some(a => a.userId === userId && a.convocationId === convocationId);
    };

    const applyToConvocation = (convocationId, userData) => {
        const conv = convocations.find(c => c.id === convocationId);
        const newApp = {
            id: Date.now(),
            userId: userData.id,
            convocationId: convocationId,
            convocationTitle: conv?.title || conv?.titulo || 'Convocatoria',
            status: 'pending',
            appliedAt: new Date().toLocaleDateString('es-CO')
        };
        setApplications([...applications, newApp]);
        alert('¡Te has postulado exitosamente!'); // 🟢 Usamos alert por ahora para no complicarnos con Snackbar
    };

    const showToast = (msg) => alert(msg); 

    // --- CARGA INICIAL UNIFICADA ---
    const refreshAllData = async () => {
        setLoading(true);
        await Promise.all([fetchConvocations(), fetchCampaigns()]);
        setLoading(false);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            refreshAllData();
        } else {
            setLoading(false);
        }
    }, []);

    // --- FILTROS DE CAMPAÑAS (Helpers) ---
    const getActiveCampaigns = () => {
        return campaigns.filter(c => c.estado === 'activa' || c.estado === 'pausada');
    };

    const getClosedCampaigns = () => {
        return campaigns.filter(c => c.estado === 'completada' || c.estado === 'cancelada');
    };

    const value = {
        // Estado General
        loading,
        refreshAllData,

        // Convocatorias
        convocations,
        fetchConvocations,
        getActiveConvocations: () => convocations.filter(c => c.status !== 'closed'),
        getClosedConvocations: () => convocations.filter(c => c.status === 'closed'),

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
        getPublishedConvocations,
        getApplicationsByVolunteer,
        hasApplied,
        applyToConvocation
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};