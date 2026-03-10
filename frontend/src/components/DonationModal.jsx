import { useState } from 'react';
import { X, Heart, Package, DollarSign, CreditCard, Building, Wallet, ArrowRight, CheckCircle } from 'lucide-react';

export default function DonationModal({ campaign, onClose }) {
    // Si campaign es null, es una donación general a la fundación
    const isGeneral = !campaign;
    
    // Determinar qué tipos de donación están permitidos
    const acceptsMoney = isGeneral || campaign?.permite_donacion_monetaria;
    const acceptsInKind = !isGeneral && campaign?.permite_donacion_especie;

    // Estados del flujo
    const [step, setStep] = useState(1);
    const [donationType, setDonationType] = useState(acceptsMoney ? 'money' : 'inkind');
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    // Opciones de montos predefinidos
    const presetAmounts = [20000, 50000, 100000, 200000];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
    };

    const handleNext = () => setStep(p => p + 1);
    const handleBack = () => setStep(p => p - 1);

    const handleProcessPayment = () => {
        // Aquí conectaremos la pasarela real más adelante (FUN-52)
        alert(`Simulando conexión con pasarela para: ${paymentMethod}. Monto: ${amount === 'custom' ? customAmount : amount}`);
        setStep(3); // Ir a la pantalla de éxito
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 isolate" style={{touchAction: 'none'}}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" onClick={onClose}></div>
            
            {/* Modal Container */}
            <div className="relative bg-surface rounded-[2rem] shadow-elevation-5 w-full max-w-lg flex flex-col overflow-hidden animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface z-10">
                    <h2 className="text-title-large text-on-surface font-bold flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary fill-current" />
                        {isGeneral ? 'Donación General' : 'Apoyar Campaña'}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-surface-container-lowest max-h-[80vh] overflow-y-auto">
                    
                    {/* Info de la Campaña */}
                    {!isGeneral && step < 3 && (
                        <div className="mb-6 p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-4">
                            {campaign.imagen_url ? (
                                <img src={campaign.imagen_url} alt={campaign.titulo} className="w-16 h-16 rounded-xl object-cover" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Heart className="w-8 h-8 text-primary" />
                                </div>
                            )}
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Tu apoyo va para:</p>
                                <p className="text-body-medium font-bold text-on-surface line-clamp-2">{campaign.titulo}</p>
                            </div>
                        </div>
                    )}

                    {/* --- PASO 1: Tipo de Donación y Monto --- */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Selector de Tipo (Solo si acepta ambos) */}
                            {acceptsMoney && acceptsInKind && (
                                <div className="flex bg-surface-container p-1 rounded-2xl">
                                    <button 
                                        onClick={() => setDonationType('money')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${donationType === 'money' ? 'bg-white text-primary shadow-sm ring-1 ring-primary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
                                    >
                                        <DollarSign className="w-4 h-4" /> Aporte Monetario
                                    </button>
                                    <button 
                                        onClick={() => setDonationType('inkind')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${donationType === 'inkind' ? 'bg-white text-secondary shadow-sm ring-1 ring-secondary/20' : 'text-on-surface-variant hover:text-on-surface'}`}
                                    >
                                        <Package className="w-4 h-4" /> Donar Especie
                                    </button>
                                </div>
                            )}

                            {/* Contenido según tipo */}
                            {donationType === 'money' ? (
                                <div className="space-y-4">
                                    <label className="block text-label-large font-bold text-on-surface">Selecciona el monto de tu aporte</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {presetAmounts.map(preset => (
                                            <button 
                                                key={preset}
                                                onClick={() => setAmount(preset)}
                                                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${amount === preset ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/50 bg-surface text-on-surface-variant hover:border-primary/30'}`}
                                            >
                                                {formatCurrency(preset)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative mt-2">
                                        <div className={`flex items-center border-2 rounded-xl transition-all ${amount === 'custom' ? 'border-primary bg-primary/5' : 'border-outline-variant/50 bg-surface focus-within:border-primary/50'}`}>
                                            <div className="pl-4 pr-2 text-on-surface-variant font-bold">$</div>
                                            <input 
                                                type="number" 
                                                placeholder="Otro monto"
                                                value={customAmount}
                                                onChange={(e) => { setAmount('custom'); setCustomAmount(e.target.value); }}
                                                onFocus={() => setAmount('custom')}
                                                className="w-full py-3 pr-4 bg-transparent outline-none font-bold text-on-surface"
                                            />
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={handleNext}
                                        disabled={!amount || (amount === 'custom' && (!customAmount || customAmount < 1000))}
                                        className="w-full btn-filled py-4 text-lg font-bold rounded-xl mt-6 shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all flex justify-center items-center gap-2"
                                    >
                                        Continuar al Pago <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4 text-center py-6">
                                    <Package className="w-16 h-16 text-secondary mx-auto mb-4 opacity-80" />
                                    <h3 className="text-title-large font-bold text-on-surface">Donaciones en Especie</h3>
                                    <p className="text-body-medium text-on-surface-variant mb-6">
                                        Para coordinar la entrega de tus insumos, por favor comunícate directamente con nuestro equipo de logística.
                                    </p>
                                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn-filled bg-secondary text-white py-4 w-full justify-center rounded-xl font-bold shadow-lg shadow-secondary/30">
                                        Contactar por WhatsApp
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- PASO 2: Selección de Método de Pago (FUN-48) --- */}
                    {step === 2 && donationType === 'money' && (
                        <div className="space-y-6 animate-slide-up">
                            <div className="flex items-center gap-3 mb-6">
                                <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-surface-container-high text-on-surface-variant"><ArrowLeft className="w-5 h-5" /></button>
                                <div>
                                    <p className="text-label-medium text-on-surface-variant">Total a donar</p>
                                    <p className="text-title-large font-bold text-primary">{formatCurrency(amount === 'custom' ? customAmount : amount)}</p>
                                </div>
                            </div>

                            <label className="block text-label-large font-bold text-on-surface">¿Cómo deseas pagar?</label>
                            
                            <div className="space-y-3">
                                {/* PSE */}
                                <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'pse' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface hover:border-primary/30'}`}>
                                    <input type="radio" name="payment" value="pse" className="hidden" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <Building className={`w-6 h-6 mr-4 ${paymentMethod === 'pse' ? 'text-primary' : 'text-on-surface-variant'}`} />
                                    <div className="flex-1">
                                        <p className="font-bold text-on-surface">PSE</p>
                                        <p className="text-xs text-on-surface-variant">Débito bancario (Ahorros/Corriente)</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pse' ? 'border-primary' : 'border-outline-variant'}`}>
                                        {paymentMethod === 'pse' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                </label>

                                {/* Tarjeta */}
                                <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface hover:border-primary/30'}`}>
                                    <input type="radio" name="payment" value="card" className="hidden" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <CreditCard className={`w-6 h-6 mr-4 ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface-variant'}`} />
                                    <div className="flex-1">
                                        <p className="font-bold text-on-surface">Tarjeta de Crédito / Débito</p>
                                        <p className="text-xs text-on-surface-variant">Visa, Mastercard, Amex</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-outline-variant'}`}>
                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                </label>

                                {/* Billeteras (Nequi/Daviplata) */}
                                <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface hover:border-primary/30'}`}>
                                    <input type="radio" name="payment" value="wallet" className="hidden" onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <Wallet className={`w-6 h-6 mr-4 ${paymentMethod === 'wallet' ? 'text-primary' : 'text-on-surface-variant'}`} />
                                    <div className="flex-1">
                                        <p className="font-bold text-on-surface">Billetera Digital</p>
                                        <p className="text-xs text-on-surface-variant">Nequi o Daviplata</p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-primary' : 'border-outline-variant'}`}>
                                        {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                </label>
                            </div>

                            <button 
                                onClick={handleProcessPayment}
                                disabled={!paymentMethod}
                                className="w-full btn-filled py-4 text-lg font-bold rounded-xl mt-6 shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-50 transition-all"
                            >
                                Proceder al Pago Seguro
                            </button>
                            <p className="text-[10px] text-center text-on-surface-variant mt-3 flex items-center justify-center gap-1">
                                Transacción encriptada de extremo a extremo.
                            </p>
                        </div>
                    )}

                    {/* --- PASO 3: Éxito (Simulado para FUN-50/51) --- */}
                    {step === 3 && (
                        <div className="text-center py-8 animate-slide-up">
                            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-success" />
                            </div>
                            <h3 className="text-headline-small font-bold text-on-surface mb-2">¡Gracias por tu apoyo!</h3>
                            <p className="text-body-large text-on-surface-variant mb-8 max-w-sm mx-auto">
                                Tu donación ha sido procesada exitosamente. Enviaremos el certificado a tu correo electrónico pronto.
                            </p>
                            <button onClick={onClose} className="btn-filled py-3.5 px-8 font-bold rounded-xl shadow-md">
                                Cerrar y Volver
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
