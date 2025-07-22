
import React from 'react';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-black border-4 border-yellow-400 p-6 max-w-md w-full text-center">
                <h2 className="text-3xl text-yellow-300 text-shadow-magenta mb-4">{title}</h2>
                <div className="text-white my-4">
                    {children}
                </div>
                <button 
                    onClick={onClose} 
                    className="mt-4 px-6 py-2 bg-yellow-400 text-black border-2 border-black text-xl hover:bg-yellow-300"
                >
                    OK
                </button>
            </div>
        </div>
    );
};