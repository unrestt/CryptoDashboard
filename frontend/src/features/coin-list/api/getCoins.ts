import { api } from "../../../api/axiosInstance";
import type { Coin } from "../types/Coin";

export const getCoins = async (): Promise<Coin[]> => {
    const { data } = await api.get<Coin[]>('/coins/markets', {
        params: {
            vs_currency: 'usd', // lub 'pln'
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: true,
        },
    });
    return data;
}