// src/components/Snackbar.jsx
import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, Trash2, X } from 'lucide-react';

export default function Snackbar({ show, message, type = 'info', onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }, 3500);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [show, onClose]);

    if (!show && !isVisible) return null;

    const styles = {
        success: "bg-success-container text-success border-success/20",
        info: "bg-primary-container text-primary border-primary/20",
        warning: "bg-warning-container text-warning border-warning/20",
        error: "bg-error text-white border-error shadow-error/30",
    };

    const icons = {
        success: <CheckCircle2 size={20} />,
        info: <Info size={20} />,
        warning: <AlertCircle size={20} />,
        error: <Trash2 size={20} />
    };

    const handleManualClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`fixed z-[200] flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-full shadow-elevation-4 border transition-all duration-300 ease-out
            top-4 sm:top-auto sm:bottom-6 left-1/2 -translate-x-1/2 w-[90vw] sm:w-fit max-w-md
            ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
            ${styles[type] || styles.info}`}>
            <div className="shrink-0">{icons[type]}</div>
            <span className="text-sm font-bold tracking-wide flex-1 text-left">{message}</span>
            <button onClick={handleManualClose} className="ml-2 p-1 rounded-full hover:bg-black/10 transition-colors shrink-0">
                <X size={16} />
            </button>
        </div>
    );
}