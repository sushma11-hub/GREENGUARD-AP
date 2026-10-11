import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[70] animate-slideUp">
      <div className="flex items-center gap-2.5 bg-white border border-green-200 shadow-xl rounded-xl px-4 py-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-800">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
