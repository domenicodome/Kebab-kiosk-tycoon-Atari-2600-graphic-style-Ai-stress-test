
import React, { useState, useCallback, useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { UpgradeScreen } from './components/UpgradeScreen';
import { StockMarketScreen } from './components/StockMarketScreen';
import { CryptoScreen } from './components/CryptoScreen';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { useGameState } from './hooks/useGameState';
import { GameScreen as ScreenType } from './types';
import type { GameEvent } from './types';

const App: React.FC = () => {
    const { gameState, dispatch } = useGameState();
    const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.GAME);

    const handleEventAcknowledge = () => {
        dispatch({ type: 'DISMISS_EVENT' });
    };
    
    // Main Game Loop
    useEffect(() => {
        const gameTick = setInterval(() => {
            dispatch({ type: 'TICK' });
        }, 2000); // Game updates every 2 seconds

        return () => clearInterval(gameTick);
    }, [dispatch]);


    const renderScreen = () => {
        switch (currentScreen) {
            case ScreenType.GAME:
                return <GameScreen gameState={gameState} dispatch={dispatch} />;
            case ScreenType.UPGRADES:
                return <UpgradeScreen gameState={gameState} dispatch={dispatch} />;
            case ScreenType.STOCK_MARKET:
                return <StockMarketScreen gameState={gameState} dispatch={dispatch} />;
            case ScreenType.CRYPTO:
                return <CryptoScreen gameState={gameState} dispatch={dispatch} />;
            default:
                return <GameScreen gameState={gameState} dispatch={dispatch} />;
        }
    };

    return (
        <div className="bg-black text-cyan-300 w-screen h-screen flex flex-col p-4 select-none font-mono">
            {gameState.event && (
                <Modal
                    title={gameState.event.title}
                    onClose={handleEventAcknowledge}
                >
                    <p className="text-lg">{gameState.event.description}</p>
                </Modal>
            )}

            <Header 
                money={gameState.money}
                reputation={gameState.reputation}
                kbc={gameState.kbc}
                day={gameState.day}
            />

            <main className="flex-grow mt-4 pixelated-border p-4 overflow-hidden">
                {renderScreen()}
            </main>

            <footer className="mt-4">
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setCurrentScreen(ScreenType.GAME)} className={`px-4 py-2 ${currentScreen === ScreenType.GAME ? 'bg-cyan-300 text-black' : 'bg-gray-800 text-cyan-300'} border-2 border-cyan-300`}>KIOSK</button>
                    <button onClick={() => setCurrentScreen(ScreenType.UPGRADES)} className={`px-4 py-2 ${currentScreen === ScreenType.UPGRADES ? 'bg-cyan-300 text-black' : 'bg-gray-800 text-cyan-300'} border-2 border-cyan-300`}>UPGRADES</button>
                    <button onClick={() => setCurrentScreen(ScreenType.STOCK_MARKET)} className={`px-4 py-2 ${currentScreen === ScreenType.STOCK_MARKET ? 'bg-cyan-300 text-black' : 'bg-gray-800 text-cyan-300'} border-2 border-cyan-300`}>STOCKS</button>
                    <button onClick={() => setCurrentScreen(ScreenType.CRYPTO)} className={`px-4 py-2 ${currentScreen === ScreenType.CRYPTO ? 'bg-cyan-300 text-black' : 'bg-gray-800 text-cyan-300'} border-2 border-cyan-300`}>CRYPTO</button>
                </div>
            </footer>
        </div>
    );
};

export default App;