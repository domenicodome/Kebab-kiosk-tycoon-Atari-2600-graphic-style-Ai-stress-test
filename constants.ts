
import type { GameState, Upgrade } from './types';
import { Ingredient, UpgradeId } from './types';


export const UPGRADES: Record<UpgradeId, Upgrade> = {
    [UpgradeId.AUTO_SLICER]: { id: UpgradeId.AUTO_SLICER, name: 'Auto Slicer', description: 'Speeds up meat cutting.', cost: 250, owned: false },
    [UpgradeId.INDUSTRIAL_TOASTER]: { id: UpgradeId.INDUSTRIAL_TOASTER, name: 'Industrial Toaster', description: 'Toasts multiple breads.', cost: 400, owned: false },
    [UpgradeId.SAUCE_MIXER]: { id: UpgradeId.SAUCE_MIXER, name: 'Sauce Mixer', description: 'Automates sauce prep.', cost: 300, owned: false },
    [UpgradeId.STORAGE_LVL1]: { id: UpgradeId.STORAGE_LVL1, name: 'Cold Storage', description: 'Increases stock capacity.', cost: 500, owned: false },
    [UpgradeId.DECOR_LVL1]: { id: UpgradeId.DECOR_LVL1, name: 'Simple Sign', description: '+5% earnings.', cost: 150, owned: false },
    [UpgradeId.DECOR_LVL2]: { id: UpgradeId.DECOR_LVL2, name: 'Pixelated Stools', description: '+10% earnings.', cost: 350, owned: false },
    [UpgradeId.DECOR_LVL3]: { id: UpgradeId.DECOR_LVL3, name: 'Luminous Sign', description: '+15% earnings, +1 rep.', cost: 800, owned: false },
    [UpgradeId.CRYPTO_GRILL]: { id: UpgradeId.CRYPTO_GRILL, name: 'CryptoGrill X', description: 'Cooks faster, +15% satisfaction.', cost: 0, kbcCost: 50, owned: false },
    [UpgradeId.NANO_WRAP]: { id: UpgradeId.NANO_WRAP, name: 'NanoWrap3000', description: 'Auto-wraps, +10% service speed.', cost: 0, kbcCost: 30, owned: false },
};


export const INITIAL_GAME_STATE: GameState = {
    money: 200,
    reputation: 50,
    kbc: 0,
    day: 1,
    kebabPrice: 8,
    stocks: {
        [Ingredient.MEAT]: { level: 50, capacity: 100, cost: 2 },
        [Ingredient.BREAD]: { level: 50, capacity: 100, cost: 1 },
        [Ingredient.VEGGIES]: { level: 50, capacity: 100, cost: 0.5 },
        [Ingredient.SAUCE]: { level: 50, capacity: 100, cost: 0.5 },
    },
    customers: [{ id: Date.now(), patience: 100 }],
    upgrades: UPGRADES,
    decorLevel: 1,
    market: {
        shares: {
            'FalafelCorp': 0,
            'WrapzOne': 0,
            'HotGrill': 0,
        },
        stocks: {
            'FalafelCorp': { name: 'FalafelCorp', price: 25, history: [25], volatility: 0.1, trend: 1 },
            'WrapzOne': { name: 'WrapzOne', price: 50, history: [50], volatility: 0.05, trend: 1 },
            'HotGrill': { name: 'HotGrill Int.', price: 100, history: [100], volatility: 0.3, trend: -1 },
        }
    },
    event: null,
    chefDiary: ["Day 1: Opened my very own kebab stand! Let's make some money."],
    miningPower: 1,
};