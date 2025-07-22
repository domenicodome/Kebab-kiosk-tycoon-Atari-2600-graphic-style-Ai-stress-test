
export enum GameScreen {
    GAME = 'GAME',
    UPGRADES = 'UPGRADES',
    STOCK_MARKET = 'STOCK_MARKET',
    CRYPTO = 'CRYPTO',
}

export enum Ingredient {
    MEAT = 'MEAT',
    BREAD = 'BREAD',
    VEGGIES = 'VEGGIES',
    SAUCE = 'SAUCE',
}

export interface Stock {
    level: number;
    capacity: number;
    cost: number;
}

export interface Customer {
    id: number;
    patience: number; // decreases from 100 to 0
}

export enum UpgradeId {
    AUTO_SLICER = 'AUTO_SLICER',
    INDUSTRIAL_TOASTER = 'INDUSTRIAL_TOASTER',
    SAUCE_MIXER = 'SAUCE_MIXER',
    STORAGE_LVL1 = 'STORAGE_LVL1',
    DECOR_LVL1 = 'DECOR_LVL1',
    DECOR_LVL2 = 'DECOR_LVL2',
    DECOR_LVL3 = 'DECOR_LVL3',
    CRYPTO_GRILL = 'CRYPTO_GRILL',
    NANO_WRAP = 'NANO_WRAP',
}

export interface Upgrade {
    id: UpgradeId;
    name: string;
    description: string;
    cost: number;
    kbcCost?: number;
    owned: boolean;
}

export interface StockInfo {
    name: string;
    price: number;
    history: number[];
    volatility: number;
    trend: number; // -1 for down, 1 for up
}

export interface GameEvent {
    title: string;
    description: string;
}

export interface GameState {
    money: number;
    reputation: number;
    kbc: number;
    day: number;
    kebabPrice: number;
    stocks: Record<Ingredient, Stock>;
    customers: Customer[];
    upgrades: Record<UpgradeId, Upgrade>;
    decorLevel: number;
    market: {
        shares: Record<string, number>;
        stocks: Record<string, StockInfo>;
    };
    event: GameEvent | null;
    chefDiary: string[];
    miningPower: number;
}

// Reducer Actions
export type GameAction =
    | { type: 'TICK' }
    | { type: 'SERVE_CUSTOMER' }
    | { type: 'PREPARE_KEBAB' }
    | { type: 'SET_KEBAB_PRICE'; price: number }
    | { type: 'BUY_STOCK'; ingredient: Ingredient; amount: number }
    | { type: 'BUY_UPGRADE'; upgradeId: UpgradeId }
    | { type: 'BUY_MARKET_STOCK'; stockId: string; amount: number }
    | { type: 'SELL_MARKET_STOCK'; stockId: string; amount: number }
    | { type: 'MINE_KBC'; amount: number }
    | { type: 'UPGRADE_MINING_RIG' }
    | { type: 'DISMISS_EVENT' };