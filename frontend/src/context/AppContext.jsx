import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp debe ser usado dentro de un AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Datos de prueba iniciales (Mock Data)
    const [convocations, setConvocations] = useState([
        {
            id: 1,
            title: 'Jornada de Salud Visual',
            description: 'Apoyo logístico para campaña de optometría.',
            status: 'published',
            applicants: 5,
            spots: 10,
            location: 'Centro',
            locationType: 'presencial',
            commitment: '4 horas',
            startDate: '2026-09-01',
            endDate: '2026-09-05'
        }
    ]);

    // --- Funciones Auxiliares (Simulación) ---
    
    const addConvocation = (data) => {
        const newConvocation = { 
            ...data, 
            id: Date.now(), 
            status: 'published', 
            applicants: 0 
        };
        setConvocations([...convocations, newConvocation]);
    };

    const updateConvocation = (id, data) => {
        setConvocations(convocations.map(c => c.id === id ? { ...c, ...data } : c));
    };

    const deleteConvocation = (id) => {
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