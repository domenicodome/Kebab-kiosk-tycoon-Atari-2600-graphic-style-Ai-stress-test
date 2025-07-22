
import React from 'react';

interface HeaderProps {
    money: number;
    reputation: number;
    kbc: number;
    day: number;
}

export const Header: React.FC<HeaderProps> = ({ money, reputation, kbc, day }) => {
    return (
        <header className="w-full pixelated-border p-2 text-lg">
            <div className="flex justify-between items-center text-cyan-300">
                <span className="text-shadow-cyan">MONEY: ${money.toFixed(2)}</span>
                <span className="text-yellow-300 text-shadow-magenta">REP: {reputation}/100</span>
                <span className="text-fuchsia-400">KBC: {kbc.toFixed(4)}</span>
                <span className="text-shadow-cyan">DAY: {day}</span>
            </div>
        </header>
    );
};