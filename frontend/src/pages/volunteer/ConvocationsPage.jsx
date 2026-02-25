import { useApp } from '../../context/AppContext';
import {
    Clock, MapPin, Users, CheckCircle, AlertCircle,
    Briefcase, ArrowRight, Calendar, Gift
} from 'lucide-react';

export default function ConvocationsPage() {
    const { user, logout, updateProfile, getPublishedConvocations, applyToConvocation, hasApplied, getApplicationsByVolunteer, convocations } = useApp();

    const publishedConvocations = getPublishedConvocations();

    const handleApply = (convocationId) => {
        applyToConvocation(convocationId, {
            id: user.id,
            name: user.name,
            email: user.email,
        });
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
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
                    <h3 className="text-title-large text-on-surface mb-2">
                        No hay convocatorias abiertas
                    </h3>
                    <p className="text-body-large text-on-surface-variant">
                        Vuelve pronto para ver nuevas oportunidades de voluntariado.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {publishedConvocations.map(convocation => {
                        const alreadyApplied = hasApplied(user?.id, convocation.id);

                        return (
                            <div
                                key={convocation.id}
                                className="card-elevated hover:shadow-elevation-3 transition-all"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-title-large text-on-surface font-medium mb-2">
                                                    {convocation.title}
                                                </h3>
                                                
                                                <div className="flex flex-wrap items-center gap-3 text-body-small text-on-surface-variant">
                                                    <span className="flex items-center gap-1 capitalize">
                                                        <Clock className="w-4 h-4" />
                                                        {convocation.modalidad || 'Presencial'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {convocation.ubicacion || 'Sede Principal'}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {convocation.cupos_disponibles || 1} cupos disponibles
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Spots Badge */}
                                            <span className={`px-3 py-1 rounded-full text-label-medium flex-shrink-0
                                                ${(convocation.cupos_disponibles || 1) > 2
                                                    ? 'bg-success-container text-success'
                                                    : 'bg-warning-container text-warning'
                                                }`}>
                                                {convocation.cupos_disponibles || 1} vacantes
                                            </span>
                                        </div>

                                        <p className="text-body-medium text-on-surface-variant mb-4">
                                            {convocation.description}
                                        </p>

                                        {/* Requirements / Categorías (Evitamos el Crash) */}
                                        <div className="mb-4">
                                            <h4 className="text-label-large text-on-surface mb-2">Categorías / Requisitos:</h4>
                                            <ul className="space-y-1">
                                                {(convocation.categorias || []).map((req, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center gap-2 text-body-small text-on-surface-variant"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        {/* Apply Button */}
                                        {alreadyApplied ? (
                                            <div className="flex items-center gap-2 text-success">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="text-label-large font-medium">Ya te has postulado</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleApply(convocation.id)}
                                                className="btn-filled"
                                            >
                                                Postularme
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info Banner */}
            <div className="mt-8 p-4 rounded-xl bg-secondary/10 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-body-medium text-on-surface">
                        <strong>Nota:</strong> Una vez te postules, nuestro equipo revisará tu perfil
                        y te contactaremos con el resultado. Asegúrate de tener tu perfil actualizado.
                    </p>
                </div>
            </div>
        </div>
    );
}
