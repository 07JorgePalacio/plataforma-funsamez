import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
    Clock, MapPin, Users, CheckCircle, AlertCircle,
    Briefcase, ArrowRight, X, Calendar
} from 'lucide-react';

export default function ConvocationsPage() {
    // 🟢 1. Usamos las funciones actualizadas del Contexto Real
    const { applyToConvocation, hasApplied, getActiveConvocations } = useApp();
    const publishedConvocations = getActiveConvocations();

    // 🟢 2. Estados para el modal de postulación (Observaciones)
    const [selectedConvocationId, setSelectedConvocationId] = useState(null);
    const [observaciones, setObservaciones] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedConvocationId(id);
        setObservaciones('');
    };

    const handleConfirmApply = async () => {
        if (!selectedConvocationId) return;
        setIsSubmitting(true);
        try {
            await applyToConvocation(selectedConvocationId, observaciones);
            setSelectedConvocationId(null); // Cerramos el modal
        } catch (error) {
            console.error("Error al postular:", error);
            alert("Ocurrió un error al postularte. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in relative">
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Convocatorias Abiertas
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Explora las oportunidades de voluntariado disponibles y postúlate a las que más te interesen.
                </p>
            </div>

            {publishedConvocations.length === 0 ? (
                <div className="card-elevated text-center py-12">
                    <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                    <h3 className="text-title-large text-on-surface mb-2">No hay convocatorias abiertas</h3>
                    <p className="text-body-medium text-on-surface-variant max-w-md mx-auto">
                        Actualmente no tenemos posiciones de voluntariado disponibles. Por favor, vuelve a revisar pronto.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {publishedConvocations.map((convocation) => {
                        const isAlreadyApplied = hasApplied(convocation.id);
                        return (
                            <div key={convocation.id} className="card-elevated overflow-hidden flex flex-col md:flex-row">
                                <div className="p-6 flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="chip bg-primary/10 text-primary">
                                                    {convocation.categoria || 'Voluntariado'}
                                                </span>
                                            </div>
                                            <h3 className="text-title-large font-bold text-on-surface">
                                                {convocation.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-body-medium text-on-surface-variant mb-6 line-clamp-2">
                                        {convocation.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-body-small text-on-surface-variant mb-6">
                                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Inicio: {convocation.fecha_inicio}</div>
                                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {convocation.ubicacion || 'Por definir'}</div>
                                        <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {convocation.cupos_totales} cupos totales</div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                                        {isAlreadyApplied ? (
                                            <div className="flex items-center gap-2 text-primary">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="text-label-large font-medium">Ya te has postulado</span>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleOpenModal(convocation.id)} className="btn-filled">
                                                Postularme <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 🟢 MODAL DE OBSERVACIONES */}
            {selectedConvocationId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-surface rounded-3xl w-full max-w-md shadow-elevation-5 overflow-hidden">
                        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                            <h3 className="text-title-large font-bold">Completar Postulación</h3>
                            <button onClick={() => setSelectedConvocationId(null)} className="p-2 hover:bg-surface-container-high rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <label className="block text-label-large text-on-surface mb-2">
                                ¿Por qué te gustaría participar? (Opcional)
                            </label>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                placeholder="Tengo experiencia en esto, tengo disponibilidad inmediata..."
                                className="w-full p-4 rounded-xl border border-outline-variant focus:border-primary outline-none min-h-[120px] bg-surface-container"
                            />
                            <div className="mt-6 flex gap-3 justify-end">
                                <button onClick={() => setSelectedConvocationId(null)} className="btn-tonal">Cancelar</button>
                                <button onClick={handleConfirmApply} disabled={isSubmitting} className="btn-filled">
                                    {isSubmitting ? 'Enviando...' : 'Confirmar Postulación'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}