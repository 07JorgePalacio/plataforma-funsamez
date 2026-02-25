import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Save, Plus, X, Calendar, Briefcase, FileText } from 'lucide-react';

const availabilityOptions = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados', 'Domingos'
];

const skillSuggestions = [
    'Educación', 'Primeros Auxilios', 'Logística', 'Comunicación',
    'Diseño', 'Redes Sociales', 'Cocina', 'Fotografía', 'Música',
    'Deportes', 'Manualidades', 'Idiomas'
];

export default function ProfilePage() {

    const { user, updateProfile, showToast } = useApp();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        skills: user?.skills || [],
        availability: user?.availability || [],
    });

    const [newSkill, setNewSkill] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleAddSkill = (skill) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skillToRemove),
        });
    };

    const handleToggleAvailability = (day) => {
        const newAvailability = formData.availability.includes(day)
            ? formData.availability.filter(d => d !== day)
            : [...formData.availability, day];
        setFormData({ ...formData, availability: newAvailability });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        updateProfile(formData);
        showToast('Perfil actualizado correctamente');
        setIsSaving(false);
    };

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Mi Perfil
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Actualiza tu información personal y preferencias de voluntariado.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Profile Picture & Basic Info */}
                <div className="card-elevated mb-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                            <div>
                                <label htmlFor="name" className="block text-label-large text-on-surface mb-2">
                                    Nombre completo
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input-outlined"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-label-large text-on-surface mb-2">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="input-outlined opacity-60 cursor-not-allowed"
                                />
                                <p className="text-body-small text-on-surface-variant mt-1">
                                    El correo no puede ser modificado
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="card-elevated mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-primary" />
                        <h2 className="text-title-large text-on-surface font-medium">
                            Acerca de mí
                        </h2>
                    </div>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="input-outlined resize-none"
                        rows={4}
                        placeholder="Cuéntanos un poco sobre ti, tu motivación para ser voluntario, experiencias previas..."
                    />
                </div>

                {/* Skills */}
                <div className="card-elevated mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h2 className="text-title-large text-on-surface font-medium">
                            Habilidades
                        </h2>
                    </div>

                    {/* Current Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.skills.map(skill => (
                            <span
                                key={skill}
                                className="chip chip-selected group"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="p-0.5 rounded-full hover:bg-secondary/30"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                        {formData.skills.length === 0 && (
                            <p className="text-body-medium text-on-surface-variant">
                                No has agregado habilidades aún
                            </p>
                        )}
                    </div>

                    {/* Add Skill */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddSkill(newSkill);
                                }
                            }}
                            className="input-outlined flex-1"
                            placeholder="Agregar habilidad..."
                        />
                        <button
                            type="button"
                            onClick={() => handleAddSkill(newSkill)}
                            className="btn-tonal"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar
                        </button>
                    </div>

                    {/* Skill Suggestions */}
                    <div>
                        <p className="text-label-large text-on-surface-variant mb-2">Sugerencias:</p>
                        <div className="flex flex-wrap gap-2">
                            {skillSuggestions
                                .filter(s => !formData.skills.includes(s))
                                .slice(0, 6)
                                .map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        onClick={() => handleAddSkill(skill)}
                                        className="chip hover:bg-primary/10"
                                    >
                                        <Plus className="w-3 h-3" />
                                        {skill}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="card-elevated mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h2 className="text-title-large text-on-surface font-medium">
                            Disponibilidad
                        </h2>
                    </div>
                    <p className="text-body-medium text-on-surface-variant mb-4">
                        Selecciona los días en los que estás disponible para actividades de voluntariado.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {availabilityOptions.map(day => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => handleToggleAvailability(day)}
                                className={`chip transition-all
                  ${formData.availability.includes(day)
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-primary/10'
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-filled w-full sm:w-auto disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
}
