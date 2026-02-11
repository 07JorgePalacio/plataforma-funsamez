import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerConvocatorias } from '../services/convocatoriaService';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp debe ser usado dentro de un AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Iniciamos la lista vacía
    const [convocations, setConvocations] = useState([]);

    // --- MAGIA: FUNCIÓN PARA TRAER DATOS REALES ---
    const fetchConvocations = async () => {
        try {
            const data = await obtenerConvocatorias();
            
            // "Traducimos" los nombres del backend a los que usa tu diseño frontend
            const formattedData = data.map(item => ({
                id: item.id,
                title: item.titulo,
                description: item.descripcion || 'Sin descripción',
                status: item.estado === 'abierta' ? 'published' : item.estado === 'cerrada' ? 'closed' : item.estado,
                applicants: 0, // En un futuro lo conectaremos a las postulaciones reales
                spots: item.cupos_disponibles,
                location: 'Ver descripción', // Como no lo tenemos separado en BD, ponemos esto
                locationType: 'presencial', 
                commitment: 'Ver detalles',
                startDate: item.fecha_inicio ? item.fecha_inicio.split('T')[0] : '', // Cortamos la hora para dejar solo fecha
                endDate: item.fecha_fin ? item.fecha_fin.split('T')[0] : ''
            }));
            
            setConvocations(formattedData);
        } catch (error) {
            console.error("Error al cargar convocatorias reales:", error);
        }
    };

    // Esto se ejecuta automáticamente cuando entras a la plataforma
    useEffect(() => {
        // Solo llamamos al backend si hay un token (usuario logueado)
        if (localStorage.getItem('access_token')) {
            fetchConvocations();
        }
    }, []);

    // --- Funciones Auxiliares (Actualizadas para refrescar la lista) ---
    const addConvocation = () => {
        fetchConvocations(); // Recarga la lista desde el backend
    };

    const updateConvocation = (id, data) => {
        // Mock visual mientras hacemos el endpoint de editar
        setConvocations(convocations.map(c => c.id === id ? { ...c, ...data } : c));
    };

    const deleteConvocation = (id) => {
        // Mock visual mientras hacemos el endpoint de eliminar
        setConvocations(convocations.filter(c => c.id !== id));
    };

    const pauseConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: c.status === 'paused' ? 'published' : 'paused' } : c
        ));
    };

    const publishConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: 'published' } : c
        ));
    };

    const closeConvocation = (id) => {
        setConvocations(convocations.map(c => 
            c.id === id ? { ...c, status: 'closed' } : c
        ));
    };

    const getActiveConvocations = () => {
        return convocations.filter(c => c.status !== 'closed');
    };

    const getClosedConvocations = () => {
        return convocations.filter(c => c.status === 'closed');
    };

    const value = {
        convocations,
        fetchConvocations, // Exportamos esta función por si necesitamos recargar manualmente
        addConvocation,
        updateConvocation,
        deleteConvocation,
        pauseConvocation,
        publishConvocation,
        closeConvocation,
        getActiveConvocations,
        getClosedConvocations
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};