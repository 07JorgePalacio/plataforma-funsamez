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

    // --- FUNCIÓN PARA TRAER DATOS REALES (CORREGIDA) ---
    const fetchConvocations = async () => {
        try {
            const data = await obtenerConvocatorias();
            
            console.log('📦 Datos recibidos del backend:', data);
            
            // ✅ MANTENER TODOS LOS DATOS DEL BACKEND
            // Agregamos traducciones al inglés para la UI, pero conservamos los campos originales
            const formattedData = data.map(item => ({
                // --- IDs y Estados ---
                id: item.id,
                status: item.estado === 'abierta' ? 'published' : item.estado === 'cerrada' ? 'closed' : item.estado,
                
                // --- CAMPOS DEL BACKEND (originales en español) ---
                titulo: item.titulo,
                descripcion: item.descripcion,
                ubicacion: item.ubicacion,                      // ✅ Mantener
                link_whatsapp: item.link_whatsapp,              // ✅ Mantener
                fecha_inicio: item.fecha_inicio,                // ✅ Mantener completa
                fecha_fin: item.fecha_fin,                      // ✅ Mantener completa
                cupos_disponibles: item.cupos_disponibles,
                estado: item.estado,
                habilidades_requeridas: item.habilidades_requeridas,  // ✅ Mantener
                fecha_creacion: item.fecha_creacion,
                categorias: item.categorias || [],              // ✅ Mantener
                horario: item.horario || {},                    // ✅ Mantener
                
                // --- TRADUCCIONES AL INGLÉS (para UI de listado) ---
                title: item.titulo,
                description: item.descripcion || 'Sin descripción',
                location: item.ubicacion || 'No especificada',  // ✅ Usar dato real
                spots: item.cupos_disponibles,
                startDate: item.fecha_inicio ? item.fecha_inicio.split('T')[0] : '',
                endDate: item.fecha_fin ? item.fecha_fin.split('T')[0] : '',
                
                // --- CAMPOS CALCULADOS/EXTRA ---
                applicants: 0,  // En futuro conectar con postulaciones reales

            }));
            
            console.log('✅ Datos formateados para el contexto:', formattedData);
            setConvocations(formattedData);
        } catch (error) {
            console.error("❌ Error al cargar convocatorias reales:", error);
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
