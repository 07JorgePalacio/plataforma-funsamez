import { useState, useEffect } from 'react';
import { Megaphone, Users, Heart, DollarSign, ArrowRight, TrendingUp, Package, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const AdminDashboard = () => {
  const { getActiveCampaigns, adminApplications, convocations } = useApp();
  const navigate = useNavigate();

  // --- 1. DATOS REALES (Campañas) ---
  const activeCampaigns = getActiveCampaigns();
  // Ordenamos para obtener las 3 más recientes
  const recentCampaigns = [...activeCampaigns]
    .sort((a, b) => new Date(b.fecha_creacion || 0) - new Date(a.fecha_creacion || 0))
    .slice(0, 3);

  // --- 2. DATOS REALES (Postulaciones) ---
  const pendingApplications = adminApplications.filter(a => a.estado === 'en_revision' || a.estado === 'en_espera');
  
  // Ordenamos por más recientes, obtenemos las 3 últimas y cruzamos los datos exactos
  const mappedRecentApplications = [...pendingApplications]
    .sort((a, b) => new Date(b.fecha_postulacion || 0) - new Date(a.fecha_postulacion || 0))
    .slice(0, 3)
    .map(app => {
      const convocation = convocations.find(c => c.id === app.id_convocatoria);
      return {
        ...app,
        volunteerName: app.nombre_usuario || `Voluntario #${app.id_usuario}`,
        convocationTitle: convocation ? convocation.title : 'Convocatoria Eliminada/Desconocida'
      };
    });

  // --- 3. PREPARATIVO SPRINT 3 (Donaciones) ---
  const totalDonationsMonth = 0; 
  const totalRaised = 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const stats = [
    {
      label: 'Campañas Activas',
      value: activeCampaigns.length,
      icon: Megaphone,
      color: 'primary',
      link: '/admin/campanas',
    },
    {
      label: 'Postulaciones Pendientes',
      value: pendingApplications.length,
      icon: Users,
      color: 'secondary',
      link: '/admin/voluntarios',
    },
    {
      label: 'Donaciones del Mes',
      value: totalDonationsMonth,
      icon: Heart,
      color: 'error',
      link: '/admin/donaciones',
    },
    {
      label: 'Total Recaudado',
      value: formatCurrency(totalRaised),
      icon: DollarSign,
      color: 'success',
      link: '/admin/donaciones',
    },
  ];

  // --- RENDERIZADO ---
  return (
    <div className="animate-fade-in pb-12">

      <div className="mb-6 md:mb-8 mt-2 md:mt-0">
          <h1 className="text-headline-small md:text-headline-medium text-on-surface font-bold mb-1 md:mb-2">
              Panel de Administración
          </h1>
          <p className="text-body-medium md:text-body-large text-on-surface-variant">
              Bienvenido al centro de control de FUNSAMEZ. Gestiona campañas, voluntarios y donaciones
          </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="card-elevated group hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner
                ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                ${stat.color === 'secondary' ? 'bg-secondary/10' : ''}
                ${stat.color === 'error' ? 'bg-error/10' : ''}
                ${stat.color === 'success' ? 'bg-success/10' : ''}
              `}>
                <stat.icon className={`w-6 h-6
                  ${stat.color === 'primary' ? 'text-primary' : ''}
                  ${stat.color === 'secondary' ? 'text-secondary' : ''}
                  ${stat.color === 'error' ? 'text-error' : ''}
                  ${stat.color === 'success' ? 'text-success' : ''}
                `} />
              </div>
              <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-headline-medium text-on-surface font-bold mb-1 truncate">
              {stat.value}
            </p>
            <p className="text-body-medium font-medium text-on-surface-variant truncate" title={stat.label}>
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 w-full">
        
        {/* Recent Campaigns */}
        <div className="card-elevated border-none bg-surface p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
            <h2 className="text-title-large text-on-surface font-bold flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-primary" /> Campañas Recientes
            </h2>
            <Link to="/admin/campanas" className="text-sm font-bold text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          
          {recentCampaigns.length > 0 ? (
            <div className="space-y-4">
              {recentCampaigns.map(campaign => {
                const progress = campaign.monto_objetivo > 0 
                  ? Math.min(100, ((campaign.recaudo_actual || 0) / campaign.monto_objetivo) * 100) 
                  : 0;

                return (
                  <div 
                    key={campaign.id} 
                    onClick={() => navigate('/admin/campanas', { state: { highlightId: campaign.id } })}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low hover:border-primary/30 transition-colors group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container-high shrink-0 shadow-sm relative">
                      {campaign.imagen_url ? (
                        <img src={campaign.imagen_url} alt={campaign.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant"><ImageIcon className="w-6 h-6 opacity-50"/></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-small text-on-surface font-bold truncate mb-1">
                        {campaign.titulo}
                      </h3>
                      <div className="flex items-center gap-2">
                        {campaign.permite_donacion_monetaria && (
                          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                            Monetaria
                          </span>
                        )}
                        {campaign.permite_donacion_especie && (
                          <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Package className="w-3 h-3" /> Especie
                          </span>
                        )}
                      </div>
                      
                      {campaign.permite_donacion_monetaria && campaign.monto_objetivo > 0 && (
                        <div className="mt-3">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-on-surface-variant">{Math.round(progress)}% Recaudado</span>
                           </div>
                           <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50">
              <Heart className="w-10 h-10 text-on-surface-variant mx-auto mb-3 opacity-30" />
              <p className="text-body-medium text-on-surface-variant font-medium">No hay campañas activas</p>
            </div>
          )}
        </div>

        {/* Pending Applications */}
        <div className="card-elevated border-none bg-surface p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
            <h2 className="text-title-large text-on-surface font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" /> Postulaciones Pendientes
            </h2>
            <Link to="/admin/voluntarios" className="text-sm font-bold text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          
          {mappedRecentApplications.length > 0 ? (
            <div className="space-y-4">
              {mappedRecentApplications.map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => navigate('/admin/voluntarios', { state: { highlightId: app.id } })}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/30 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-title-medium shrink-0 border border-secondary/20">
                      {app.volunteerName ? app.volunteerName.charAt(0).toUpperCase() : <Users className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-small text-on-surface font-bold truncate">
                        {app.volunteerName}
                      </h3>
                      <p className="text-body-small text-on-surface-variant truncate font-medium flex items-center gap-1.5">
                         <Megaphone className="w-3.5 h-3.5" /> {app.convocationTitle}
                      </p>
                    </div>
                    
                    <div className="shrink-0 flex flex-col items-end gap-2">
                       <span className="flex items-center gap-1 text-[10px] font-bold text-warning-dark bg-warning/10 px-2.5 py-1 rounded-md border border-warning/20 uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> Pendiente
                       </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50">
              <Users className="w-10 h-10 text-on-surface-variant mx-auto mb-3 opacity-30" />
              <p className="text-body-medium text-on-surface-variant font-medium">Todo al día. No hay postulaciones pendientes.</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Banner (Preparado para Sprint 3) */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-primary to-secondary text-white shadow-elevation-3 relative overflow-hidden isolate">
        {/* Decoración M3 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/30 shadow-inner">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-headline-small font-bold mb-2 tracking-tight">
              Prepara tu motor de donaciones
            </h3>
            <p className="text-body-large text-white/90 max-w-2xl">
              ¡Casi listos! El próximo paso activará el flujo financiero para recibir pagos y donaciones en especie automáticamente.
            </p>
          </div>
          <Link
            to="/admin/donaciones"
            className="btn-filled bg-white text-primary hover:bg-surface-container-lowest px-8 py-3.5 text-sm shadow-lg active:scale-95 transition-transform font-bold"
          >
            Ver Módulo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;