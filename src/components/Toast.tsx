// Path: src/components/Toast.tsx
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgGradient = type === 'success' 
    ? 'from-emerald-500 to-teal-500' 
    : 'from-rose-500 to-pink-500';

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div
      className={`
        fixed z-50 transition-all duration-300 transform
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
        /* Mobile: Full width with margins */
        top-4 left-4 right-4
        /* Tablet: Centered with max-width */
        md:left-auto md:right-6 md:top-6 md:max-w-md md:w-auto
      `}
    >
      <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 overflow-hidden w-full">
        <div className={`h-1 bg-gradient-to-r ${bgGradient}`}></div>
        
        <div className="p-4 flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 dark:text-white font-medium leading-relaxed break-words text-sm md:text-base">
              {message}
            </p>
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center group"
          >
            <X className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );

  return { showToast, ToastContainer };
};