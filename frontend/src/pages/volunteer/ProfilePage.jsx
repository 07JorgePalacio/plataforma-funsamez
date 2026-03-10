import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Save, Plus, X, Calendar, Briefcase, FileText, Edit2, Check, AlertCircle, Phone, FileDigit, Mail, Camera, MapPin, Heart } from 'lucide-react';
import Snackbar from '../../components/Snackbar';
import { INTERESES_OPCIONES, HABILIDADES_OPCIONES, DIAS_SEMANA, JORNADAS } from '../../utils/constants';

export default function ProfilePage() {
    const { user, loading, updateProfile } = useApp();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });

    // Estado local mapeado exactamente a los campos de la base de datos
    const [formData, setFormData] = useState({
        nombre_completo: '',
        numero_telefono: '',
        numero_identificacion: '',
        profesion: '',
        direccion: '',          
        fecha_nacimiento: '',   
        tipo_documento: 'CC',   
        intereses: [],          
        habilidades: [],
        disponibilidad: {}
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nombre_completo: user.nombre_completo || user.nombre || user.name || '',
                numero_telefono: user.numero_telefono || user.telefono || user.phone || '',
                numero_identificacion: user.numero_identificacion || user.documento || user.identificacion || '',
                profesion: user.profesion || user.ocupacion || '',
                direccion: user.direccion || '', 
                fecha_nacimiento: user.fecha_nacimiento || '', 
                tipo_documento: user.tipo_documento || 'CC', 
                intereses: Array.isArray(user.intereses) ? user.intereses : [], 
                habilidades: Array.isArray(user.habilidades) ? user.habilidades : [],
                disponibilidad: user.disponibilidad || {}
            });
        }
    }, [user, isEditing]);

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleToggleSelection = (field, item) => {
        if (!isEditing) return;
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) {
                return { ...prev, [field]: list.filter(i => i !== item) }; // Lo apaga
            } else {
                return { ...prev, [field]: [...list, item] }; // Lo enciende
            }
        });
    };

    // Matriz de Disponibilidad Compleja (Día + Jornada)
    const handleToggleAvailability = (day, slotId) => {
        if (!isEditing) return; 
        setFormData(prev => {
            const currentSchedule = { ...prev.disponibilidad };
            const daySlots = currentSchedule[day] || [];
            
            if (daySlots.includes(slotId)) {
                currentSchedule[day] = daySlots.filter(s => s !== slotId);
                if (currentSchedule[day].length === 0) delete currentSchedule[day];
            } else {                
                currentSchedule[day] = [...daySlots, slotId];
            }
            
            return { ...prev, disponibilidad: currentSchedule };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre_completo.trim()) {
            setSnackbar({ show: true, message: 'El nombre completo es obligatorio.', type: 'error' });
            return;
        }

        setIsSaving(true);
        try {
            // Simulamos o llamamos a la API real
            if (updateProfile) {
                 await updateProfile(formData);
            }
            setSnackbar({ show: true, message: '¡Perfil actualizado con éxito!', type: 'success' });
            setIsEditing(false);
        } catch (error) {
            setSnackbar({ show: true, message: error.message || 'Error al guardar los cambios.', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            
            {/* Header con botón de edición */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                        Mi Perfil
                    </h1>
                    <p className="text-body-large text-on-surface-variant">
                        {isEditing ? 'Modifica tu información y preferencias.' : 'Gestiona tu información personal y habilidades.'}
                    </p>
                </div>
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn-filled flex items-center gap-2 shadow-sm font-bold">
                        <Edit2 className="w-4 h-4" /> Editar Perfil
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Información Personal */}
                <div className="card-elevated border-none bg-surface p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                    
                    {/* Cabecera con Foto de Perfil */}
                    <div className="flex flex-col sm:flex-row gap-6 mb-8 pb-6 border-b border-outline-variant/30">
                        <div className="flex flex-col items-center justify-center shrink-0">
                            <div className="relative group">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary/10 border-4 border-surface shadow-md flex items-center justify-center text-primary font-bold text-4xl overflow-hidden">
                                    {/* Aquí irá el <img src={...} /> en el Sprint 3. Por ahora, inicial del nombre: */}
                                    {formData.nombre_completo.charAt(0).toUpperCase() || <User size={40} />}
                                </div>
                                {isEditing && (
                                    <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                                        <Camera className="w-6 h-6 mb-1" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Cambiar</span>
                                        <input type="file" accept="image/*" className="hidden" disabled={!isEditing} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                            <h2 className="text-title-large text-on-surface font-bold flex items-center justify-center sm:justify-start gap-2">
                                <User className="w-6 h-6 text-primary" /> Información Personal
                            </h2>
                            <p className="text-body-medium text-on-surface-variant mt-1">
                                {isEditing ? 'Haz clic en tu avatar para actualizar tu foto (Disponible pronto).' : 'Tus datos básicos de contacto e identidad.'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Nombre Completo */}
                        <div className="sm:col-span-2">
                            <label className="block text-label-large text-on-surface font-bold mb-2">Nombre Completo</label>
                            {isEditing ? (
                                <input type="text" value={formData.nombre_completo} onChange={(e) => setFormData({...formData, nombre_completo: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" />
                            ) : (
                                <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30 font-medium">{formData.nombre_completo || 'No especificado'}</p>
                            )}
                        </div>

                        {/* Correo (Siempre Solo Lectura) */}
                        <div className="sm:col-span-2 md:col-span-1">
                            <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><Mail className="w-4 h-4"/> Correo Electrónico</label>
                            <p className="text-body-medium text-on-surface-variant bg-surface-container-high px-4 py-3 rounded-xl border border-outline-variant/30 flex items-center justify-between">
                                {user.correo_electronico || user.email || 'No especificado'}
                                <span className="text-[10px] font-bold bg-surface-variant/20 px-2 py-0.5 rounded uppercase tracking-wider">No editable</span>
                            </p>
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><Phone className="w-4 h-4"/> Teléfono</label>
                            {isEditing ? (
                                <input type="tel" value={formData.numero_telefono} onChange={(e) => setFormData({...formData, numero_telefono: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" placeholder="Ej: 3001234567" />
                            ) : (
                                <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30">{formData.numero_telefono || 'No especificado'}</p>
                            )}
                        </div>

                        {/* Tipo y N° Documento */}
                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-1">
                                <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><FileDigit className="w-4 h-4"/> Tipo Doc.</label>
                                {isEditing ? (
                                    <select value={formData.tipo_documento} onChange={(e) => setFormData({...formData, tipo_documento: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white">
                                        <option value="CC">Cédula de Ciudadanía</option>
                                        <option value="CE">Cédula de Extranjería</option>
                                        <option value="TI">Tarjeta de Identidad</option>
                                        <option value="PP">Pasaporte</option>
                                    </select>
                                ) : (
                                    <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30 font-medium">{formData.tipo_documento || 'CC'}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><FileDigit className="w-4 h-4"/> N° Identificación</label>
                                {isEditing ? (
                                    <input type="text" value={formData.numero_identificacion} onChange={(e) => setFormData({...formData, numero_identificacion: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" placeholder="Cédula o ID" />
                                ) : (
                                    <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30">{formData.numero_identificacion || 'No especificado'}</p>
                                )}
                            </div>
                        </div>

                        {/* Fecha de Nacimiento */}
                        <div>
                            <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Fecha Nacimiento</label>
                            {isEditing ? (
                                <input type="date" value={formData.fecha_nacimiento} onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" />
                            ) : (
                                <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30">{formData.fecha_nacimiento || 'No especificada'}</p>
                            )}
                        </div>

                        {/* Profesión */}
                        <div>
                            <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><FileText className="w-4 h-4"/> Profesión / Ocupación</label>
                            {isEditing ? (
                                <input type="text" value={formData.profesion} onChange={(e) => setFormData({...formData, profesion: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" placeholder="Ej: Estudiante, Ingeniero..." />
                            ) : (
                                <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30">{formData.profesion || 'No especificado'}</p>
                            )}
                        </div>

                        {/* Dirección */}
                        <div className="sm:col-span-2">
                            <label className="block text-label-large text-on-surface font-bold mb-2 flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Dirección de Residencia</label>
                            {isEditing ? (
                                <input type="text" value={formData.direccion} onChange={(e) => setFormData({...formData, direccion: e.target.value})} className="input-outlined w-full bg-white/50 focus:bg-white" placeholder="Ej: Calle 123 # 45-67" />
                            ) : (
                                <p className="text-body-large text-on-surface bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/30">{formData.direccion || 'No especificada'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 1.5 Intereses (Causas de Interés) */}
                <div className="card-elevated border-none bg-surface p-6 sm:p-8 rounded-3xl">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                        <Heart className="w-6 h-6 text-primary" />
                        <div>
                           <h2 className="text-title-large text-on-surface font-bold">Causas de Interés</h2>
                           <p className="text-body-small text-on-surface-variant mt-1">¿Qué temas te apasionan? Esto nos ayuda a conectarte con la convocatoria ideal.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {isEditing ? (
                            INTERESES_OPCIONES.map(interest => {
                                const isSelected = formData.intereses.includes(interest);
                                return (
                                    <button 
                                        key={interest} 
                                        type="button" 
                                        onClick={() => handleToggleSelection('intereses', interest)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${isSelected ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low'}`}
                                    >
                                        {isSelected && <Check size={16} />} {interest}
                                    </button>
                                );
                            })
                        ) : (
                            formData.intereses.map((interest, index) => (
                                <span key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 text-primary-dark font-bold text-sm border border-primary/20 shadow-sm transition-all cursor-default">
                                    <Check size={14} className="text-primary" /> {interest}
                                </span>
                            ))
                        )}
                        
                        {!isEditing && formData.intereses.length === 0 && (
                            <div className="w-full p-4 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/50 text-center">
                                <p className="text-body-medium text-on-surface-variant">Aún no has registrado áreas de interés. ¡Haz clic en Editar Perfil!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Habilidades */}
                <div className="card-elevated border-none bg-surface p-6 sm:p-8 rounded-3xl">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                        <Briefcase className="w-6 h-6 text-primary" />
                        <div>
                           <h2 className="text-title-large text-on-surface font-bold">Mis Habilidades</h2>
                           <p className="text-body-small text-on-surface-variant mt-1">Destaca tus conocimientos para encontrar las mejores convocatorias.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {isEditing ? (
                            HABILIDADES_OPCIONES.map(skill => {
                                const isSelected = formData.habilidades.includes(skill);
                                return (
                                    <button 
                                        key={skill} 
                                        type="button" 
                                        onClick={() => handleToggleSelection('habilidades', skill)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${isSelected ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container-low'}`}
                                    >
                                        {isSelected && <Check size={16} />} {skill}
                                    </button>
                                );
                            })
                        ) : (
                            formData.habilidades.map((skill, index) => (
                                <span key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary-dark font-bold text-sm border border-primary/20 shadow-sm transition-all cursor-default">
                                    <Check size={14} className="text-primary" /> {skill}
                                </span>
                            ))
                        )}

                        {!isEditing && formData.habilidades.length === 0 && (
                            <div className="w-full p-4 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/50 text-center">
                                <p className="text-body-medium text-on-surface-variant">Aún no has registrado habilidades. ¡Haz clic en Editar Perfil!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Matriz de Disponibilidad (Diseño Idéntico a Registro) */}
                <div className="card-elevated border-none bg-surface p-6 sm:p-8 rounded-3xl">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
                        <Calendar className="w-6 h-6 text-primary" />
                        <div>
                           <h2 className="text-title-large text-on-surface font-bold uppercase tracking-wider">¿Cuándo puedes ayudarnos?</h2>
                           <p className="text-body-small text-on-surface-variant mt-1">Indica qué días y jornadas de la semana estás disponible para ser voluntario.</p>
                        </div>
                    </div>

                    <div className="bg-surface-container/50 rounded-xl border border-outline-variant/50 overflow-hidden">
                        {/* Cabecera de la Tabla */}
                        <div className="grid grid-cols-3 bg-primary/5 border-b border-primary/10 p-3">
                            <div className="font-bold text-primary text-sm">Día</div>
                            {JORNADAS.map(jornada => (
                                <div key={jornada.id} className="font-bold text-primary text-sm text-center">
                                    {jornada.label.split(' ')[0]} <span className="hidden sm:inline text-xs font-normal opacity-70">{jornada.label.split(' ')[1]}</span>
                                </div>
                            ))}
                        </div>

                        {/* Cuerpo de la Tabla */}
                        <div className="divide-y divide-outline-variant/30">
                            {DIAS_SEMANA.map(dia => {
                                const isActiveDay = formData.disponibilidad[dia]?.length > 0;
                                return (
                                    <div key={dia} className={`grid grid-cols-3 p-3 transition-colors ${isActiveDay ? 'bg-white' : 'hover:bg-white/50'}`}>
                                        <div className={`flex items-center text-sm font-medium ${isActiveDay ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                            {dia}
                                        </div>
                                        {JORNADAS.map(jornada => {
                                            const isSelected = formData.disponibilidad[dia]?.includes(jornada.id);
                                            return (
                                                <div key={jornada.id} className="flex justify-center">
                                                    <button
                                                        type="button"
                                                        disabled={!isEditing}
                                                        onClick={() => handleToggleAvailability(dia, jornada.id)}
                                                        className={`
                                                            w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border
                                                            ${isSelected 
                                                                ? (isEditing ? 'bg-primary text-white border-primary shadow-sm scale-110' : 'bg-success text-white border-success shadow-sm cursor-default') 
                                                                : (isEditing ? 'bg-surface border-outline-variant text-transparent hover:border-primary/50' : 'bg-surface-container-lowest border-transparent text-transparent cursor-not-allowed opacity-50')
                                                            }
                                                        `}
                                                    >
                                                        <Check size={18} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {!isEditing && Object.keys(formData.disponibilidad).length === 0 && (
                        <div className="mt-4 p-4 bg-warning/10 rounded-xl border border-warning/20 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                            <p className="text-body-small text-on-surface-variant">No has registrado tu disponibilidad. Esto puede afectar tus coincidencias con convocatorias. ¡Haz clic en Editar Perfil para actualizarla!</p>
                        </div>
                    )}
                </div>

                {/* Acciones de Edición */}
                {isEditing && (
                    <div className="sticky bottom-4 z-50 flex flex-col sm:flex-row gap-4 p-4 bg-surface/90 backdrop-blur-md rounded-2xl border border-outline-variant/30 shadow-elevation-4 animate-slide-up">
                        <button type="button" onClick={handleCancelEdit} disabled={isSaving} className="btn-tonal flex-1 font-bold py-3">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSaving} className="btn-filled flex-[2] font-bold py-3 shadow-primary/30 shadow-lg flex justify-center items-center">
                            {isSaving ? (
                                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span> Guardando...</>
                            ) : (
                                <><Save className="w-5 h-5 mr-2" /> Guardar Cambios</>
                            )}
                        </button>
                    </div>
                )}
            </form>

            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
        </div>
    );
}