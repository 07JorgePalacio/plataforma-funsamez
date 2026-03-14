import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Heart, Package, Target, Building, Eye, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Componente Local para Compartir ---
function ShareButton({ title, url }) {
    const [copied, setCopied] = useState(false);
    const handleShare = async () => {
        if (navigator.share) {
            try { await navigator.share({ title, url }); } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    return (
        <button onClick={handleShare} className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors shadow-sm" title="Compartir">
            {copied ? <Check className="w-5 h-5 text-success" /> : <Share2 className="w-5 h-5" />}
        </button>
    );
}

// --- Tarjeta de Campaña ---
function CampaignCard({ campaign, onDonate, currentFilter, currentPage, isHighlighted }) {
    const navigate = useNavigate();
    const progress = campaign.monto_objetivo
        ? Math.round((campaign.recaudo_actual / campaign.monto_objetivo) * 100)
        : 0;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount || 0);
    };

    const handleViewDetails = () => {
        // Llenamos la "mochila" con el filtro y página actual antes de ir a detalles
        navigate(`/campanas/${campaign.id}`, { state: { filter: currentFilter, currentPage } });
    };

    return (
        <div 
            id={`campaign-card-${campaign.id}`} 
            className={`card-elevated overflow-hidden group flex flex-col h-full transition-all duration-500 relative border ${isHighlighted ? 'border-primary ring-4 ring-primary/40 bg-primary/5 scale-[1.02] shadow-xl z-10' : 'border-outline-variant/30 bg-surface hover:-translate-y-1 hover:shadow-elevation-4 scale-100 z-0'}`}
        >
            {/* Image */}
            <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-surface-container-highest shrink-0 rounded-t-2xl isolate transform-gpu">
                {campaign.imagen_url ? (
                    <img
                        src={campaign.imagen_url}
                        alt={campaign.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant"><Building size={48} opacity={0.3}/></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Share Button */}
                <div className="absolute top-4 left-4">
                    <ShareButton title={campaign.titulo} url={`${window.location.origin}/campanas`} />
                </div>

                {/* Type Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                    {campaign.permite_donacion_monetaria && (
                        <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <Heart className="w-3.5 h-3.5" /> Monetaria
                        </span>
                    )}
                    {campaign.permite_donacion_especie && (
                        <span className="px-3 py-1 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                            <Package className="w-3.5 h-3.5" /> En Especie
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-title-large text-on-surface font-bold line-clamp-2 mb-3" title={campaign.titulo}>
                    {campaign.titulo}
                </h3>
                
                {/* El flex-1 aquí empuja todo lo que está abajo hacia el fondo */}
                <p className="text-body-medium text-on-surface-variant line-clamp-3 mb-5 flex-1">
                    {campaign.descripcion}
                </p>

                {/* Needs List (only for in-kind campaigns) */}
                {campaign.permite_donacion_especie && campaign.necesidades && campaign.necesidades.length > 0 && (
                    <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider">
                            <Target className="w-3.5 h-3.5" /> Necesitamos:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {campaign.necesidades.slice(0, 3).map((item, index) => (
                                <span key={index} className="px-2.5 py-1.5 rounded-md bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold">
                                    {item}
                                </span>
                            ))}
                            {campaign.necesidades.length > 3 && (
                                <span className="px-2.5 py-1.5 rounded-md bg-surface-container text-on-surface-variant text-[10px] font-bold">
                                    +{campaign.necesidades.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Progress Bar (only for monetary campaigns) */}
                {campaign.permite_donacion_monetaria && campaign.monto_objetivo > 0 && (
                    <div className="space-y-2 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 mb-5">
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-on-surface-variant">Recaudado</span>
                            <span className="text-primary">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-primary transition-all duration-1000 rounded-full"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant">
                            <span className="text-primary">{formatCurrency(campaign.recaudo_actual)}</span>
                            <span>Meta: {formatCurrency(campaign.monto_objetivo)}</span>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-5 border-t border-outline-variant/30">
                    <button onClick={handleViewDetails} className="btn-tonal flex-1 py-3.5 text-sm font-bold justify-center rounded-xl">
                        <Eye className="w-4 h-4 mr-1.5" /> Detalles
                    </button>
                    <button onClick={() => onDonate(campaign)} className="btn-filled flex-1 py-3.5 text-sm font-bold justify-center rounded-xl shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-95">
                        <Heart className="w-4 h-4 mr-1.5" /> Donar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PublicCampaignsPage() {
    const { getPublicCampaigns, loading } = useApp();
    const campaigns = getPublicCampaigns();
    const location = useLocation();

    // 1. Persistencia: Leemos la mochila si existe, si no, usamos valores por defecto
    const [filter, setFilter] = useState(location.state?.filter || 'all');
    const [currentPage, setCurrentPage] = useState(location.state?.currentPage || 1);
    const [highlightedCard, setHighlightedCard] = useState(null);
    const ITEMS_PER_PAGE = 6;

    // 2. Motor de Smart Scroll & Highlight
    useEffect(() => {
        const highlightId = location.state?.highlightId;
        
        if (highlightId && !loading && campaigns.length > 0) {
            setTimeout(() => {
                const element = document.getElementById(`campaign-card-${highlightId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setHighlightedCard(Number(highlightId));

                    setTimeout(() => {
                        setHighlightedCard(null);
                        window.history.replaceState({}, document.title);
                    }, 3000);
                }
            }, 150);
        }
    }, [location.state?.highlightId, loading, campaigns.length]);

    const filteredCampaigns = campaigns.filter(c => {
        if (filter === 'money') return c.permite_donacion_monetaria;
        if (filter === 'inkind') return c.permite_donacion_especie;
        return true;
    });

    // Paginación matemática
    const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
    const paginatedCampaigns = filteredCampaigns.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // Regresamos a la pag 1 al filtrar
    };

    const handleDonate = (campaign) => {
        alert(campaign ? `Pasarela de pagos para: ${campaign.titulo} en desarrollo.` : "Pasarela de donación general en desarrollo.");
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-surface py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando campañas...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-surface py-8 sm:py-12 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-label-large mb-4">
                        <Heart className="w-4 h-4" />
                        Apoya Nuestras Causas
                    </span>
                    <h1 className="text-display-small sm:text-display-medium text-on-surface font-bold mb-4">
                        Campañas Activas
                    </h1>
                    <p className="text-body-large text-on-surface-variant max-w-2xl mx-auto">
                        Explora nuestras campañas y elige cómo quieres contribuir.
                        Cada donación, grande o pequeña, hace la diferencia.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
                    {[
                        { key: 'all', label: 'Todas' },
                        { key: 'money', label: 'Monetarias' },
                        { key: 'inkind', label: 'En Especie' },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => handleFilterChange(f.key)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm
                ${filter === f.key
                                    ? 'bg-primary text-white scale-105 ring-4 ring-primary/20'
                                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* General Donation Card (Lava Lamp Animated) */}
                <div className="mb-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary via-institutional to-primary bg-[length:200%_200%] animate-lava-lamp text-white shadow-xl shadow-primary/20 relative overflow-hidden isolate">
                    {/* Background decor */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-15 rounded-full blur-3xl z-0 pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl z-0 pointer-events-none"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20 shadow-inner">
                            <Building className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-headline-small font-bold mb-3 tracking-tight">Donar a FUNSAMEZ</h3>
                            <p className="text-body-large text-white/90 max-w-2xl">
                                Realiza una donación general que apoya todos nuestros programas y campañas. Tu contribución ayuda donde más se necesita, permitiéndonos mantener nuestra misión viva.
                            </p>
                        </div>
                        <button
                            onClick={() => handleDonate(null)}
                            className="btn-filled bg-white text-primary hover:bg-surface-container-lowest flex-shrink-0 px-8 py-4 text-lg shadow-lg active:scale-95 transition-transform"
                        >
                            <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                            Donar Ahora
                        </button>
                    </div>
                </div>

                {/* Campaigns Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedCampaigns.map(campaign => (
                        <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            onDonate={handleDonate}
                            currentFilter={filter}
                            currentPage={currentPage}
                            isHighlighted={highlightedCard === campaign.id}
                        />
                    ))}
                </div>

                {/* Controles de Paginación */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                            disabled={currentPage === 1} 
                            className="p-3 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm border border-outline-variant/30"
                        >
                            <ChevronLeft className="w-6 h-6 text-primary" />
                        </button>
                        <span className="text-body-large text-on-surface-variant font-medium">
                            Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                            disabled={currentPage === totalPages} 
                            className="p-3 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm border border-outline-variant/30"
                        >
                            <ChevronRight className="w-6 h-6 text-primary" />
                        </button>
                    </div>
                )}

                {filteredCampaigns.length === 0 && (
                    <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border-2 border-dashed border-outline-variant/50">
                        <Package className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                        <h3 className="text-title-large text-on-surface font-bold mb-2">
                            No hay campañas en esta categoría
                        </h3>
                        <p className="text-body-large text-on-surface-variant">
                            Ajusta los filtros o vuelve pronto para ver nuevas oportunidades.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}