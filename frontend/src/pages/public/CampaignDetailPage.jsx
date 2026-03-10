import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
    ArrowLeft, Heart, Package, Target, Calendar, MapPin,
    CheckCircle, PlayCircle, ExternalLink, ChevronLeft,
    ChevronRight, Share2, Info, LayoutDashboard
} from 'lucide-react';

export default function CampaignDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { campaigns, loading } = useApp();
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    // Handler para volver a la lista manteniendo la mochila intacta
    const handleBack = () => {
        navigate('/campanas', { 
            state: { 
                highlightId: id, 
                filter: location.state?.filter, 
                currentPage: location.state?.currentPage 
            } 
        });
    };

    // Buscamos la campaña real en el estado global
    const campaign = useMemo(() => {
        return campaigns.find(c => c.id === parseInt(id));
    }, [campaigns, id]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-surface animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando detalles de la campaña...</p>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-surface py-20 flex flex-col items-center text-center px-4">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6">
                    <Info className="w-10 h-10 text-on-surface-variant opacity-30" />
                </div>
                <h1 className="text-display-small text-on-surface font-bold mb-4">Campaña no encontrada</h1>
                <p className="text-body-large text-on-surface-variant max-w-md mb-8">Lo sentimos, la campaña que buscas no existe o ha sido finalizada.</p>
                <button onClick={handleBack} className="btn-filled px-8"><ArrowLeft className="w-4 h-4 mr-2" /> Volver a Campañas</button>
            </div>
        );
    }

    // --- HELPERS ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount || 0);
    };

    const progress = campaign.monto_objetivo > 0 
        ? Math.min(100, Math.round((campaign.recaudo_actual / campaign.monto_objetivo) * 100)) 
        : 0;

    // Unimos imagen principal con galería
    const allMedia = [campaign.imagen_url, ...(campaign.galeria_imagenes || [])].filter(Boolean);

    return (
        <div className="min-h-screen bg-surface pb-32 md:pb-12 animate-fade-in">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Botón Volver (Con persistencia de estado) */}
                <button onClick={handleBack} className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-full transition-colors mb-6 -ml-2">
                    <ArrowLeft size={20} /> Volver a Campañas
                </button>

                {/* --- SECCIÓN SUPERIOR: Galería e Info Rápida --- */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    
                    {/* Media Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-surface-container shadow-elevation-2 border border-outline-variant/30">
                            <img 
                                src={allMedia[currentMediaIndex]} 
                                alt={campaign.titulo} 
                                className="w-full h-full object-cover transition-all duration-500" 
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x450/f3f4f6/9ca3af?text=Imagen+No+Disponible'; }}
                            />
                            
                            {/* Navigation Arrows */}
                            {allMedia.length > 1 && (
                                <>
                                    <button onClick={() => setCurrentMediaIndex(p => (p - 1 + allMedia.length) % allMedia.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass bg-black/20 text-white hover:bg-black/40 transition-all"><ChevronLeft /></button>
                                    <button onClick={() => setCurrentMediaIndex(p => (p + 1) % allMedia.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass bg-black/20 text-white hover:bg-black/40 transition-all"><ChevronRight /></button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {allMedia.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {allMedia.map((url, idx) => (
                                    <button key={idx} onClick={() => setCurrentMediaIndex(idx)} className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all bg-surface-container ${idx === currentMediaIndex ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                        <img 
                                            src={url} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/f3f4f6/9ca3af?text=X'; }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Info Panel */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">{campaign.estado}</span>
                            {campaign.permite_donacion_monetaria && <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center gap-1.5 border border-secondary/20"><Heart size={14}/> Monetaria</span>}
                            {campaign.permite_donacion_especie && <span className="px-4 py-1.5 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold flex items-center gap-1.5 border border-tertiary/20"><Package size={14}/> Especie</span>}
                        </div>

                        <h1 className="text-display-small text-on-surface font-bold leading-tight">{campaign.titulo}</h1>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-on-surface-variant font-medium">
                                <Calendar size={20} className="text-primary"/>
                                <span>Del {new Date(campaign.fecha_inicio).toLocaleDateString()} al {new Date(campaign.fecha_fin).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Meta Financiera M3 */}
                        {campaign.permite_donacion_monetaria && (
                            <div className="p-6 rounded-[2rem] bg-surface-container-low border border-outline-variant/30 space-y-4 shadow-sm">
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Recaudado</span>
                                        <span className="text-headline-medium text-primary font-bold">{formatCurrency(campaign.recaudo_actual)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-title-medium text-on-surface-variant font-medium">Meta: {formatCurrency(campaign.monto_objetivo)}</span>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-primary rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className="text-sm font-bold text-on-surface-variant text-center">{progress}% de la meta alcanzada</p>
                            </div>
                        )}

                        <button onClick={() => alert("Pasarela de pagos en desarrollo")} className="btn-filled py-4 text-lg font-bold rounded-2xl shadow-lg shadow-primary/30 flex justify-center items-center gap-3 active:scale-95 transition-all">
                            <Heart fill="currentColor" /> Donar Ahora
                        </button>
                    </div>
                </div>

                {/* --- SECCIÓN INFERIOR: Detalles Profundos --- */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Contenido Principal */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="card-elevated p-8">
                            <h2 className="text-title-large text-on-surface font-bold mb-4 flex items-center gap-3"><Info className="text-primary"/> Descripción de la Campaña</h2>
                            <p className="text-body-large text-on-surface-variant whitespace-pre-line leading-relaxed">{campaign.descripcion}</p>
                        </section>

                        {campaign.objetivos?.length > 0 && (
                            <section className="card-elevated p-8">
                                <h2 className="text-title-large text-on-surface font-bold mb-6 flex items-center gap-3"><Target className="text-primary"/> Objetivos Clave</h2>
                                <div className="grid gap-4">
                                    {campaign.objetivos.map((obj, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
                                            <CheckCircle className="text-success shrink-0 mt-1" size={20} />
                                            <p className="text-on-surface font-medium">{obj}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        </div>

                    {/* Sidebar: Necesidades y Compartir */}
                    <div className="space-y-6">
                        {campaign.permite_donacion_especie && campaign.necesidades?.length > 0 && (
                            <section className="card-elevated p-6 bg-secondary/5 border-secondary/20">
                                <h3 className="text-title-medium text-secondary font-bold mb-4 flex items-center gap-2"><Package /> Artículos Necesitados</h3>
                                <div className="flex flex-wrap gap-2">
                                    {campaign.necesidades.map((item, i) => (
                                        <span key={i} className="px-3 py-2 rounded-xl bg-white border border-secondary/20 text-secondary text-xs font-bold shadow-sm">{item}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="card-elevated p-6 bg-surface-container-lowest">
                            <h3 className="text-title-medium text-on-surface font-bold mb-3 flex items-center gap-2"><Share2 size={20} className="text-primary"/> Comparte esta Causa</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Ayúdanos a llegar a más personas compartiendo este enlace.</p>
                            <button onClick={() => { navigator.share({ title: campaign.titulo, url: window.location.href }).catch(() => alert("Copiado al portapapeles")) }} className="w-full btn-tonal py-3 font-bold rounded-xl flex items-center justify-center gap-2">
                                <Share2 size={18} /> Compartir Enlace
                            </button>
                        </section>
                    </div>
                </div>

                {/* --- SECCIÓN MULTIMEDIA Y TESTIMONIOS (REDISEÑADA) --- */}
                {campaign.video_urls?.length > 0 && (
                    <section className="mt-8 card-elevated p-8 bg-surface-container-lowest">
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-label-large mb-4">
                                <PlayCircle className="w-4 h-4" />
                                Multimedia y Testimonios
                            </span>
                            <h2 className="text-headline-small text-on-surface font-bold">Conoce más sobre esta campaña</h2>
                        </div>
                        
                        {/* 1. Lógica de separación de videos por orientación */}
                        {(() => {
                            const horizontalVideos = [];
                            const verticalVideos = [];
                            const otherLinks = [];

                            campaign.video_urls.forEach((url, index) => {
                                if (!url) return;
                                
                                // YouTube (Horizontal)
                                const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                                if (ytMatch) {
                                    horizontalVideos.push({ url, id: ytMatch[1], index });
                                    return;
                                }

                                // TikTok (Vertical)
                                const ttMatch = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
                                if (ttMatch) {
                                    verticalVideos.push({ url, id: ttMatch[1], type: 'tiktok', index });
                                    return;
                                }

                                // Instagram (Vertical/Cuadrado)
                                const igMatch = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
                                if (igMatch) {
                                    verticalVideos.push({ url, id: igMatch[1], type: 'instagram', index });
                                    return;
                                }

                                // Otros
                                otherLinks.push({ url, index });
                            });

                            return (
                                <div className="space-y-12">
                                    {/* SECCIÓN 1: Horizontales (Arriba) */}
                                    {horizontalVideos.length > 0 && (
                                        <div className="space-y-8">
                                            {horizontalVideos.map((video) => (
                                                <div key={video.index} className="aspect-video w-full rounded-[2rem] overflow-hidden bg-surface-container-highest shadow-elevation-2 border border-outline-variant/30">
                                                    <iframe src={`https://www.youtube.com/embed/${video.id}`} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="YouTube Video"></iframe>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* SECCIÓN 2: Verticales (Abajo, simétricos y centrados dinámicamente) */}
                                    {verticalVideos.length > 0 && (
                                        <div className="flex flex-wrap justify-center gap-8 items-center pt-4">
                                            {verticalVideos.map((video) => {
                                                if (video.type === 'tiktok') {
                                                    return (
                                                        <div key={video.index} className="aspect-[9/16] w-full max-w-[320px] rounded-[2rem] overflow-hidden bg-black shadow-elevation-2 border border-outline-variant/30 relative shrink-0">
                                                            {/* SUPER HACK: Hacemos el iframe un 4% más grande para esconder el scrollbar fuera de los bordes redondeados */}
                                                            <iframe 
                                                                src={`https://www.tiktok.com/embed/v2/${video.id}`} 
                                                                className="absolute -top-[2%] -left-[2%] w-[104%] h-[104%] border-0" 
                                                                allow="encrypted-media;" 
                                                                scrolling="no"
                                                                title="TikTok Video"
                                                            >
                                                            </iframe>
                                                        </div>
                                                    );
                                                }
                                                // Instagram (Forzado al mismo tamaño exacto de TikTok)
                                                return (
                                                    <div key={video.index} className="aspect-[9/16] w-full max-w-[320px] rounded-[2rem] overflow-hidden bg-white shadow-elevation-2 border border-outline-variant/30 relative shrink-0">
                                                        <iframe 
                                                            src={`https://www.instagram.com/p/${video.id}/embed/`} 
                                                            className="absolute top-0 left-0 w-full h-full border-0" 
                                                            scrolling="no" 
                                                            allowTransparency="true" 
                                                            title="Instagram Video"
                                                        >
                                                        </iframe>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* SECCIÓN 3: Otros Links (Fallback) */}
                                    {otherLinks.length > 0 && (
                                        <div className="space-y-4 pt-4 border-t border-outline-variant/30">
                                            {otherLinks.map((link) => (
                                                <a key={link.index} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/30 w-full">
                                                    <PlayCircle className="w-8 h-8 text-primary shrink-0" />
                                                    <span className="text-body-medium text-on-surface font-medium flex-1 truncate">{link.url}</span>
                                                    <ExternalLink className="w-5 h-5 text-on-surface-variant shrink-0" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </section>
                )}
            </div>
        </div>
    );
}