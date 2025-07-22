
import React from 'react';
import type { GameState, GameAction, UpgradeId } from '../types';
import { PixelatedButton } from './PixelatedButton';

interface UpgradeScreenProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export const UpgradeScreen: React.FC<UpgradeScreenProps> = ({ gameState, dispatch }) => {
    const { upgrades, money, kbc } = gameState;

    const handleBuy = (upgradeId: UpgradeId) => {
        dispatch({ type: 'BUY_UPGRADE', upgradeId });
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h1 className="text-3xl text-yellow-300 text-shadow-magenta mb-4">UPGRADE HARDWARE</h1>
            <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(upgrades).map(upgrade => {
                    const isKbc = (upgrade.kbcCost || 0) > 0;
                    const canAfford = money >= upgrade.cost && kbc >= (upgrade.kbcCost || 0);

                    return (
                        <div key={upgrade.id} className={`p-4 border-2 ${upgrade.owned ? 'border-green-500' : 'border-cyan-500'} bg-black/30 flex flex-col`}>
                            <h2 className="text-xl text-yellow-400">{upgrade.name}</h2>
                            <p className="text-white flex-grow my-2">{upgrade.description}</p>
                            <div className="mt-auto">
                                {upgrade.owned ? (
                                    <p className="text-2xl text-center text-green-500 font-bold">OWNED</p>
                                ) : (
                                    <PixelatedButton
                                        onClick={() => handleBuy(upgrade.id)}
                                        disabled={!canAfford}
                                        className="w-full"
                                    >
                                        BUY ({isKbc ? `${upgrade.kbcCost} KBC` : `$${upgrade.cost}`})
                                    </PixelatedButton>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};