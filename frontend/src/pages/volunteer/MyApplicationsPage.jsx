import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';

export default function MyApplicationsPage() {
    // 🟢 1. Obtenemos los datos reales
    const { getApplicationsByVolunteer, convocations } = useApp();
    const applications = getApplicationsByVolunteer();

    // 🟢 2. Mapeamos los estados del backend de Python a UI de React
    const getStatusInfo = (estado, motivoRechazo = null) => {
        switch (estado) {
            case 'en_revision':
                return { label: 'En Revisión', color: 'warning', icon: Clock, description: 'Tu postulación está siendo revisada por nuestro equipo.' };
            case 'aprobada':
                return { label: 'Aprobada', color: 'success', icon: CheckCircle2, description: '¡Felicidades! Has sido aceptado. Mantente atento a tu correo para instrucciones.' };
            case 'rechazada':
                return { label: 'No Seleccionado', color: 'error', icon: XCircle, description: motivoRechazo ? `Motivo: ${motivoRechazo}` : 'En esta ocasión no fuiste seleccionado. ¡Sigue intentando!' };
            default:
                return { label: 'Desconocido', color: 'secondary', icon: AlertCircle, description: '' };
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Mis Postulaciones
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Haces seguimiento al estado de tus postulaciones a las diferentes convocatorias.
                </p>
            </div>

            {applications.length === 0 ? (
                <div className="card-elevated text-center py-12">
                    <Clock className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                    <h3 className="text-title-large text-on-surface mb-2">Aún no te has postulado a nada</h3>
                    <p className="text-body-medium text-on-surface-variant max-w-md mx-auto mb-6">
                        Explora las convocatorias abiertas y encuentra la oportunidad perfecta para ayudar.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {applications.map((app) => {
                        // Buscamos la convocatoria para mostrar el título
                        const convocation = convocations.find(c => c.id === app.id_convocatoria);
                        const statusInfo = getStatusInfo(app.estado, app.motivo_rechazo);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div key={app.id} className="card-elevated p-6 md:p-8 relative overflow-hidden">
                                {/* Barra de color de estado lateral */}
                                <div className={`absolute left-0 top-0 bottom-0 w-2 bg-${statusInfo.color}`}></div>
                                
                                <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between pl-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`chip bg-${statusInfo.color}/10 text-${statusInfo.color} border-${statusInfo.color}/20 border font-medium flex items-center gap-1.5`}>
                                                <StatusIcon className="w-4 h-4" />
                                                {statusInfo.label}
                                            </span>
                                            <span className="text-body-small text-on-surface-variant flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" /> 
                                                {new Date(app.fecha_postulacion).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-title-large font-bold text-on-surface mb-2">
                                            {convocation ? convocation.title : 'Convocatoria no encontrada'}
                                        </h3>
                                        
                                        <div className="mt-4 p-4 bg-surface-container rounded-xl">
                                            <p className="text-body-medium text-on-surface font-medium flex items-center gap-2 mb-1">
                                                <AlertCircle className="w-4 h-4 text-primary" /> 
                                                Estado Actual:
                                            </p>
                                            <p className="text-body-medium text-on-surface-variant">
                                                {statusInfo.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}