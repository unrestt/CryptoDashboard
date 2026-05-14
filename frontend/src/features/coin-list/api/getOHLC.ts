import { api } from "../../../api/axiosInstance";

export type OHLCData = [number, number, number, number, number][];

export const getOHLC = async (coinId: string, days: number = 7): Promise<OHLCData> => {
    const { data } = await api.get<OHLCData>(`/coins/${coinId}/ohlc`, {
        params: {
            vs_currency: 'usd',
            days: days,
        },
    });
    return data;
};
