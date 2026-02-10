import { useState, useEffect } from 'react';
import { Megaphone, Users, Heart, DollarSign, ArrowRight, TrendingUp, Package, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout'; // <--- IMPORTAMOS LA PLANTILLA MAESTRA

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Nota: Ya no necesitamos user_name ni activeNav aquí, AdminLayout se encarga.

  // --- DATOS DE EJEMPLO (MOCKS) ---
  const campaigns = [
    {
      id: 1,
      title: 'Educación Primera Infancia',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: false,
      goalAmount: 1000000,
      raisedAmount: 700000,
      status: 'active'
    },
    {
      id: 2,
      title: 'Ropero Solidario',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: false,
      acceptsInKind: true,
      status: 'active'
    },
    {
      id: 3,
      title: 'Mercados para Familias',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: true,
      goalAmount: 500000,
      raisedAmount: 200000,
      status: 'active'
    },
  ];

  const applications = [
    {
      id: 1,
      volunteerName: 'María García López',
      convocationTitle: 'Tutor de Matemáticas',
      status: 'pending',
      appliedAt: '2024-03-15'
    }
  ];

  const donations = [
    { id: 1, type: 'money', status: 'completed', amount: 150000 }
  ];

  const totalRaised = donations
    .filter(d => d.type === 'money' && d.status === 'completed')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const stats = [
    {
      label: 'Campañas Activas',
      value: campaigns.filter(c => c.status === 'active').length,
      icon: Megaphone,
      color: 'primary',
      link: '/admin/campanas',
    },
    {
      label: 'Postulaciones Pendientes',
      value: applications.filter(a => a.status === 'pending').length,
      icon: Users,
      color: 'secondary',
      link: '/admin/voluntarios',
    },
    {
      label: 'Donaciones del Mes',
      value: donations.length,
      icon: Heart,
      color: 'error',
      link: '/admin/donaciones',
    },
    {
      label: 'Total Recaudado',
      value: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'compact',
      }).format(totalRaised),
      icon: DollarSign,
      color: 'success',
      link: '/admin/donaciones',
    },
  ];

  // --- RENDERIZADO USANDO EL LAYOUT ---
  return (
    <AdminLayout 
      title="Panel de Administración" 
      subtitle="Bienvenido al centro de control de FUNSAMEZ. Gestiona campañas, voluntarios y donaciones."
    >
      
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="card-elevated group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center
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
              <ArrowRight className="w-5 h-5 text-on-surface-variant 
                group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-headline-small text-on-surface font-bold mb-1">
              {stat.value}
            </p>
            <p className="text-body-medium text-on-surface-variant">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        
        {/* Recent Campaigns */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-large text-on-surface font-medium">
              Campañas Recientes
            </h2>
            <Link to="/admin/campanas" className="btn-text text-primary">
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {campaigns.slice(0, 3).map(campaign => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-container 
                  hover:bg-surface-container-high transition-colors"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-title-small text-on-surface font-medium truncate">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {campaign.acceptsMoney && (
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-label-small">
                        Monetaria
                      </span>
                    )}
                    {campaign.acceptsInKind && (
                      <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-label-small">
                        <Package className="w-3 h-3 inline mr-1" />
                        Especie
                      </span>
                    )}
                  </div>
                </div>
                {campaign.acceptsMoney && campaign.goalAmount && (
                  <div className="text-right">
                    <span className="text-title-small text-primary font-medium">
                      {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%
                    </span>
                    <p className="text-label-small text-on-surface-variant">recaudado</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending Applications */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-title-large text-on-surface font-medium">
              Postulaciones Pendientes
            </h2>
            <Link to="/admin/voluntarios" className="btn-text text-primary">
              Ver todas
            </Link>
          </div>
          {applications.filter(a => a.status === 'pending').length > 0 ? (
            <div className="space-y-3">
              {applications
                .filter(a => a.status === 'pending')
                .slice(0, 3)
                .map(app => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-surface-container"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-small text-on-surface font-medium truncate">
                        {app.volunteerName}
                      </h3>
                      <p className="text-body-small text-on-surface-variant truncate">
                        {app.convocationTitle}
                      </p>
                    </div>
                    <span className="badge-pending">
                      <Calendar className="w-3 h-3" />
                      {app.appliedAt}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-on-surface-variant mx-auto mb-3" />
              <p className="text-body-medium text-on-surface-variant">
                No hay postulaciones pendientes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-title-large font-medium mb-2">
              ¡Excelente trabajo este mes!
            </h3>
            <p className="text-body-medium text-white/90">
              Las donaciones han aumentado un 25% comparado con el mes anterior.
              Sigue impulsando las campañas activas.
            </p>
          </div>
          <Link
            to="/admin/donaciones"
            className="btn-filled bg-white text-primary hover:bg-white/90"
          >
            Ver Reportes
          </Link>
        </div>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;