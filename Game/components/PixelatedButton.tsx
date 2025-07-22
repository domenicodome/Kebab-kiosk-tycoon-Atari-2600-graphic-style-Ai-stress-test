
import React from 'react';

interface PixelatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const PixelatedButton: React.FC<PixelatedButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            className={`px-4 py-2 bg-gray-800 text-cyan-300 border-2 border-cyan-300 hover:bg-cyan-300 hover:text-black active:bg-yellow-400 disabled:bg-gray-900 disabled:text-gray-600 disabled:border-gray-700 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};