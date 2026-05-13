export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  // Sparkline to tablica liczb (ceny z ostatnich 7 dni)
  // Pojawi się tylko jeśli dodasz ?sparkline=true do zapytania
  sparkline_in_7d?: {
    price: number[];
  };
}