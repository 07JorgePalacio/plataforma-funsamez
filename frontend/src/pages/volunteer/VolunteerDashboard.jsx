import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    Briefcase, FileText, Heart, ArrowRight,
    Clock, MapPin, CheckCircle2, Calendar
} from 'lucide-react';

export default function VolunteerDashboard() {
    const { user, getPublishedConvocations, getApplicationsByVolunteer, convocations, loading } = useApp();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando tu panel...</p>
            </div>
        );
    }

    // --- 1. DATOS REALES DE CONVOCATORIAS ---
    const publishedConvocations = getPublishedConvocations ? getPublishedConvocations() : convocations.filter(c => c.estado === 'publicada' || c.status === 'published');

    // --- 2. DATOS REALES DE POSTULACIONES (Mapeo y cruce de datos) ---
    const rawMyApplications = getApplicationsByVolunteer() || [];
    const myApplications = rawMyApplications.map(app => {

        const convocation = convocations.find(c => c.id === app.id_convocatoria);
        const convStatus = convocation ? (convocation.estado || convocation.status) : 'cerrada';
        const isConvClosed = convStatus === 'cerrada' || convStatus === 'closed' || convStatus === 'finalizada';
        const isHistory = app.estado === 'rechazada' || (isConvClosed && app.estado !== 'en_revision' && app.estado !== 'en_espera');

        return {
            ...app,
            convocationTitle: convocation ? convocation.title : 'Convocatoria no encontrada',
            appliedAt: app.fecha_postulacion ? new Date(app.fecha_postulacion).toLocaleDateString('es-CO') : 'Fecha desconocida',
    
            uiStatus: (app.estado === 'en_revision' || app.estado === 'en_espera') ? 'pending' : 
                      (app.estado === 'aprobada') ? 'accepted' : 
                      (app.estado === 'rechazada') ? 'rejected' : app.status,
            isHistory // <-- Marcador para filtrarla fácilmente
        };
    });

    // --- 3. FILTROS PARA ESTADÍSTICAS Y LISTAS ---
    const activeApplications = myApplications.filter(a => !a.isHistory);
    const pendingApplications = activeApplications.filter(a => a.uiStatus === 'pending');
    const acceptedApplications = activeApplications.filter(a => a.uiStatus === 'accepted');

    const stats = [
        {
            label: 'Convocatorias Abiertas',
            value: publishedConvocations.length,
            icon: Briefcase,
            color: 'primary',
            link: '/voluntario/convocatorias'
        },
        {
            label: 'Postulaciones Pendientes',
            value: pendingApplications.length,
            icon: Clock,
            color: 'warning',
            link: '/voluntario/postulaciones'
        },
        {
            label: 'Posiciones Activas',
            value: acceptedApplications.length,
            icon: CheckCircle2,
            color: 'success',
            link: '/voluntario/postulaciones'
        },
    ];

    const userName = user?.nombre || user?.name || 'Voluntario';

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    ¡Hola, {userName.split(' ')[0]}! 👋
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Bienvenido a tu portal de voluntariado. Aquí puedes gestionar tu perfil y postulaciones.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className="card-elevated group hover:scale-[1.02] transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                                ${stat.color === 'warning' ? 'bg-warning-container' : ''}
                                ${stat.color === 'success' ? 'bg-success-container' : ''}
                            `}>
                                <stat.icon className={`w-6 h-6
                                    ${stat.color === 'primary' ? 'text-primary' : ''}
                                    ${stat.color === 'warning' ? 'text-warning' : ''}
                                    ${stat.color === 'success' ? 'text-success' : ''}
                                `} />
                            </div>
                            <ArrowRight className="w-5 h-5 text-on-surface-variant 
                                   group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-display-small text-on-surface font-bold mb-1">
                            {stat.value}
                        </p>
                        <p className="text-body-medium text-on-surface-variant">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Recent Convocations */}
                <div className="card-elevated border-none bg-surface p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-title-large text-on-surface font-medium">
                            Convocatorias Recientes
                        </h2>
                        <Link to="/voluntario/convocatorias" className="btn-text text-primary">
                            Ver todas
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {/* Aumentamos a 3 el slice */}
                        {publishedConvocations.slice(0, 3).map(convocation => (
                            <div
                                key={convocation.id}
                                onClick={() => navigate('/voluntario/convocatorias', { state: { highlightId: convocation.id } })}
                                className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high hover:border-primary/30 transition-colors border border-outline-variant/30 cursor-pointer group"
                            >
                                <h3 className="text-title-medium text-on-surface font-bold mb-3 line-clamp-1" title={convocation.title}>
                                    {convocation.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Frijolito de Modalidad */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-label-small font-bold capitalize border border-outline-variant/50">
                                        <Clock className="w-3.5 h-3.5" />
                                        {convocation.modalidad || 'Presencial'}
                                    </span>
                                    {/* Frijolito de Ubicación */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-label-small font-bold truncate max-w-[150px] border border-outline-variant/50" title={convocation.ubicacion || 'Sede Principal'}>
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        {convocation.ubicacion || 'Sede Principal'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Applications Status */}
                <div className="card-elevated border-none bg-surface p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-title-large text-on-surface font-medium">
                            Estado de Postulaciones
                        </h2>
                        <Link to="/voluntario/postulaciones" className="btn-text text-primary">
                            Ver todas
                        </Link>
                    </div>

                    {activeApplications.length > 0 ? (
                        <div className="space-y-4">
                            {activeApplications.slice(0, 3).map(application => (
                                <div
                                    key={application.id}
                                    onClick={() => navigate('/voluntario/postulaciones', { state: { highlightId: application.id } })}
                                    className="p-4 rounded-2xl bg-surface-container flex items-center gap-4 border border-outline-variant/30 hover:bg-surface-container-high hover:border-secondary/30 transition-colors cursor-pointer group"
                                >
                                    <div className="flex-1 min-w-0 flex flex-col items-start gap-2">
                                        <h3 className="text-title-small text-on-surface font-bold line-clamp-1" title={application.convocationTitle}>
                                            {application.convocationTitle}
                                        </h3>
                                        {/* Frijolito de Fecha */}
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-wider border border-outline-variant/50">
                                            <Calendar className="w-3 h-3" />
                                            Postulado el {application.appliedAt}
                                        </span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-label-small font-medium whitespace-nowrap
                                        ${application.uiStatus === 'pending' ? 'bg-warning-container text-warning' : ''}
                                        ${application.uiStatus === 'accepted' ? 'bg-success-container text-success' : ''}
                                        ${application.uiStatus === 'rejected' ? 'bg-error-container text-error' : ''}
                                    `}>
                                        {application.uiStatus === 'pending' && 'Pendiente'}
                                        {application.uiStatus === 'accepted' && 'Aprobada'}
                                        {application.uiStatus === 'rejected' && 'Rechazada'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
                            <p className="text-body-medium text-on-surface-variant">
                                Aún no tienes postulaciones
                            </p>
                            <Link to="/voluntario/convocatorias" className="btn-tonal mt-4">
                                Explorar Convocatorias
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-title-large text-on-surface font-medium mb-2">
                            ¡Gracias por ser voluntario!
                        </h3>
                        <p className="text-body-medium text-on-surface-variant">
                            Tu dedicación y tiempo hacen posible que sigamos transformando vidas.
                            Juntos somos más fuertes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}