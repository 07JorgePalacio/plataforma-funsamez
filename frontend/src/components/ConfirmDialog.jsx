// src/components/ConfirmDialog.jsx
import { AlertTriangle, Info } from 'lucide-react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, type = 'danger', confirmText = 'Confirmar', cancelText = 'Cancelar' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 isolate" style={{ touchAction: 'none' }}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in" onClick={onCancel}></div>
            <div className="relative bg-surface rounded-3xl p-6 max-w-sm w-full shadow-elevation-4 animate-slide-up text-center flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${type === 'danger' ? 'bg-error-container text-error' : 'bg-primary-container text-primary'}`}>
                    {type === 'danger' ? <AlertTriangle size={28} /> : <Info size={28} />}
                </div>
                <h3 className="text-title-large font-bold text-on-surface mb-2">{title}</h3>
                <p className="text-body-medium text-on-surface-variant mb-6">{message}</p>
                <div className="flex w-full gap-3">
                    <button onClick={onCancel} className="btn-outlined flex-1 font-bold">{cancelText}</button>
                    <button onClick={onConfirm} className={`btn-filled flex-1 font-bold ${type === 'danger' ? 'bg-error hover:bg-error/90 text-white border-error shadow-error/20' : ''}`}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}