import { useQuery } from "@tanstack/react-query";
import { getOHLC } from "../api/getOHLC";

export const useOHLC = (coinId: string | null | undefined, days: number = 7) => {
    return useQuery({
        queryKey: ['ohlc', coinId, days],
        queryFn: () => getOHLC(coinId!, days),
        enabled: !!coinId,
        refetchOnWindowFocus: false,
    });
};
