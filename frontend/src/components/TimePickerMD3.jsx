import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function TimePickerMD3({ label, value, onChange }) {
  // --- 1. LÓGICA DE DATOS ---
  const parseTime = (val) => {
    if (!val) return { hour: '12', minute: '00', period: 'AM' };
    let [h, m] = val.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12; 
    return { 
      hour: h.toString().padStart(2, '0'), 
      minute: m.toString().padStart(2, '0'), 
      period 
    };
  };

  const [time, setTime] = useState(parseTime(value));
  const [isOpen, setIsOpen] = useState(false);
  
  // Sincronizar valor externo solo cuando el modal se abre o cambia la prop
  useEffect(() => {
    if (!isOpen) {
        setTime(parseTime(value));
    }
  }, [value, isOpen]);

  // Función para guardar cambios finales (formateados)
  const commitTime = (newTimeState) => {
    let h = parseInt(newTimeState.hour || '0');
    let m = parseInt(newTimeState.minute || '0');

    // Validaciones finales al guardar
    if (h > 12) h = 12;
    if (h < 1) h = 12; // Si pone 0 en hora, asume 12
    if (m > 59) m = 59;

    const formattedHour = h.toString().padStart(2, '0');
    const formattedMinute = m.toString().padStart(2, '0');
    
    // Actualizamos estado local visualmente bonito
    const finalState = { ...newTimeState, hour: formattedHour, minute: formattedMinute };
    setTime(finalState);

    // Enviamos formato 24h al padre
    let h24 = h;
    if (newTimeState.period === 'PM' && h24 !== 12) h24 += 12;
    if (newTimeState.period === 'AM' && h24 === 12) h24 = 0;
    
    const h24Str = h24.toString().padStart(2, '0');
    onChange(`${h24Str}:${formattedMinute}`);
  };

  const handleFocus = (e) => e.target.select();

  return (
    <>
      {/* --- LABEL --- */}
      {label && <label className="block text-xs font-bold text-on-surface-variant mb-1 ml-1">{label}</label>}

      {/* --- TRIGGER VISUAL (El input que ves en el formulario) --- */}
      <div 
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all bg-surface-container-high
          ${isOpen ? 'border-primary ring-2 ring-primary/20 bg-white' : 'border-transparent hover:bg-surface-container-highest'}
        `}
      >
        <span className={`text-sm font-medium ${value ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
           {time.hour}:{time.minute} <span className="text-xs font-bold text-primary ml-1">{time.period}</span>
        </span>
      </div>

      {/* --- MODAL DIÁLOGO (OPTIMIZADO) --- */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 isolate" style={{touchAction: 'none'}}>
            
            {/* Backdrop: SIN BLUR para no sobrecargar el móvil. Solo color sólido. */}
            <div 
                className="absolute inset-0 bg-black/50 animate-fade-in gpu-accelerated"
                onClick={() => {
                    commitTime(time); 
                    setIsOpen(false);
                }}
            ></div>

            {/* Diálogo del Reloj con aceleración GPU */}
            <div className="relative bg-surface-container-high p-6 rounded-[28px] shadow-elevation-4 border border-outline-variant w-full max-w-[340px] transform animate-scale-in flex flex-col items-center gpu-accelerated">
                
                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-6 w-full text-left">Ingresar Hora</div>
                
                {/* Contenedor Inputs + AM/PM */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    
                    {/* INPUT HORA */}
                    <div className="flex flex-col gap-2 items-center">
                        <input 
                            type="text" 
                            inputMode="numeric"
                            maxLength={2}
                            value={time.hour}
                            onFocus={handleFocus}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setTime({ ...time, hour: val });
                            }}
                            onBlur={() => commitTime(time)}
                            className="w-[96px] h-[80px] text-[57px] leading-[64px] text-center font-normal bg-surface-container-highest rounded-xl text-on-surface focus:bg-primary/10 focus:text-primary outline-none transition-colors border border-transparent focus:border-primary/50 caret-primary"
                        />
                        <span className="text-xs font-medium text-on-surface-variant">Hora</span>
                    </div>

                    <span className="text-4xl text-on-surface pb-6">:</span>

                    {/* INPUT MINUTOS */}
                    <div className="flex flex-col gap-2 items-center">
                        <input 
                            type="text" 
                            inputMode="numeric"
                            maxLength={2}
                            value={time.minute}
                            onFocus={handleFocus}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setTime({ ...time, minute: val });
                            }}
                            onBlur={() => commitTime(time)}
                            className="w-[96px] h-[80px] text-[57px] leading-[64px] text-center font-normal bg-surface-container-highest rounded-xl text-on-surface focus:bg-primary/10 focus:text-primary outline-none transition-colors border border-transparent focus:border-primary/50 caret-primary"
                        />
                        <span className="text-xs font-medium text-on-surface-variant">Minutos</span>
                    </div>

                    {/* SELECTOR AM/PM */}
                    <div className="flex flex-col h-[80px] justify-between border border-outline-variant rounded-xl overflow-hidden ml-3 bg-surface w-[52px] mb-6 shadow-sm">
                        <button 
                            type="button"
                            onClick={() => { const newState = { ...time, period: 'AM' }; setTime(newState); commitTime(newState); }}
                            className={`h-1/2 flex items-center justify-center text-sm font-bold transition-colors border-b border-outline-variant ${time.period === 'AM' ? 'bg-tertiary-container text-tertiary-on-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
                        >AM</button>
                        <button 
                            type="button"
                            onClick={() => { const newState = { ...time, period: 'PM' }; setTime(newState); commitTime(newState); }}
                            className={`h-1/2 flex items-center justify-center text-sm font-bold transition-colors ${time.period === 'PM' ? 'bg-tertiary-container text-tertiary-on-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
                        >PM</button>
                    </div>
                </div>

                {/* Botón Aceptar */}
                <div className="w-full flex justify-end">
                    <button 
                        type="button" 
                        onClick={() => { commitTime(time); setIsOpen(false); }} 
                        className="text-primary font-bold text-sm px-6 py-2.5 hover:bg-primary/10 rounded-full transition-colors"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
}