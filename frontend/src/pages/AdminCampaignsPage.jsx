import { useState, useEffect } from 'react';
import { 
    crearCampana, 
    obtenerCampanas 
    // agregar actualizar/eliminar cuando estén listos en backend
} from '../services/campaignService';
import AdminLayout from '../components/AdminLayout';
import {
    Plus, Edit, Trash2, X, Save, MapPin, Target,
    Briefcase, Pause, Play, Archive, Search, Filter, ChevronDown, 
    Check, DollarSign, Image as ImageIcon, AlertCircle, ArrowUpDown, 
    ChevronLeft, ChevronRight, CalendarDays, Copy, Gift
} from 'lucide-react';

// --- COMPONENTE INTERNO PARA LISTAS (Objetivos / Galería) ---
const DynamicList = ({ label, items, onAdd, onRemove, placeholder, type = 'text' }) => {
    const [newValue, setNewValue] = useState('');

    const handleAdd = () => {
        if (!newValue.trim()) return;
        onAdd(newValue);
        setNewValue('');
    };

    return (
        <div className="pt-4 border-t border-outline-variant/30">
            <label className="block text-label-large text-on-surface font-bold text-primary mb-2">{label}</label>
            <div className="flex gap-2 mb-3">
                <input 
                    type={type} 
                    value={newValue} 
                    onChange={(e) => setNewValue(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
                    className="input-outlined flex-1 bg-white"
                    placeholder={placeholder} 
                />
                <button type="button" onClick={handleAdd} className="btn-tonal py-2 px-4 font-bold">
                    <Plus size={18} />
                </button>
            </div>
            {items.length > 0 && (
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-surface-container/50 p-2 rounded-lg border border-outline-variant/50 animate-fade-in">
                            {type === 'url' ? (
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <img src={item} alt="Miniatura" className="w-8 h-8 rounded object-cover bg-surface-container-high" onError={(e) => e.target.src = 'https://via.placeholder.com/32'} />
                                    <span className="text-xs text-on-surface-variant truncate max-w-[200px]">{item}</span>
                                </div>
                            ) : (
                                <span className="text-sm text-on-surface ml-2">{item}</span>
                            )}
                            <button type="button" onClick={() => onRemove(idx)} className="p-1.5 text-error hover:bg-error/10 rounded-full transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// --- FORMULARIO MODAL DE CAMPAÑA ---
function CampaignFormModal({ campaign, onSave, onClose }) {
    const initialValues = {
        titulo: '', descripcion: '', 
        fecha_fin: '', 
        monto_objetivo: 0,
        permite_donacion_monetaria: true,
        permite_donacion_especie: true,
        categoria: 'General',
        tipo_impacto: 'Social',
        imagen_url: '',
        objetivos: [],
        galeria_imagenes: []
    };

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (campaign) {
            setFormData({ ...initialValues, ...campaign });
        } else {
            setFormData(initialValues);
        }
    }, [campaign]);

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo?.trim()) newErrors.titulo = "El título es obligatorio.";
        if (!formData.descripcion?.trim()) newErrors.descripcion = "La descripción es obligatoria.";
        if (!formData.fecha_fin) newErrors.fecha_fin = "Define la fecha de cierre.";
        
        // Validación Lógica: Al menos un tipo de donación
        if (!formData.permite_donacion_monetaria && !formData.permite_donacion_especie) {
            newErrors.permisos = "Activa al menos un tipo de donación.";
        }
        
        if (formData.permite_donacion_monetaria && formData.monto_objetivo <= 0) {
            newErrors.monto_objetivo = "El monto debe ser mayor a 0.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave(formData);
    };

    // Helpers para listas dinámicas
    const addObjetivo = (val) => setFormData(p => ({ ...p, objetivos: [...p.objetivos, val] }));
    const removeObjetivo = (idx) => setFormData(p => ({ ...p, objetivos: p.objetivos.filter((_, i) => i !== idx) }));
    
    const addGaleria = (val) => setFormData(p => ({ ...p, galeria_imagenes: [...p.galeria_imagenes, val] }));
    const removeGaleria = (idx) => setFormData(p => ({ ...p, galeria_imagenes: p.galeria_imagenes.filter((_, i) => i !== idx) }));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">
                        {campaign && campaign.id ? 'Editar Campaña' : 'Nueva Campaña'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>

                {/* Body Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="campaign-form" onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Título y Descripción */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Título *</label>
                                <input type="text" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} className={`input-outlined focus:bg-white ${errors.titulo ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Donatón de Juguetes" />
                                {errors.titulo && <p className="text-error text-xs mt-1 font-bold flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.titulo}</p>}
                            </div>
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Descripción *</label>
                                <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.descripcion ? 'border-error bg-error-container text-error' : ''}`} rows={3} />
                            </div>
                        </div>

                        {/* Configuración Financiera y Fechas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Fecha Cierre</label>
                                <input type="date" value={formData.fecha_fin} onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })} className={`input-outlined focus:bg-white ${errors.fecha_fin ? 'border-error text-error' : ''}`} />
                                {errors.fecha_fin && <p className="text-error text-xs mt-1 font-bold">{errors.fecha_fin}</p>}
                            </div>
                            
                            {/* Tipos de Donación (Switches) */}
                            <div className="bg-surface-container/30 p-3 rounded-xl border border-outline-variant/50">
                                <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">Tipos de Donación</label>
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm font-medium flex items-center gap-2"><DollarSign size={16}/> Monetaria</span>
                                        <input type="checkbox" checked={formData.permite_donacion_monetaria} onChange={(e) => setFormData({...formData, permite_donacion_monetaria: e.target.checked})} className="toggle-switch accent-primary w-5 h-5" />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm font-medium flex items-center gap-2"><Gift size={16}/> Especie (Insumos)</span>
                                        <input type="checkbox" checked={formData.permite_donacion_especie} onChange={(e) => setFormData({...formData, permite_donacion_especie: e.target.checked})} className="toggle-switch accent-primary w-5 h-5" />
                                    </label>
                                </div>
                                {errors.permisos && <p className="text-error text-xs mt-2 font-bold text-center bg-error/10 rounded py-1">{errors.permisos}</p>}
                            </div>
                        </div>

                        {/* Monto Objetivo (Solo si es monetaria) */}
                        {formData.permite_donacion_monetaria && (
                            <div className="animate-fade-in">
                                <label className="block text-label-large text-on-surface mb-1.5">Meta de Recaudo ($)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                                    <input 
                                        type="number" 
                                        value={formData.monto_objetivo} 
                                        onChange={(e) => setFormData({ ...formData, monto_objetivo: e.target.value })} 
                                        className={`input-outlined pl-10 focus:bg-white ${errors.monto_objetivo ? 'border-error text-error' : ''}`} 
                                        placeholder="0.00" 
                                    />
                                </div>
                                {errors.monto_objetivo && <p className="text-error text-xs mt-1 font-bold">{errors.monto_objetivo}</p>}
                            </div>
                        )}

                        {/* Listas Dinámicas */}
                        <DynamicList label="Objetivos de la Campaña" items={formData.objetivos} onAdd={addObjetivo} onRemove={removeObjetivo} placeholder="Ej: Comprar 500 kits escolares" />
                        
                        {/* Imágenes */}
                        <div>
                            <label className="block text-label-large text-on-surface mb-1.5">Imagen Principal (URL)</label>
                            <input type="url" value={formData.imagen_url} onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })} className="input-outlined focus:bg-white mb-2" placeholder="https://..." />
                            {formData.imagen_url && <img src={formData.imagen_url} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-outline-variant" onError={(e) => e.target.style.display = 'none'} />}
                        </div>

                        <DynamicList label="Galería Adicional (URLs)" items={formData.galeria_imagenes} onAdd={addGaleria} onRemove={removeGaleria} placeholder="https://..." type="url" />

                    </form>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="campaign-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Guardar Campaña</button>
                </div>
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL DE CAMPAÑAS ---
export default function AdminCampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar Datos
    const loadData = async () => {
        setLoading(true);
        try {
            const data = await obtenerCampanas();
            setCampaigns(data || []);
        } catch (error) {
            console.error("Error cargando campañas", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleSave = async (data) => {
        try {
            // Aquí llamarías a crearCampana o actualizarCampana
            // Como solo probamos crear:
            await crearCampana(data);
            alert("✅ Campaña guardada exitosamente");
            setIsModalOpen(false);
            loadData(); // Recargar lista
        } catch (error) {
            console.error("Error saving", error);
            alert("❌ Error al guardar. Revisa la consola.");
        }
    };

    return (
        <AdminLayout title="Gestión de Campañas" subtitle="Administra las campañas de donación y metas de recaudo.">
            
            {/* Header Actions */}
            <div className="flex justify-end mb-6">
                <button onClick={() => { setEditingCampaign(null); setIsModalOpen(true); }} className="btn-filled shadow-primary/20">
                    <Plus className="w-4 h-4" /> Nueva Campaña
                </button>
            </div>

            {/* Lista de Campañas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map(camp => (
                    <div key={camp.id} className="card-elevated flex flex-col h-full animate-fade-in group">
                        {/* Imagen Portada */}
                        <div className="h-40 w-full bg-surface-container-high relative overflow-hidden rounded-t-xl">
                            {camp.imagen_url ? (
                                <img src={camp.imagen_url} alt={camp.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-on-surface-variant"><ImageIcon size={32} opacity={0.5}/></div>
                            )}
                            <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                                {camp.estado}
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-title-medium font-bold text-on-surface mb-2 line-clamp-1">{camp.titulo}</h3>
                            <p className="text-body-small text-on-surface-variant line-clamp-2 mb-4 flex-1">{camp.descripcion}</p>
                            
                            {/* Barra de Progreso (Si es monetaria) */}
                            {camp.permite_donacion_monetaria && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs font-bold mb-1">
                                        <span className="text-primary">${camp.recaudo_actual || 0}</span>
                                        <span className="text-on-surface-variant">Meta: ${camp.monto_objetivo}</span>
                                    </div>
                                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full" 
                                            style={{ width: `${Math.min(((camp.recaudo_actual || 0) / camp.monto_objetivo) * 100, 100)}%` }} 
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Acciones Rápidas */}
                            <div className="flex gap-2 mt-auto pt-3 border-t border-outline-variant/20">
                                <button onClick={() => { /* Implementar Editar */ }} className="btn-tonal py-2 flex-1 text-xs justify-center">Editar</button>
                                <button className="btn-outlined border-error text-error py-2 px-3 hover:bg-error/10"><Trash2 size={16}/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && <div className="text-center py-10 opacity-50">Cargando campañas...</div>}

            {isModalOpen && <CampaignFormModal campaign={editingCampaign} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}