import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearConvocatoria } from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout'; // <--- IMPORTAMOS EL LAYOUT
import {
    Plus, Edit, Trash2, X, Save, Calendar, MapPin, Users,
    Briefcase, Pause, Play, Archive, Clock,
    MessageCircle, Award, Search, Filter, ChevronDown
} from 'lucide-react';

// --- MODAL (Se mantiene igual, oculto para ahorrar espacio visual aquí) ---
function ConvocationFormModal({ convocation, onSave, onClose }) {
    // ... (El código del modal es idéntico al anterior, no cambia) ...
    // SI NECESITAS QUE TE PASE EL CÓDIGO DEL MODAL DE NUEVO, AVÍSAME.
    // PERO PUEDES DEJAR EL QUE YA TIENES SI NO LO HAS BORRADO.
    // Solo asegúrate de que use el estado formData correctamente.
    
    // --- IMPORTANTE: Copia aquí el componente ConvocationFormModal que ya tenías ---
    // (Resumido para brevedad, pero usa el tuyo completo)
    const [formData, setFormData] = useState(convocation || {
        title: '', description: '', requirements: [], skills: [], experience: '',
        availability: '', commitment: '', location: '', locationType: 'presencial',
        spots: 1, benefits: [], whatsappGroupLink: '', startDate: '', endDate: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // ... lógica de items ...
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await onSave({ ...formData, spots: parseInt(formData.spots) || 1 });
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="dialog-overlay" onClick={onClose}></div>
            <div className="dialog max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-surface pb-4 z-10">
                    <h2 className="text-headline-small text-on-surface font-medium">
                        {convocation ? 'Editar Convocatoria' : 'Nueva Convocatoria'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container">
                        <X className="w-5 h-5 text-on-surface-variant" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campos resumidos... usa tu form original */}
                     <div><label className="block text-label-large mb-2">Título *</label><input type="text" required value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} className="input-outlined" /></div>
                     <div><label className="block text-label-large mb-2">Descripción *</label><textarea required value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} className="input-outlined" rows={3}/></div>
                     
                     {/* Fechas */}
                     <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-label-large mb-2">Inicio *</label><input type="date" required value={formData.startDate} onChange={e=>setFormData({...formData, startDate:e.target.value})} className="input-outlined" /></div>
                        <div><label className="block text-label-large mb-2">Cierre *</label><input type="date" required value={formData.endDate} onChange={e=>setFormData({...formData, endDate:e.target.value})} className="input-outlined" /></div>
                     </div>
                     
                     {/* Vacantes */}
                     <div><label className="block text-label-large mb-2">Vacantes *</label><input type="number" required min="1" value={formData.spots} onChange={e=>setFormData({...formData, spots:e.target.value})} className="input-outlined w-32" /></div>
                     
                     {/* Habilidades (Importante para el backend) */}
                     <div>
                        <label className="block text-label-large mb-2">Habilidades</label>
                        <div className="flex gap-2"><input type="text" value={skillItem} onChange={e=>setSkillItem(e.target.value)} className="input-outlined flex-1"/><button type="button" onClick={()=>handleAddItem('skills', skillItem, setSkillItem)} className="btn-tonal"><Plus className="w-4 h-4"/></button></div>
                        <div className="flex flex-wrap gap-2 mt-2">{formData.skills.map(i=><span key={i} className="chip chip-selected">{i}<button type="button" onClick={()=>handleRemoveItem('skills', i)}><X className="w-3 h-3 ml-1"/></button></span>)}</div>
                     </div>

                    <div className="flex gap-3 pt-4 sticky bottom-0 bg-surface">
                        <button type="button" onClick={onClose} className="btn-outlined flex-1">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className="btn-filled flex-1"><Save className="w-4 h-4" /> Guardar</button>
                    </div>
                </form>
            </div>
        </>
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

    // --- RENDERIZADO PRINCIPAL CON LAYOUT ---
    return (
        <AdminLayout 
            title="Gestión de Convocatorias" 
            subtitle="Crea, edita y administra las convocatorias de voluntariado."
        >
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                     {/* Tabs */}
                    <button onClick={() => setActiveTab('active')} className={`px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'active' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        Activas ({activeConvocations.length})
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'history' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <Archive className="w-4 h-4 inline mr-1" /> Historial
                    </button>
                </div>
                
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled">
                    <Plus className="w-4 h-4" /> Nueva Convocatoria
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                    <input type="text" placeholder="Buscar convocatorias..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full" />
                </div>
                {activeTab === 'active' && (
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-10 pr-10 appearance-none">
                            <option value="all">Todos los estados</option>
                            <option value="published">Publicadas</option>
                            <option value="paused">Pausadas</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant pointer-events-none" />
                    </div>
                )}
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
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-title-large font-medium">{convocation.title}</h3>
                                            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-bold flex items-center">
                                                <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3">{getStatusBadge(convocation.status)}</div>
                                        <p className="text-body-medium text-on-surface-variant mb-3">{convocation.description}</p>
                                        <div className="flex gap-4 text-body-small text-on-surface-variant">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {convocation.commitment}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {convocation.location}</span>
                                        </div>
                                    </div>

                                    {/* --- AQUÍ ESTÁN TUS BOTONES CORREGIDOS --- */}
                                    <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40">
                                        <button onClick={() => { setEditingConvocation(convocation); setIsModalOpen(true); }} className="btn-tonal py-2 w-full justify-center">
                                            <Edit className="w-4 h-4" /> Editar
                                        </button>
                                        
                                        {convocation.status === 'published' ? (
                                            <button onClick={() => pauseConvocation(convocation.id)} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 w-full justify-center">
                                                <Pause className="w-4 h-4" /> Pausar
                                            </button>
                                        ) : (
                                            <button onClick={() => publishConvocation(convocation.id)} className="btn-outlined border-success text-success hover:bg-success/10 py-2 w-full justify-center">
                                                <Play className="w-4 h-4" /> Publicar
                                            </button>
                                        )}

                                        <button onClick={() => closeConvocation(convocation.id)} className="btn-outlined py-2 w-full justify-center">
                                            <Archive className="w-4 h-4" /> Cerrar
                                        </button>

                                        {/* --- BOTÓN ELIMINAR CORREGIDO (ROJO Y GRANDE) --- */}
                                        <button 
                                            onClick={() => handleDelete(convocation.id)} 
                                            className="btn-outlined border-error text-error hover:bg-error/10 py-2 w-full justify-center transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" /> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}