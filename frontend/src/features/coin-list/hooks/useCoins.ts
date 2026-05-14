import { useQuery } from "@tanstack/react-query"
import type { Coin } from "../types/Coin"
import { getCoins } from "../api/getCoins"


export const useCoins = ()=>{
    return useQuery<Coin[]>({
        queryKey: ['coins'],
        queryFn: getCoins,
    })
}