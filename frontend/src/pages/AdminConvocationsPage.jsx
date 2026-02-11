import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearConvocatoria } from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout'; // <--- IMPORTAMOS EL LAYOUT
import {
    Plus, Edit, Trash2, X, Save, Calendar, MapPin, Users,
    Briefcase, Pause, Play, Archive, Clock,
    MessageCircle, Award, Search, Filter, ChevronDown, Loader2
} from 'lucide-react';

function ConvocationFormModal({ convocation, onSave, onClose }) {
    // ¡Mira qué limpio! Sin estados de animación, sin useEffects.
    const [formData, setFormData] = useState(convocation || {
        title: '', description: '', requirements: [], skills: [], experience: '',
        availability: '', commitment: '', location: '', locationType: 'presencial',
        spots: 1, benefits: [], whatsappGroupLink: '', startDate: '', endDate: '',
    });
    const [requirementItem, setRequirementItem] = useState('');
    const [skillItem, setSkillItem] = useState('');
    const [benefitItem, setBenefitItem] = useState('');

    const handleAddItem = (field, value, setValue) => {
        if (value && !formData[field].includes(value)) {
            setFormData({ ...formData, [field]: [...formData[field], value] });
            setValue('');
        }
    };

    const handleRemoveItem = (field, item) => {
        setFormData({ ...formData, [field]: formData[field].filter(i => i !== item) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, spots: parseInt(formData.spots) || 1 });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            
            {/* 1. OVERLAY OSCURO (Entra con fade-in estándar) */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
                onClick={onClose}
            ></div>
            
            {/* 2. EL CAPARAZÓN DEL MODAL (Acelerado por GPU) */}
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform-gpu animate-scale-in border border-outline-variant/20">
                
                {/* CABECERA: Glassmorphism siempre visible */}
                <div className="flex items-center justify-between px-6 py-4 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">
                        {convocation ? 'Editar Convocatoria' : 'Nueva Convocatoria'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* CUERPO: Mínimo alto para dar estructura */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    
                    {/* 3. EL FORMULARIO PESADO (Retrasado 150ms con CSS puro) */}
                    <form 
                        id="convocation-form" 
                        onSubmit={handleSubmit} 
                        className="space-y-6 animate-fade-in"
                        style={{ animationFillMode: 'both', animationDelay: '150ms' }} // <--- LA MAGIA ESTÁ AQUÍ
                    >
                        
                        {/* Title & Description */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Título de la convocatoria *</label>
                                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: Tutor de Matemáticas" />
                            </div>
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Descripción detallada *</label>
                                <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-outlined resize-none focus:bg-white" rows={4} placeholder="Describe las responsabilidades..." />
                            </div>
                        </div>

                        {/* Requirements & Skills */}
                        <div className="space-y-4 pt-2 border-t border-outline-variant/30">
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Requisitos específicos</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={requirementItem} onChange={(e) => setRequirementItem(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('requirements', requirementItem, setRequirementItem); } }} className="input-outlined flex-1 focus:bg-white" placeholder="Agregar requisito y presionar Enter..." />
                                    <button type="button" onClick={() => handleAddItem('requirements', requirementItem, setRequirementItem)} className="btn-tonal px-4"><Plus className="w-5 h-5" /></button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.requirements.map(item => (
                                        <span key={item} className="chip chip-selected">{item}<button type="button" onClick={() => handleRemoveItem('requirements', item)}><X className="w-3.5 h-3.5 ml-1" /></button></span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5"><Award className="w-4 h-4 inline mr-1.5 text-primary" />Habilidades requeridas</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={skillItem} onChange={(e) => setSkillItem(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('skills', skillItem, setSkillItem); } }} className="input-outlined flex-1 focus:bg-white" placeholder="Agregar habilidad..." />
                                    <button type="button" onClick={() => handleAddItem('skills', skillItem, setSkillItem)} className="btn-tonal px-4"><Plus className="w-5 h-5" /></button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map(item => (
                                        <span key={item} className="chip bg-primary/10 text-primary border border-primary/20">{item}<button type="button" onClick={() => handleRemoveItem('skills', item)}><X className="w-3.5 h-3.5 ml-1" /></button></span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-outline-variant/30">
                            <div><label className="block text-label-large text-on-surface mb-1.5">Experiencia</label><input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: No requerida" /></div>
                            <div><label className="block text-label-large text-on-surface mb-1.5">Disponibilidad</label><input type="text" value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: Fines de semana" /></div>
                            <div className="md:col-span-2"><label className="block text-label-large text-on-surface mb-1.5"><Clock className="w-4 h-4 inline mr-1.5 text-primary" />Compromiso</label><input type="text" value={formData.commitment} onChange={(e) => setFormData({ ...formData, commitment: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: 5 horas/semana" /></div>
                            <div><label className="block text-label-large text-on-surface mb-1.5"><MapPin className="w-4 h-4 inline mr-1.5 text-primary" />Ubicación</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: Remoto" /></div>
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Tipo de ubicación</label>
                                <select value={formData.locationType} onChange={(e) => setFormData({ ...formData, locationType: e.target.value })} className="input-outlined focus:bg-white cursor-pointer">
                                    <option value="presencial">Presencial</option><option value="remoto">Remoto</option><option value="hibrido">Híbrido</option>
                                </select>
                            </div>
                            <div className="md:col-span-2"><label className="block text-label-large text-on-surface mb-1.5"><Users className="w-4 h-4 inline mr-1.5 text-primary" />Vacantes *</label><input type="number" required min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined w-32 focus:bg-white text-center" /></div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-outline-variant/30">
                            <div><label className="block text-label-large text-on-surface mb-1.5"><Calendar className="w-4 h-4 inline mr-1.5 text-primary" />Fecha de inicio *</label><input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="input-outlined focus:bg-white cursor-pointer" /></div>
                            <div><label className="block text-label-large text-on-surface mb-1.5"><Calendar className="w-4 h-4 inline mr-1.5 text-primary" />Fecha de cierre *</label><input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="input-outlined focus:bg-white cursor-pointer" /></div>
                        </div>

                        {/* Extras */}
                        <div className="space-y-4 pt-4 border-t border-outline-variant/30 pb-4">
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Beneficios ofrecidos</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={benefitItem} onChange={(e) => setBenefitItem(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem('benefits', benefitItem, setBenefitItem); } }} className="input-outlined flex-1 focus:bg-white" placeholder="Agregar beneficio..." />
                                    <button type="button" onClick={() => handleAddItem('benefits', benefitItem, setBenefitItem)} className="btn-tonal px-4"><Plus className="w-5 h-5" /></button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.benefits.map(item => (
                                        <span key={item} className="chip bg-success/10 text-success border border-success/20">{item}<button type="button" onClick={() => handleRemoveItem('benefits', item)}><X className="w-3.5 h-3.5 ml-1" /></button></span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5"><MessageCircle className="w-4 h-4 inline mr-1.5 text-success" />Grupo WhatsApp (Aprobados)</label>
                                <input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://chat.whatsapp.com/..." />
                            </div>
                        </div>
                    </form>
                </div>

                {/* PIE DE MODAL: Glassmorphism */}
                <div className="flex gap-3 px-6 py-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg">
                        <Save className="w-4 h-4" /> {convocation ? 'Guardar Cambios' : 'Publicar Convocatoria'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminConvocationsPage() {
    const {
        convocations, updateConvocation, deleteConvocation,
        pauseConvocation, publishConvocation, closeConvocation,
        getActiveConvocations, getClosedConvocations
    } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    const activeConvocations = getActiveConvocations();
    const closedConvocations = getClosedConvocations();

    const filteredActiveConvocations = activeConvocations.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredClosedConvocations = closedConvocations.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSave = async (data) => {
        try {
            if (editingConvocation) {
                updateConvocation(editingConvocation.id, data); // Mock update
                alert("⚠️ Edición solo local por ahora.");
            } else {
                await crearConvocatoria(data);
                alert("✅ ¡Convocatoria creada exitosamente en el servidor!");
            }
            setIsModalOpen(false);
            setEditingConvocation(null);
        } catch (error) {
            console.error("Error:", error);
            alert(`❌ Error: ${error.error || error.detail || "Error desconocido"}`);
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta convocatoria?')) {
            deleteConvocation(id);
        }
    };

    // ... (Helpers de Badge se mantienen igual) ...
    const getStatusBadge = (status) => {
        const styles = { published: 'bg-success-container text-success', paused: 'bg-warning-container text-warning', closed: 'bg-surface-container text-on-surface-variant' };
        return <span className={`px-3 py-1 rounded-full text-label-small font-medium ${styles[status] || styles.published}`}>{status}</span>;
    };

    // --- RENDERIZADO PRINCIPAL CON LAYOUT MÓVIL OPTIMIZADO ---
    return (
        <AdminLayout 
            title="Gestión de Convocatorias" 
            subtitle="Crea, edita y administra las convocatorias de voluntariado."
        >
            {/* Header Actions & Tabs */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    <button onClick={() => setActiveTab('active')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'active' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        Activas ({activeConvocations.length})
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'history' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <Archive className="w-4 h-4 inline mr-1" /> Historial
                    </button>
                </div>
                
                {/* BOTÓN PC: Visible solo en sm en adelante */}
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex">
                    <Plus className="w-4 h-4" /> Nueva Convocatoria
                </button>
            </div>

            {/* Search Bar (Sticky en móvil) */}
            <div className="sticky top-0 z-10 bg-surface/90 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input type="text" placeholder="Buscar convocatorias..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" />
                    </div>
                    {activeTab === 'active' && (
                        <div className="relative w-1/3 sm:w-auto min-w-[140px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant" />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 sm:pl-10 pr-8 appearance-none bg-white/80 focus:bg-white text-sm sm:text-base">
                                <option value="all">Todos</option>
                                <option value="published">Publicadas</option>
                                <option value="paused">Pausadas</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant pointer-events-none" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content List */}
            {activeTab === 'active' && (
                <div className="space-y-4">
                    {filteredActiveConvocations.length === 0 ? (
                        <div className="card text-center py-12">
                            <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                            <h3 className="text-title-large text-on-surface">No hay convocatorias activas</h3>
                        </div>
                    ) : (
                        filteredActiveConvocations.map(convocation => (
                            <div key={convocation.id} className="card-elevated">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="text-title-medium sm:text-title-large font-medium truncate">{convocation.title}</h3>
                                            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs sm:text-sm font-bold flex items-center shrink-0">
                                                <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3">{getStatusBadge(convocation.status)}</div>
                                        <p className="text-body-small sm:text-body-medium text-on-surface-variant mb-3 line-clamp-3">{convocation.description}</p>
                                        <div className="flex flex-wrap gap-3 text-xs sm:text-body-small text-on-surface-variant">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {convocation.commitment}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {convocation.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40 mt-2 lg:mt-0">
                                        <button onClick={() => { setEditingConvocation(convocation); setIsModalOpen(true); }} className="btn-tonal py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                            <Edit className="w-4 h-4" /> <span className="hidden sm:inline">Editar</span>
                                        </button>
                                        
                                        {convocation.status === 'published' ? (
                                            <button onClick={() => pauseConvocation(convocation.id)} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                                <Pause className="w-4 h-4" /> <span className="hidden sm:inline">Pausar</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => publishConvocation(convocation.id)} className="btn-outlined border-success text-success hover:bg-success/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                                <Play className="w-4 h-4" /> <span className="hidden sm:inline">Publicar</span>
                                            </button>
                                        )}

                                        <button onClick={() => closeConvocation(convocation.id)} className="btn-outlined py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                            <Archive className="w-4 h-4" /> <span className="hidden sm:inline">Cerrar</span>
                                        </button>

                                        <button onClick={() => handleDelete(convocation.id)} className="btn-outlined border-error text-error hover:bg-error/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center transition-colors text-sm">
                                            <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* BOTÓN FLOTANTE (FAB) PARA MÓVILES: Solo visible hasta sm */}
            <button 
                onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} 
                className="sm:hidden fixed bottom-20 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"
                style={{ backdropFilter: "blur(8px)" }}
            >
                <Plus className="w-6 h-6" />
            </button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}