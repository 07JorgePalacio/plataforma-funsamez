import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

// --- CONSTANTES ---
const MAX_SELECTION = 5; 
const INITIAL_VISIBLE_COUNT = 8; 

const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PPT', label: 'Permiso por Protección Temporal (PPT)' },
  { value: 'PAS', label: 'Pasaporte' }
];

const COUNTRY_CODES = [
  { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' },
  { code: '+1', country: 'US' },
  { code: '+34', country: 'ES' },
  { code: '+52', country: 'MX' },
  { code: '+51', country: 'PE' },
  { code: '+593', country: 'EC' },
];

const INTERESES_OPCIONES = [
  "Educación Infantil", "Medio Ambiente", "Adulto Mayor", 
  "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", 
  "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial",
  "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal",
  "Apoyo en Desastres", "Tutorías Académicas", "Inclusión Social"
];

const HABILIDADES_OPCIONES = [
  "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva",
  "Inglés Básico", "Inglés Avanzado", "Excel / Office", 
  "Diseño Gráfico", "Programación / IT", 
  "Primeros Auxilios", "Fotografía y Video", "Redacción", 
  "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía",
  "Conducción", "Cocina", "Manualidades"
];

const DIAS_SEMANA = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];
const JORNADAS = [
  { id: 'manana', label: 'Mañana (8am - 12pm)' },
  { id: 'tarde', label: 'Tarde (2pm - 6pm)' }
];

// --- COMPONENTE INPUT AUXILIAR ---
const InputField = ({ label, name, type = "text", required = false, placeholder = "", formData, handleChange, errors, numericOnly = false }) => (
  <div className="space-y-1 scroll-mt-24" id={`field-${name}`}>
    <label className="text-sm font-semibold text-on-surface">
      {label} {required && <span className="text-error">*</span>}
    </label>
    <input 
      name={name} 
      type={type} 
      required={required} 
      placeholder={placeholder}
      value={formData[name] || ''} 
      onChange={(e) => handleChange(e, numericOnly)} 
      className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all
        ${errors[name] 
          ? "border-error bg-error-container text-error focus:border-error focus:ring-4 focus:ring-error/10" 
          : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface"
        }
      `} 
    />
    {errors[name] && (
      <div className="flex items-center mt-1 text-error animate-pulse">
        <AlertCircle size={14} className="mr-1" />
        <span className="text-xs font-bold">{errors[name]}</span>
      </div>
    )}
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados UI
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Estado Formulario
  const [countryCode, setCountryCode] = useState('+57');
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '', 
    fecha_nacimiento: '',
    tipo_documento: 'CC',
    numero_identificacion: '',
    profesion: '',
    intereses: [], 
    habilidades: [],
    disponibilidad: {}
  });

  // Efecto Auto-Scroll a errores
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const element = document.getElementById(`field-${errorKeys[0]}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [errors]);

  //Validación de confirmación de contraseña en tiempo real
  useEffect(() => {
    if (formData.confirmPassword.length > 0) {
      // Si lo que va escribiendo NO es el inicio exacto de la contraseña, lanza error al instante
      if (!formData.password.startsWith(formData.confirmPassword)) {
        setErrors(prev => ({ 
          ...prev, 
          confirmPassword: "Las contraseñas no coinciden." 
        }));
      } else {
        // Si va escribiendo bien, o si ya la completó exactamente igual, borra el error
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  }, [formData.password, formData.confirmPassword]);

  // Manejador de Inputs con restricción numérica
  const handleChange = (e, numericOnly = false) => {
    const { name, value } = e.target;
    
    if (numericOnly && value !== '' && !/^\d+$/.test(value)) {
        return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const currentList = prev[field];
      if (currentList.includes(value)) {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      } else {
        if (currentList.length >= MAX_SELECTION) return prev;
        return { ...prev, [field]: [...currentList, value] };
      }
    });
  };

  const toggleAvailability = (day, slotId) => {
    setFormData(prev => {
      const currentSchedule = { ...prev.disponibilidad };
      const daySlots = currentSchedule[day] || [];
      
      if (daySlots.includes(slotId)) {
        // Si ya está, lo quitamos
        currentSchedule[day] = daySlots.filter(s => s !== slotId);
        // Limpieza: si el día queda vacío, borramos la llave para ahorrar espacio
        if (currentSchedule[day].length === 0) delete currentSchedule[day];
      } else {
        // Si no está, lo agregamos
        currentSchedule[day] = [...daySlots, slotId];
      }
      
      return { ...prev, disponibilidad: currentSchedule };
    });
  };


  const validateForm = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = ["La contraseña debe tener mínimo 8 caracteres."];
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = ["Las contraseñas no coinciden."];
    }
    if (!formData.numero_identificacion) {
        newErrors.numero_identificacion = ["El documento es obligatorio."];
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    
    const localErrors = validateForm();
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
          ...formData,
          telefono: formData.telefono ? `${countryCode} ${formData.telefono}` : ''
      };

      await axios.post('http://127.0.0.1:8000/api/users/register/', payload);
      
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/login'), 3000);

    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        const normalizedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
            if (key === 'non_field_errors') {
                setGeneralError(backendErrors[key][0]);
            } else {
                normalizedErrors[key] = Array.isArray(backendErrors[key]) ? backendErrors[key][0] : backendErrors[key];
            }
        });
        setErrors(normalizedErrors);
      } else {
        setGeneralError("Error de conexión con el servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Protección contra recarga accidental
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const isDirty = Object.values(formData).some(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== '' && value !== 'CC' && value !== '+57';
      });

      if (isDirty && !isSuccess) {
        e.preventDefault();
        e.returnValue = ''; 
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, isSuccess]);

  const renderChipsSection = (title, field, optionsList, showAllState, setShowAllState) => {
    const currentCount = formData[field].length;
    const visibleOptions = showAllState ? optionsList : optionsList.slice(0, INITIAL_VISIBLE_COUNT);
    const hasMore = optionsList.length > INITIAL_VISIBLE_COUNT;

    return (
      <div className="md:col-span-2 mt-6">
        <div className="flex justify-between items-baseline mb-3">
            <label className="text-sm font-semibold text-on-surface block">{title}</label>
            <span className={`text-xs font-medium ${currentCount === MAX_SELECTION ? 'text-primary' : 'text-on-surface-variant'}`}>
                {currentCount}/{MAX_SELECTION} seleccionados
            </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleOptions.map(item => {
            const isSelected = formData[field].includes(item);
            const isDisabled = !isSelected && currentCount >= MAX_SELECTION;
            return (
            <button key={item} type="button" onClick={() => toggleSelection(field, item)} disabled={isDisabled}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 
                ${isSelected 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : isDisabled 
                    ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed" 
                    : "bg-white text-on-surface border-outline-variant hover:border-primary hover:text-primary"
                }`}
            >
              {isSelected && <Check size={14} />} {item}
            </button>
          )})}
        </div>
        {hasMore && (
          <button type="button" onClick={() => setShowAllState(!showAllState)} className="mt-3 text-sm text-primary flex items-center font-medium hover:underline">
            {showAllState ? <><ChevronUp size={16} className="mr-1"/> Ver menos</> : <><ChevronDown size={16} className="mr-1"/> Ver más opciones</>}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-4 py-10 animate-fade-in">
      <div className="text-center mb-8 max-w-md animate-slide-down">
        <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg mb-4">
             <span className="text-white text-2xl font-bold">F</span>
        </div>
        <h1 className="text-4xl font-bold text-on-surface mb-2">Únete a FUNSAMEZ</h1>
        <p className="text-on-surface-variant text-lg">Crea tu cuenta y sé parte del cambio.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 md:p-12 relative overflow-hidden">
        {isLoading && (<div className="absolute top-0 left-0 w-full h-1.5 bg-surface-container"><div className="h-full bg-primary animate-progress-indeterminate"></div></div>)}
        
        {isSuccess && (
          <div className="bg-success-container border border-success/20 text-success p-6 mb-8 rounded-xl text-center font-medium flex flex-col items-center justify-center animate-pulse shadow-sm">
            <Check size={28} className="text-success mb-2" />
            <span className="text-2xl font-bold mb-1">¡Registro Exitoso!</span>
            <span className="text-sm text-primary mt-2 font-semibold">Redirigiendo...</span>
          </div>
        )}

        {generalError && (
          <div className="bg-error-container border-l-4 border-error text-error p-4 mb-6 rounded-md flex items-center animate-shake">
            <AlertCircle size={24} className="mr-3 flex-shrink-0" /> <span className="font-medium">{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 ${isLoading || isSuccess ? 'opacity-50 pointer-events-none' : ''}`}>
          
          <div className="md:col-span-2 pb-2 border-b border-outline-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider mb-2">Información Básica</div>

          <InputField label="Nombre Completo" name="nombre_completo" required formData={formData} handleChange={handleChange} errors={errors} />
          
          {/* GRUPO DE DOCUMENTO: TIPO + NUMERO */}
          <div className="space-y-1">
             <label className="text-sm font-semibold text-on-surface">Tipo Documento <span className="text-error">*</span></label>
             <div className="relative">
                <select
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:bg-white focus:border-primary appearance-none cursor-pointer text-on-surface"
                >
                    {DOCUMENT_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant pointer-events-none" size={16} />
             </div>
          </div>

          <InputField 
            label="Número de Documento" 
            name="numero_identificacion" 
            required 
            formData={formData} 
            handleChange={handleChange} 
            errors={errors}
            numericOnly={true}
            placeholder="Solo números, sin puntos"
          />
          
          <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" required formData={formData} handleChange={handleChange} errors={errors} />
          <InputField label="Profesión / Ocupación" name="profesion" formData={formData} handleChange={handleChange} errors={errors} />

          <div className="md:col-span-2 pb-2 border-b border-outline-variant text-on-surface-variant font-bold uppercase text-xs tracking-wider mt-6 mb-2">Acceso y Contacto</div>

          <InputField label="Correo Electrónico" name="email" type="email" required placeholder="ejemplo@correo.com" formData={formData} handleChange={handleChange} errors={errors} />
          
          {/* GRUPO TELÉFONO: CÓDIGO PAIS + NUMERO */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-on-surface">Teléfono / WhatsApp</label>
            <div className="flex gap-2">
                <div className="relative w-1/3">
                    <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full px-2 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:border-primary appearance-none text-center font-medium text-on-surface"
                    >
                        {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.country} ({c.code})</option>)}
                    </select>
                </div>
                <input 
                    name="telefono"
                    type="tel"
                    placeholder="300 123 4567"
                    value={formData.telefono}
                    onChange={(e) => handleChange(e, true)}
                    className="w-2/3 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-on-surface"
                />
            </div>
          </div>

          {/* GRUPO DE CONTRASEÑAS */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 scroll-mt-24" id="field-password">
            
            {/* Contraseña Original */}
            <div className="space-y-1 relative z-10">
              <label className="text-sm font-semibold text-on-surface">Contraseña <span className="text-error">*</span></label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Mínimo 8 caracteres"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all pr-12 ${errors.password ? "border-error bg-error-container text-error" : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary text-on-surface"}`} 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary p-1">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <div className="flex items-center mt-1 text-error animate-pulse"><AlertCircle size={14} className="mr-1" /><span className="text-xs font-bold">{errors.password}</span></div>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1 relative z-10" id="field-confirmPassword">
              <label className="text-sm font-semibold text-on-surface">Confirmar Contraseña <span className="text-error">*</span></label>
              <div className="relative">
                <input 
                  name="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  required 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Repite tu contraseña"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all pr-12 ${errors.confirmPassword ? "border-error bg-error-container text-error focus:ring-4 focus:ring-error/10" : "border-outline-variant bg-surface-container focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-on-surface"}`} 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant hover:text-primary p-1">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <div className="flex items-center mt-1 text-error animate-pulse"><AlertCircle size={14} className="mr-1" /><span className="text-xs font-bold">{errors.confirmPassword}</span></div>}
            </div>

          </div>

          <div className="md:col-span-2 pb-2 border-b border-primary/30 text-primary font-bold uppercase text-sm tracking-wider mt-8">Tu Perfil de Voluntario</div>
          {/* SECCIÓN: DISPONIBILIDAD DE TIEMPO */}
          <div className="md:col-span-2 mt-8">
            <label className="text-sm font-semibold text-on-surface block mb-4 uppercase tracking-wider text-primary">
              ¿Cuándo puedes ayudarnos?
            </label>
            
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
                              onClick={() => toggleAvailability(dia, jornada.id)}
                              className={`
                                w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border
                                ${isSelected 
                                  ? 'bg-primary text-white border-primary shadow-sm scale-110' 
                                  : 'bg-surface border-outline-variant text-transparent hover:border-primary/50'
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
            <p className="text-xs text-on-surface-variant mt-2 ml-1">
              * Selecciona los bloques aproximados. Podrás coordinar detalles específicos luego.
            </p>
          </div>

          <div className="md:col-span-2 pb-2 border-b border-primary/30 text-primary font-bold uppercase text-sm tracking-wider mt-8">Detalles de Perfil</div>

          {renderChipsSection("Áreas de Interés", "intereses", INTERESES_OPCIONES, showAllInterests, setShowAllInterests)}
          {renderChipsSection("Habilidades Destacadas", "habilidades", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills)}

          <div className="md:col-span-2 mt-10">
            <button type="submit" disabled={isLoading || isSuccess} className={`w-full font-bold py-4 rounded-xl shadow-xl transition-all transform text-lg flex justify-center items-center ${isLoading || isSuccess ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed shadow-none" : "bg-primary hover:bg-primary-dark text-white shadow-primary/30 active:scale-[0.98]"}`}>
              {isLoading ? <><Loader2 className="mr-3 animate-spin" size={24} /> Validando...</> : isSuccess ? "¡Bienvenido a la familia!" : "¡Completar Registro!"}
            </button>
          </div>
        </form>
      </div>
      <p className="mt-8 text-center text-on-surface-variant">¿Ya eres parte de FUNSAMEZ? <Link to="/login" className="text-primary font-bold hover:underline ml-1">Inicia Sesión</Link></p>
      
      <style>{`
        @keyframes progress-indeterminate { 0% { width: 0%; margin-left: 0%; } 50% { width: 70%; margin-left: 30%; } 100% { width: 0%; margin-left: 100%; } }
        .animate-progress-indeterminate { animation: progress-indeterminate 1.5s infinite ease-in-out; }
        @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};

export default RegisterPage;
