
import { useReducer } from 'react';
import type { GameState, GameAction, UpgradeId } from '../types';
import { Ingredient } from '../types';
import { INITIAL_GAME_STATE, UPGRADES } from '../constants';

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'TICK': {
            let newState = { ...state };
            
            // Customer logic
            const newCustomers = state.customers.map(c => ({...c, patience: c.patience - 5})).filter(c => c.patience > 0);
            if (Math.random() < 0.2 && newCustomers.length < 5) { // Chance to spawn new customer
                newCustomers.push({ id: Date.now(), patience: 100 });
            }
            newState.customers = newCustomers;

            // Market logic
            const newMarketStocks = { ...state.market.stocks };
            for (const key in newMarketStocks) {
                const stock = newMarketStocks[key];
                const change = (Math.random() - 0.5 + (stock.trend * 0.2)) * stock.volatility * stock.price;
                let newPrice = Math.max(1, stock.price + change);
                stock.price = parseFloat(newPrice.toFixed(2));
                stock.history = [...stock.history.slice(-20), stock.price];
                if (Math.random() < 0.1) stock.trend *= -1;
            }
            newState.market = { ...state.market, stocks: newMarketStocks };

            // Random Event
            if (Math.random() < 0.02 && !state.event) { // 2% chance per tick for an event
                newState.event = { title: "INSPECTION!", description: "A health inspector just arrived. Luckily, the place is clean enough... this time." };
                newState.reputation = Math.max(0, state.reputation - 5);
            }

            return newState;
        }
        
        case 'PREPARE_KEBAB': {
            if(state.customers.length === 0) return state;

            const meatNeeded = 5;
            const breadNeeded = 1;
            const veggiesNeeded = 5;
            const sauceNeeded = 5;

            if (
                state.stocks[Ingredient.MEAT].level >= meatNeeded &&
                state.stocks[Ingredient.BREAD].level >= breadNeeded &&
                state.stocks[Ingredient.VEGGIES].level >= veggiesNeeded &&
                state.stocks[Ingredient.SAUCE].level >= sauceNeeded
            ) {
                const newStocks = { ...state.stocks };
                newStocks[Ingredient.MEAT].level -= meatNeeded;
                newStocks[Ingredient.BREAD].level -= breadNeeded;
                newStocks[Ingredient.VEGGIES].level -= veggiesNeeded;
                newStocks[Ingredient.SAUCE].level -= sauceNeeded;
                
                const servedCustomer = state.customers[0];
                const reputationGain = Math.ceil(servedCustomer.patience / 20);

                return {
                    ...state,
                    money: state.money + state.kebabPrice,
                    reputation: Math.min(100, state.reputation + reputationGain),
                    customers: state.customers.slice(1),
                    stocks: newStocks,
                };
            }
            return state; // Not enough ingredients
        }

        case 'SET_KEBAB_PRICE':
            return { ...state, kebabPrice: Math.max(1, action.price) };

        case 'BUY_STOCK': {
            const stock = state.stocks[action.ingredient];
            const cost = stock.cost * action.amount;
            if (state.money >= cost && stock.level + action.amount <= stock.capacity) {
                const newStocks = { ...state.stocks };
                newStocks[action.ingredient].level += action.amount;
                return { ...state, money: state.money - cost, stocks: newStocks };
            }
            return state;
        }

        case 'BUY_UPGRADE': {
            const upgrade = state.upgrades[action.upgradeId];
            if (!upgrade.owned && state.money >= upgrade.cost && state.kbc >= (upgrade.kbcCost || 0)) {
                const newUpgrades = { ...state.upgrades, [action.upgradeId]: { ...upgrade, owned: true } };
                return { 
                    ...state, 
                    money: state.money - upgrade.cost, 
                    kbc: state.kbc - (upgrade.kbcCost || 0),
                    upgrades: newUpgrades 
                };
            }
            return state;
        }

        case 'BUY_MARKET_STOCK': {
            const stockInfo = state.market.stocks[action.stockId];
            const cost = stockInfo.price * action.amount;
            if (state.money >= cost) {
                const newShares = { ...state.market.shares };
                newShares[action.stockId] += action.amount;
                return {
                    ...state,
                    money: state.money - cost,
                    market: { ...state.market, shares: newShares },
                };
            }
            return state;
        }

        case 'SELL_MARKET_STOCK': {
            const stockInfo = state.market.stocks[action.stockId];
            const currentShares = state.market.shares[action.stockId];
            const amountToSell = Math.min(action.amount, currentShares);
            if (amountToSell > 0) {
                const earnings = stockInfo.price * amountToSell;
                const newShares = { ...state.market.shares };
                newShares[action.stockId] -= amountToSell;
                return {
                    ...state,
                    money: state.money + earnings,
                    market: { ...state.market, shares: newShares },
                };
            }
            return state;
        }

        case 'MINE_KBC':
            return { ...state, kbc: state.kbc + action.amount * state.miningPower };
            
        case 'UPGRADE_MINING_RIG':
            const upgradeCost = 50 * state.miningPower;
            if(state.money >= upgradeCost) {
                return {...state, money: state.money - upgradeCost, miningPower: state.miningPower + 1};
            }
            return state;

        case 'DISMISS_EVENT':
            return { ...state, event: null };

        default:
            return state;
    }
};

export const useGameState = () => {
    const [gameState, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
    return { gameState, dispatch };
};