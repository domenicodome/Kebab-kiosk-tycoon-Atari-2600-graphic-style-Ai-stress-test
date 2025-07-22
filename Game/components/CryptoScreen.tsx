
import React, { useState, useEffect, useCallback } from 'react';
import type { GameState, GameAction } from '../types';
import { PixelatedButton } from './PixelatedButton';

interface CryptoScreenProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

const sequences = [
    ['W', 'A', 'S', 'D'],
    ['U', 'U', 'D', 'D', 'L', 'R'],
    ['A', 'B', 'A', 'C', 'A', 'B', 'B'],
];

export const CryptoScreen: React.FC<CryptoScreenProps> = ({ gameState, dispatch }) => {
    const { kbc, miningPower, money } = gameState;
    const [sequence, setSequence] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timer, setTimer] = useState(100);
    const [message, setMessage] = useState("Press keys to match sequence");

    const resetGame = useCallback(() => {
        const newSeq = sequences[Math.floor(Math.random() * sequences.length)];
        setSequence(newSeq);
        setCurrentIndex(0);
        setTimer(100);
        setMessage("NEW SEQUENCE...");
        setTimeout(() => setMessage(""), 1000);
    }, []);

    useEffect(() => {
        resetGame();
    }, [resetGame]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 0) {
                    setMessage("TIMEOUT! PENALTY!");
                    resetGame();
                    return 100;
                }
                return prev - 2;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [resetGame]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if(sequence.length === 0) return;

        const key = event.key.toUpperCase();
        if (key === sequence[currentIndex]) {
            if (currentIndex === sequence.length - 1) {
                const reward = 0.01 * (timer / 20);
                dispatch({ type: 'MINE_KBC', amount: reward });
                setMessage(`SUCCESS! +${(reward * miningPower).toFixed(4)} KBC`);
                resetGame();
            } else {
                setCurrentIndex(prev => prev + 1);
            }
        } else {
            setMessage("WRONG KEY! PENALTY!");
            setTimer(t => Math.max(0, t - 25));
            setCurrentIndex(0);
        }
    }, [currentIndex, sequence, dispatch, resetGame, timer, miningPower]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const upgradeCost = 50 * miningPower;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl text-fuchsia-400 text-shadow-magenta mb-2">KebabCoin (KBC) MINER</h1>
            <p className="text-xl text-white mb-4">Current KBC: {kbc.toFixed(4)}</p>

            <div className="p-4 border-2 border-fuchsia-500 bg-black/30 w-full max-w-lg">
                <p className="text-xl text-yellow-300 mb-2">SEQUENCE:</p>
                <div className="text-4xl font-bold tracking-[0.5em] mb-4 bg-gray-900 p-2 border border-fuchsia-700">
                    {sequence.map((char, index) => (
                        <span key={index} className={index < currentIndex ? 'text-green-500' : 'text-fuchsia-400'}>{char}</span>
                    ))}
                </div>
                
                <p className="text-xl text-yellow-300 mb-2">TIMER:</p>
                <div className="w-full bg-gray-800 border-2 border-fuchsia-500 h-8">
                    <div className="bg-fuchsia-400 h-full" style={{ width: `${timer}%`, transition: 'width 0.1s linear' }}></div>
                </div>

                <p className="text-lg text-green-400 h-8 mt-4">{message}</p>
            </div>
            
            <div className="mt-6">
                <p className="text-xl text-white">MINING RIG POWER: LVL {miningPower}</p>
                <PixelatedButton 
                    onClick={() => dispatch({type: 'UPGRADE_MINING_RIG'})} 
                    disabled={money < upgradeCost}
                    className="mt-2"
                >
                    UPGRADE FOR ${upgradeCost}
                </PixelatedButton>
            </div>
        </div>
    );
};