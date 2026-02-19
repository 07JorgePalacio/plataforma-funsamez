import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { crearCampana, actualizarCampana, eliminarCampana } from '../services/campaignService';
import AdminLayout from '../components/AdminLayout';
import Snackbar from '../components/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog'; // 🟢 NUEVO
import {
    Plus, Edit, Trash2, X, Save,
    Check, DollarSign, Image as ImageIcon, AlertCircle, 
    Package, Calendar, Archive, Play, Pause, ChevronDown, 
    Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Copy, Heart, Inbox
} from 'lucide-react';

const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CO', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
};

const CheckboxM3 = ({ label, checked, onChange, icon: Icon }) => (
    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-primary/5 border-primary' : 'bg-surface border-outline-variant hover:border-outline'}`}>
        <div className="flex items-center gap-3">
            {Icon && <Icon size={20} className={checked ? 'text-primary' : 'text-on-surface-variant'} />}
            <span className={`text-sm font-medium ${checked ? 'text-primary font-bold' : 'text-on-surface'}`}>{label}</span>
        </div>
        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-primary' : 'border-2 border-on-surface-variant'}`}>
            {checked && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
);

const DynamicList = ({ label, items, onAdd, onRemove, placeholder, type = 'text', maxItems = 10 }) => {
    const [newValue, setNewValue] = useState('');
    const isLimitReached = items.length >= maxItems;
    const handleAdd = () => { if (!newValue.trim()) return; onAdd(newValue); setNewValue(''); };

    return (
        <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-baseline mb-2">
                <label className="block text-label-large text-on-surface font-bold text-primary">{label}</label>
                <span className={`text-xs font-medium ${isLimitReached ? 'text-error' : 'text-on-surface-variant'}`}>{items.length}/{maxItems}</span>
            </div>
            <div className="flex gap-2 mb-3">
                <input type={type} value={newValue} onChange={(e) => setNewValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())} className="input-outlined flex-1 bg-white" placeholder={isLimitReached ? "Límite alcanzado" : placeholder} disabled={isLimitReached} />
                <button type="button" onClick={handleAdd} disabled={isLimitReached || !newValue.trim()} className="btn-tonal py-2 px-4"><Plus size={18} /></button>
            </div>
            {items.length > 0 && (
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-surface-container/50 p-2 rounded-lg border border-outline-variant/50">
                            {type === 'url' ? (
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <img src={item} alt="Miniatura" className="w-8 h-8 rounded object-cover bg-surface-container-high" onError={(e) => e.target.src = 'https://via.placeholder.com/32'} />
                                    <span className="text-xs text-on-surface-variant truncate max-w-[200px]">{item}</span>
                                </div>
                            ) : ( <span className="text-sm text-on-surface ml-2 truncate max-w-[200px]">{item}</span> )}
                            <button type="button" onClick={() => onRemove(idx)} className="p-1.5 text-error hover:bg-error/10 rounded-full"><Trash2 size={14} /></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function CampaignFormModal({ campaign, onSave, onClose }) {
    const initialValues = { titulo: '', descripcion: '', fecha_inicio: new Date().toISOString().split('T')[0], fecha_fin: '', monto_objetivo: 0, permite_donacion_monetaria: true, permite_donacion_especie: true, categoria: [], tipo_impacto: [], imagen_url: '', objetivos: [], galeria_imagenes: [], necesidades: [] };
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [displayMonto, setDisplayMonto] = useState('');

    useEffect(() => {
        if (campaign) { setFormData({ ...initialValues, ...campaign }); setDisplayMonto(formatCurrency(campaign.monto_objetivo)); } 
        else { setFormData(initialValues); }
    }, [campaign]);

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const handleMoneyChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setDisplayMonto(formatCurrency(rawValue));
        setFormData({ ...formData, monto_objetivo: parseInt(rawValue) || 0 });
        if (errors.monto_objetivo) setErrors({...errors, monto_objetivo: null});
    };

    const handleDateChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
        const start = field === 'fecha_inicio' ? value : formData.fecha_inicio;
        const end = field === 'fecha_fin' ? value : formData.fecha_fin;
        const hoy = new Date().toISOString().split('T')[0];
        if (field === 'fecha_inicio' && !campaign?.id && value < hoy) setErrors(prev => ({...prev, fecha_inicio: "No puede iniciar en el pasado."}));
        if (start && end && end < start) setErrors(prev => ({...prev, fecha_fin: "El cierre debe ser posterior al inicio."}));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo?.trim()) newErrors.titulo = "Requerido.";
        if (!formData.descripcion?.trim()) newErrors.descripcion = "Requerido.";
        if (!formData.fecha_fin) newErrors.fecha_fin = "Requerido.";
        if (!formData.permite_donacion_monetaria && !formData.permite_donacion_especie) newErrors.permisos = "Selecciona un tipo.";
        if (formData.permite_donacion_monetaria && formData.monto_objetivo <= 0) newErrors.monto_objetivo = "Mayor a 0.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSave(formData); };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{campaign && campaign.id ? 'Editar Campaña' : campaign ? 'Replicar Campaña' : 'Nueva Campaña'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="campaign-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div id="field-titulo"><label className="block text-label-large text-on-surface mb-1.5 font-bold">Título *</label><input type="text" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className={`input-outlined focus:bg-white ${errors.titulo ? 'border-error bg-error-container text-error' : ''}`} />{errors.titulo && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.titulo}</p>}</div>
                            <div id="field-descripcion"><label className="block text-label-large text-on-surface mb-1.5 font-bold">Descripción *</label><textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.descripcion ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.descripcion && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.descripcion}</p>}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            <div id="field-fecha_inicio"><label className="block text-label-large text-on-surface mb-1.5 font-bold flex gap-2 items-center"><Calendar size={14}/> Inicio</label><input type="date" value={formData.fecha_inicio} onChange={(e) => handleDateChange('fecha_inicio', e.target.value)} className={`input-outlined focus:bg-white ${errors.fecha_inicio ? 'border-error text-error' : ''}`} />{errors.fecha_inicio && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha_inicio}</p>}</div>
                            <div id="field-fecha_fin"><label className="block text-label-large text-on-surface mb-1.5 font-bold flex gap-2 items-center"><Calendar size={14}/> Cierre</label><input type="date" value={formData.fecha_fin} onChange={(e) => handleDateChange('fecha_fin', e.target.value)} className={`input-outlined focus:bg-white ${errors.fecha_fin ? 'border-error text-error' : ''}`} />{errors.fecha_fin && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha_fin}</p>}</div>
                        </div>
                        <div className="space-y-4 pt-2" id="field-permisos">
                            <label className="block text-xs font-bold text-primary uppercase tracking-wide">Tipo de Donación</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3"><CheckboxM3 label="Recibir Dinero" icon={DollarSign} checked={formData.permite_donacion_monetaria} onChange={(e) => setFormData({...formData, permite_donacion_monetaria: e.target.checked})} />
                                    {formData.permite_donacion_monetaria && (<div className="animate-slide-up bg-surface-container/30 p-3 rounded-xl border border-outline-variant/30" id="field-monto_objetivo"><label className="block text-label-small text-on-surface-variant mb-1">Meta ($)</label><input type="text" value={displayMonto} onChange={handleMoneyChange} className={`input-outlined text-right font-mono font-bold ${errors.monto_objetivo ? 'border-error text-error' : ''}`} placeholder="0" />{errors.monto_objetivo && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.monto_objetivo}</p>}</div>)}
                                </div>
                                <div className="space-y-3"><CheckboxM3 label="Recibir Insumos" icon={Package} checked={formData.permite_donacion_especie} onChange={(e) => setFormData({...formData, permite_donacion_especie: e.target.checked})} /></div>
                            </div>
                            {errors.permisos && <p className="text-error text-xs font-bold text-center bg-error/10 rounded py-2 flex items-center justify-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.permisos}</p>}
                        </div>
                        {formData.permite_donacion_especie && (<div className="animate-fade-in bg-secondary/5 p-4 rounded-xl border border-secondary/20"><h3 className="font-bold text-sm text-secondary flex gap-2 mb-2"><Package size={18} /> Lista de Necesidades</h3><DynamicList label="" items={formData.necesidades} onAdd={(v)=>setFormData(p=>({...p, necesidades: [...p.necesidades, v]}))} onRemove={(i)=>setFormData(p=>({...p, necesidades: p.necesidades.filter((_,x)=>x!==i)}))} placeholder="Ej: Ropa, Arroz..." /></div>)}
                        <DynamicList label="Objetivos" items={formData.objetivos} onAdd={(v)=>setFormData(p=>({...p, objetivos: [...p.objetivos, v]}))} onRemove={(i)=>setFormData(p=>({...p, objetivos: p.objetivos.filter((_,x)=>x!==i)}))} placeholder="Objetivo..." maxItems={5} />
                        <div><div className="flex justify-between items-center mb-1.5"><label className="block text-label-large text-on-surface">Portada (URL)</label></div><input type="url" value={formData.imagen_url} onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })} className="input-outlined focus:bg-white mb-2" placeholder="https://..." />{formData.imagen_url && <img src={formData.imagen_url} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-outline-variant bg-surface-container-high" onError={(e) => e.target.style.display = 'none'} />}</div>
                        <DynamicList label="Galería" items={formData.galeria_imagenes} onAdd={(v)=>setFormData(p=>({...p, galeria_imagenes: [...p.galeria_imagenes, v]}))} onRemove={(i)=>setFormData(p=>({...p, galeria_imagenes: p.galeria_imagenes.filter((_,x)=>x!==i)}))} placeholder="https://..." type="url" maxItems={6} />
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20"><button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button><button type="submit" form="campaign-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Guardar</button></div>
            </div>
        </div>
    );
}

export default function AdminCampaignsPage() {
    const { campaigns, fetchCampaigns, getActiveCampaigns, getClosedCampaigns, loading } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [activeTab, setActiveTab] = useState('activas');
    
    // 🟢 NUEVO: Estado del Snackbar
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });
    const showMessage = (message, type = 'success') => setSnackbar({ show: true, message, type });

    // 🟢 NUEVO: Estado del ConfirmDialog
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const showConfirm = (title, message, onConfirm, type = 'danger') => setConfirmDialog({ isOpen: true, title, message, onConfirm, type });
    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); 
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, activeTab, sortBy, statusFilter]);

    const handleSave = async (data) => {
        try {
            if (editingCampaign && editingCampaign.id) {
                await actualizarCampana(editingCampaign.id, data);
                showMessage("Campaña actualizada exitosamente", "success");
            } else {
                await crearCampana(data);
                showMessage("¡Nueva campaña publicada!", "success");
            }
            setIsModalOpen(false); setEditingCampaign(null); await fetchCampaigns(); 
        } catch (error) { showMessage("Error al guardar la campaña", "error"); }
    };

    const handleChangeStatus = (id, nuevoEstado) => {
        let type = 'info';
        if (nuevoEstado === 'pausada') type = 'warning';
        if (nuevoEstado === 'cancelada') type = 'danger';

        showConfirm(
            'Cambiar Estado', 
            `¿Estás seguro de cambiar el estado de la campaña a ${nuevoEstado.toUpperCase()}?`, 
            async () => {
                closeConfirm();
                try {
                    await actualizarCampana(id, { estado: nuevoEstado });
                    showMessage(`Estado cambiado a ${nuevoEstado}`, type === 'danger' ? 'info' : type);
                    await fetchCampaigns(); 
                } catch (error) { showMessage("Error cambiando estado", "error"); }
            },
            type
        );
    };

    const handleDelete = (id) => {
        showConfirm(
            'Eliminar Campaña', 
            '¿Estás seguro de que deseas eliminar esta campaña? Esta acción no se puede deshacer.', 
            async () => {
                closeConfirm();
                try {
                    await eliminarCampana(id);
                    showMessage("Campaña eliminada", "error");
                    await fetchCampaigns();
                } catch (error) { showMessage("Error al eliminar", "error"); }
            }
        );
    };

    const handleReplicate = (camp) => {
        const replica = { ...camp, id: null, titulo: `${camp.titulo} (Copia)`, recaudo_actual: 0, fecha_inicio: new Date().toISOString().split('T')[0], fecha_fin: '' };
        setEditingCampaign(replica);
        setIsModalOpen(true);
        showMessage("Modifica los datos para crear la copia", "info");
    };

    const rawList = activeTab === 'activas' ? getActiveCampaigns() : getClosedCampaigns();
    const filteredList = rawList.filter(c => { const matchesSearch = c.titulo.toLowerCase().includes(searchQuery.toLowerCase()); const matchesStatus = statusFilter === 'all' || c.estado === statusFilter; return matchesSearch && matchesStatus; });
    const sortedList = [...filteredList].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
        if (sortBy === 'oldest') return new Date(a.fecha_creacion) - new Date(b.fecha_creacion);
        if (sortBy === 'progress') return (b.recaudo_actual / b.monto_objetivo) - (a.recaudo_actual / a.monto_objetivo);
        if (sortBy === 'alpha') return a.titulo.localeCompare(b.titulo); 
        if (sortBy === 'alpha_desc') return b.titulo.localeCompare(a.titulo); 
        return 0;
    });

    const paginatedList = sortedList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);

    const renderEmptyState = () => {
        if (rawList.length === 0) {
            if (activeTab === 'activas') {
                return ( <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in"><div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Heart className="w-10 h-10 text-primary" fill="currentColor" fillOpacity={0.2} /></div><h3 className="text-title-large text-on-surface font-bold mb-2">¡Haz realidad un sueño!</h3><p className="text-body-large text-on-surface-variant max-w-md mb-6">No tienes campañas activas en este momento. Crea una nueva campaña para empezar a recaudar fondos.</p><button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="btn-filled shadow-lg shadow-primary/20"><Plus className="w-5 h-5 mr-2" /> Crear Nueva Campaña</button></div> );
            } else {
                return ( <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in opacity-70"><Inbox className="w-16 h-16 text-on-surface-variant mb-4" /><h3 className="text-title-medium text-on-surface font-bold">Historial Vacío</h3><p className="text-body-medium text-on-surface-variant">Aquí aparecerán las campañas completadas o canceladas.</p></div> );
            }
        } 
        if (paginatedList.length === 0) return ( <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent animate-fade-in"><Search className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" /><h3 className="text-title-medium text-on-surface mb-1">No se encontraron resultados</h3><p className="text-body-small text-on-surface-variant">Intenta ajustar tu búsqueda o los filtros.</p><button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="btn-text mt-2 text-primary font-bold">Limpiar filtros</button></div> );
        return null;
    };

    return (
        <AdminLayout title="Gestión de Campañas" subtitle="Administra las campañas de donación.">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 bg-surface-container rounded-full p-1 w-fit">
                    <button onClick={() => setActiveTab('activas')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'activas' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Activas ({getActiveCampaigns().length})</button>
                    <button onClick={() => setActiveTab('historial')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'historial' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Historial ({getClosedCampaigns().length})</button>
                </div>
                <button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex shadow-primary/20"><Plus className="w-4 h-4" /> Nueva Campaña</button>
            </div>

            {(rawList.length > 0 || searchQuery || statusFilter !== 'all') && (
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" /><input type="text" placeholder="Buscar campaña..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" /></div>
                    <div className="flex gap-2 overflow-x-auto">
                        {activeTab === 'activas' && ( <div className="relative min-w-[140px]"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full"><option value="all">Estado: Todos</option><option value="activa">Activas</option><option value="pausada">Pausadas</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" /></div> )}
                        <div className="relative min-w-[180px]"><ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" /><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full"><option value="newest">Más Recientes</option><option value="oldest">Más Antiguas</option><option value="progress">Mayor Progreso</option><option value="alpha">A - Z</option><option value="alpha_desc">Z - A</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" /></div>
                    </div>
                </div>
            )}

            <div className="min-h-[400px]">
                {paginatedList.length === 0 ? renderEmptyState() : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedList.map(camp => (
                            <div key={camp.id} className={`card-elevated flex flex-col h-full animate-fade-in group hover:-translate-y-1 transition-transform duration-300 ${activeTab === 'historial' ? 'grayscale opacity-90 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                <div className="h-40 w-full bg-surface-container-high relative overflow-hidden rounded-t-xl">
                                    {camp.imagen_url ? <img src={camp.imagen_url} alt={camp.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex items-center justify-center h-full text-on-surface-variant"><ImageIcon size={32} opacity={0.5}/></div>}
                                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold shadow-sm capitalize ${camp.estado === 'activa' ? 'bg-success-container text-success' : camp.estado === 'pausada' ? 'bg-warning-container text-warning' : 'bg-surface-container-high text-on-surface-variant'}`}>{camp.estado}</div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between text-[10px] text-on-surface-variant font-medium mb-2 uppercase tracking-wide"><span>Creada: {formatDate(camp.fecha_creacion)}</span></div>
                                    <h3 className="text-title-medium font-bold text-on-surface mb-2 line-clamp-1">{camp.titulo}</h3>
                                    <p className="text-body-small text-on-surface-variant line-clamp-2 mb-4 flex-1">{camp.descripcion}</p>
                                    {camp.permite_donacion_monetaria && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs font-bold mb-1"><span className="text-primary">${formatCurrency(camp.recaudo_actual || 0)}</span><span className="text-on-surface-variant">Meta: ${formatCurrency(camp.monto_objetivo)}</span></div>
                                            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${Math.min(((camp.recaudo_actual || 0) / camp.monto_objetivo) * 100, 100)}%` }} /></div>
                                        </div>
                                    )}
                                    <div className="flex gap-2 mt-auto pt-3 border-t border-outline-variant/20">
                                        {activeTab === 'activas' ? (
                                            <>
                                                <button onClick={() => { setEditingCampaign(camp); setIsModalOpen(true); }} className="btn-tonal py-2 flex-1 text-xs justify-center"><Edit size={16} className="mr-1"/> Editar</button>
                                                {camp.estado === 'activa' ? <button onClick={() => handleChangeStatus(camp.id, 'pausada')} className="btn-outlined py-2 px-2 text-warning border-warning hover:bg-warning/10" title="Pausar"><Pause size={16}/></button> : <button onClick={() => handleChangeStatus(camp.id, 'activa')} className="btn-outlined py-2 px-2 text-success border-success hover:bg-success/10" title="Activar"><Play size={16}/></button>}
                                                <button onClick={() => handleChangeStatus(camp.id, 'completada')} className="btn-outlined py-2 px-2 text-primary border-primary hover:bg-primary/10" title="Completar"><Check size={16}/></button>
                                                <button onClick={() => handleChangeStatus(camp.id, 'cancelada')} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Terminar (Cancelar)"><Archive size={16}/></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleReplicate(camp)} className="btn-tonal py-2 flex-1 text-xs justify-center bg-secondary-container text-secondary-on-container"><Copy size={16} className="mr-1"/> Replicar</button>
                                                <button onClick={() => handleDelete(camp.id)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10"><Trash2 size={16}/></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {sortedList.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            <button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {loading && <div className="text-center py-10 opacity-50 flex flex-col items-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>Cargando...</div>}
            {isModalOpen && <CampaignFormModal campaign={editingCampaign} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
            
            {/* 🟢 COMPONENTES VISUALES M3 */}
            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
            <ConfirmDialog isOpen={confirmDialog.isOpen} title={confirmDialog.title} message={confirmDialog.message} type={confirmDialog.type} onConfirm={confirmDialog.onConfirm} onCancel={closeConfirm} />
        </AdminLayout>
    );
}