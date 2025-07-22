
import React from 'react';

interface ProgressBarProps {
    value: number;
    max: number;
    color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color = 'bg-green-500' }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className="w-full h-6 bg-gray-800 border-2 border-gray-500 p-0.5">
            <div 
                className={`${color} h-full`} 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};