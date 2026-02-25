import { useApp } from '../../context/AppContext';
import {
    FileText, Clock, CheckCircle2, XCircle, MessageCircle,
    ExternalLink, AlertCircle, Pause, Award
} from 'lucide-react';

export default function MyApplicationsPage() {
    const { user, logout, updateProfile, getPublishedConvocations, applyToConvocation, hasApplied, getApplicationsByVolunteer, convocations } = useApp();

    const applications = getApplicationsByVolunteer(user?.id);

    const getStatusInfo = (status, rejectionReason = null, assignedRole = null) => {
        switch (status) {
            case 'pending':
                return {
                    label: 'Pendiente',
                    color: 'warning',
                    icon: Clock,
                    description: 'Tu postulación está siendo revisada por nuestro equipo.',
                };
            case 'on_hold':
                return {
                    label: 'En Espera',
                    color: 'secondary',
                    icon: Pause,
                    description: 'Tu postulación está en lista de espera. Te contactaremos pronto.',
                };
            case 'accepted':
                return {
                    label: 'Aceptado',
                    color: 'success',
                    icon: CheckCircle2,
                    description: assignedRole
                        ? `¡Felicidades! Has sido aceptado como ${assignedRole}. Únete al grupo de WhatsApp.`
                        : '¡Felicidades! Has sido aceptado. Únete al grupo de WhatsApp para más información.',
                };
            case 'rejected':
                return {
                    label: 'Rechazado',
                    color: 'error',
                    icon: XCircle,
                    description: rejectionReason
                        ? `Lamentablemente no fuiste seleccionado. Motivo: ${rejectionReason}`
                        : 'Lamentablemente no fuiste seleccionado esta vez. ¡Sigue intentando!',
                };
            default:
                return {
                    label: 'Desconocido',
                    color: 'outline',
                    icon: AlertCircle,
                    description: '',
                };
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Mis Postulaciones
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Revisa el estado de tus postulaciones a las diferentes convocatorias.
                </p>
            </div>

            {applications.length === 0 ? (
                <div className="card-elevated text-center py-12">
                    <FileText className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                    <h3 className="text-title-large text-on-surface mb-2">
                        No tienes postulaciones
                    </h3>
                    <p className="text-body-large text-on-surface-variant mb-6">
                        Explora las convocatorias disponibles y postúlate a las que te interesen.
                    </p>
                    <a href="/voluntario/convocatorias" className="btn-filled">
                        Ver Convocatorias
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map(application => {
                        const statusInfo = getStatusInfo(application.status, application.rejectionReason, application.assignedRole);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div
                                key={application.id}
                                className="card-elevated"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Status Icon */}
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                    ${statusInfo.color === 'warning' ? 'bg-warning-container' : ''}
                    ${statusInfo.color === 'secondary' ? 'bg-secondary-container' : ''}
                    ${statusInfo.color === 'success' ? 'bg-success-container' : ''}
                    ${statusInfo.color === 'error' ? 'bg-error-container' : ''}
                  `}>
                                        <StatusIcon className={`w-7 h-7
                      ${statusInfo.color === 'warning' ? 'text-warning' : ''}
                      ${statusInfo.color === 'secondary' ? 'text-secondary' : ''}
                      ${statusInfo.color === 'success' ? 'text-success' : ''}
                      ${statusInfo.color === 'error' ? 'text-error' : ''}
                    `} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                            <h3 className="text-title-large text-on-surface font-medium">
                                                {application.convocationTitle}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-label-medium font-medium w-fit
                        ${statusInfo.color === 'warning' ? 'bg-warning-container text-warning' : ''}
                        ${statusInfo.color === 'secondary' ? 'bg-secondary-container text-secondary' : ''}
                        ${statusInfo.color === 'success' ? 'bg-success-container text-success' : ''}
                        ${statusInfo.color === 'error' ? 'bg-error-container text-error' : ''}
                      `}>
                                                {statusInfo.label}
                                            </span>
                                        </div>

                                        <p className="text-body-medium text-on-surface-variant mb-3">
                                            {statusInfo.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-body-small text-on-surface-variant">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                Aplicado el {application.appliedAt}
                                            </span>
                                        </div>

                                        {/* WhatsApp Link for Accepted Applications */}
                                        {application.status === 'accepted' && application.whatsappLink && (
                                            <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20">
                                                <div className="flex items-center gap-3">
                                                    <MessageCircle className="w-6 h-6 text-success" />
                                                    <div className="flex-1">
                                                        <p className="text-label-large text-success font-medium">
                                                            Grupo de WhatsApp
                                                        </p>
                                                        <p className="text-body-small text-on-surface-variant">
                                                            Únete para coordinar con el equipo
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={application.whatsappLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-filled bg-success hover:bg-success/90 py-2"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Unirse
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Legend */}
            <div className="mt-8 p-4 rounded-xl bg-surface-container">
                <h4 className="text-label-large text-on-surface mb-3">Estados de postulación:</h4>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-warning"></span>
                        <span className="text-body-small text-on-surface-variant">Pendiente - En revisión</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-secondary"></span>
                        <span className="text-body-small text-on-surface-variant">En Espera - Lista de espera</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-success"></span>
                        <span className="text-body-small text-on-surface-variant">Aceptado - ¡Bienvenido!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-error"></span>
                        <span className="text-body-small text-on-surface-variant">Rechazado - Sin vacantes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
