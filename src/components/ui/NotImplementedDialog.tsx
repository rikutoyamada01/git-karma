import React from 'react';
import { X } from 'lucide-react';

interface NotImplementedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export const NotImplementedDialog = ({ isOpen, onClose, featureName }: NotImplementedDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl w-full max-w-md p-6 m-4 animate-in zoom-in-95 duration-200 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#58a6ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚧</span>
          </div>
          <h3 className="text-xl font-bold text-[#c9d1d9] mb-2">Not Implemented Yet</h3>
          <p className="text-[#8b949e] mb-6">
            Sorry, the <strong>{featureName || 'requested feature'}</strong> is currently under development. 
            <br />
            We are working hard to bring it to you soon!
          </p>
          <button 
            onClick={onClose}
            className="bg-[#238636] text-white px-6 py-2 rounded-md font-medium hover:bg-[#2ea043] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
