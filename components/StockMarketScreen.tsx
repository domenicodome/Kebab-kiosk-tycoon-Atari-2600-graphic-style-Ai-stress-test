
import React, { useState } from 'react';
import type { GameState, GameAction } from '../types';
import { PixelatedButton } from './PixelatedButton';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';


interface StockMarketScreenProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export const StockMarketScreen: React.FC<StockMarketScreenProps> = ({ gameState, dispatch }) => {
    const { market, money } = gameState;
    const [amount, setAmount] = useState<Record<string, number>>({'FalafelCorp': 1, 'WrapzOne': 1, 'HotGrill': 1});

    const handleAmountChange = (stockId: string, value: number) => {
        setAmount(prev => ({...prev, [stockId]: Math.max(1, value)}));
    };

    const handleBuy = (stockId: string) => {
        dispatch({type: 'BUY_MARKET_STOCK', stockId, amount: amount[stockId]});
    };
    
    const handleSell = (stockId: string) => {
        dispatch({type: 'SELL_MARKET_STOCK', stockId, amount: amount[stockId]});
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h1 className="text-3xl text-yellow-300 text-shadow-magenta mb-4">PIXEL-STOCK EXCHANGE</h1>
            <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {Object.entries(market.stocks).map(([id, stock]) => {
                    const chartData = stock.history.map((price, index) => ({t: index, price}));
                    const ownedShares = market.shares[id] || 0;
                    
                    return (
                        <div key={id} className="p-4 border-2 border-cyan-500 bg-black/30 flex flex-col space-y-2">
                            <h2 className="text-xl text-yellow-400">{stock.name}</h2>
                            <p className="text-2xl text-white">Price: ${stock.price.toFixed(2)}</p>
                            <p className="text-lg text-cyan-300">Owned: {ownedShares}</p>

                            <div className="h-32 w-full my-2">
                                <ResponsiveContainer>
                                    <LineChart data={chartData}>
                                        <Line type="step" dataKey="price" stroke="#00FFFF" strokeWidth={2} dot={false} />
                                        <XAxis dataKey="t" hide={true} />
                                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide={true} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid #00FFFF' }}
                                            labelStyle={{ color: '#FFFF00' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-white">AMT:</span>
                                <input 
                                    type="number" 
                                    value={amount[id]}
                                    onChange={(e) => handleAmountChange(id, parseInt(e.target.value))}
                                    className="w-full bg-gray-800 text-white p-1 border-2 border-cyan-500"
                                    min="1"
                                />
                            </div>
                            <div className="flex space-x-2">
                                <PixelatedButton onClick={() => handleBuy(id)} disabled={money < stock.price * amount[id]} className="w-1/2">
                                    BUY
                                </PixelatedButton>
                                <PixelatedButton onClick={() => handleSell(id)} disabled={ownedShares < amount[id]} className="w-1/2 bg-red-600/50 border-red-500">
                                    SELL
                                </PixelatedButton>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};