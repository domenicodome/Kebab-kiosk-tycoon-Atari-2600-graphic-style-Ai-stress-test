
import React from 'react';
import type { GameState, GameAction } from '../types';
import { Ingredient } from '../types';
import { ProgressBar } from './ProgressBar';
import { PixelatedButton } from './PixelatedButton';

interface GameScreenProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

const ingredientOrder = [Ingredient.MEAT, Ingredient.BREAD, Ingredient.VEGGIES, Ingredient.SAUCE];

export const GameScreen: React.FC<GameScreenProps> = ({ gameState, dispatch }) => {
    const { customers, stocks, kebabPrice, money } = gameState;
    
    const handlePrepareKebab = () => {
        dispatch({ type: 'PREPARE_KEBAB' });
    };

    const handleBuyStock = (ingredient: Ingredient) => {
        dispatch({type: 'BUY_STOCK', ingredient, amount: 10});
    };

    return (
        <div className="w-full h-full flex text-lg">
            {/* Left: Kiosk & Customers */}
            <div className="w-2/3 h-full pr-4 flex flex-col">
                <div className="text-2xl text-yellow-300 text-shadow-magenta mb-4">KEBAB KIOSK</div>
                <div className="flex-grow bg-black/50 p-2 border-2 border-cyan-500/50 flex flex-col justify-between">
                    <div>
                        <div className="text-xl text-white mb-2">CUSTOMER QUEUE:</div>
                        <div className="h-48 flex flex-col space-y-2 overflow-y-auto">
                            {customers.length > 0 ? customers.map(customer => (
                                <div key={customer.id} className="bg-gray-800 p-2 border border-fuchsia-500">
                                    <div className="flex justify-between items-center">
                                        <span>CUSTOMER_ID::{customer.id % 1000}</span>
                                        <span className="text-yellow-400">PATIENCE</span>
                                    </div>
                                    <ProgressBar value={customer.patience} max={100} color="bg-yellow-400" />
                                </div>
                            )) : (
                                <p className="text-gray-500">-- NO CUSTOMERS --</p>
                            )}
                        </div>
                    </div>
                    <PixelatedButton onClick={handlePrepareKebab} disabled={customers.length === 0}>
                        PREPARE KEBAB
                    </PixelatedButton>
                </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="w-1/3 h-full pl-4 border-l-2 border-cyan-500/50 flex flex-col space-y-4">
                <div className="text-2xl text-yellow-300 text-shadow-magenta">MANAGEMENT</div>
                
                {/* Price Control */}
                <div>
                    <label className="block text-xl text-white">KEBAB PRICE: ${kebabPrice}</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <PixelatedButton onClick={() => dispatch({type: 'SET_KEBAB_PRICE', price: kebabPrice - 1})}>-</PixelatedButton>
                        <input 
                            type="range" 
                            min="1" 
                            max="20" 
                            value={kebabPrice} 
                            onChange={(e) => dispatch({type: 'SET_KEBAB_PRICE', price: parseInt(e.target.value)})}
                            className="w-full"
                        />
                        <PixelatedButton onClick={() => dispatch({type: 'SET_KEBAB_PRICE', price: kebabPrice + 1})}>+</PixelatedButton>
                    </div>
                </div>

                {/* Stock Levels */}
                <div>
                    <div className="text-xl text-white mb-2">INGREDIENTS:</div>
                    <div className="space-y-3">
                        {ingredientOrder.map(ing => {
                            const stock = stocks[ing];
                            return (
                                <div key={ing}>
                                    <div className="flex justify-between">
                                        <span>{ing}</span>
                                        <span>${stock.cost}/10u</span>
                                    </div>
                                    <ProgressBar value={stock.level} max={stock.capacity} color="bg-cyan-400" />
                                    <PixelatedButton 
                                        onClick={() => handleBuyStock(ing)}
                                        className="w-full mt-1 text-sm py-1"
                                        disabled={money < stock.cost * 10}
                                    >
                                        BUY 10 UNITS
                                    </PixelatedButton>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};