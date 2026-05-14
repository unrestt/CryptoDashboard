import { useEffect } from "react";
import { useCoins } from "./hooks/useCoins"
import toast from "react-hot-toast";
import CoinItem from "./components/CoinItem";

const CoinListTable = () => {
  const { data: coins, isLoading, isError, error } = useCoins();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Błąd pobierania kryptowalut")
    }
  }, [isError, error])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-[#141d2b] rounded-xl shadow-lg border border-slate-800">
        <p className="text-lg font-medium text-cyan-400 animate-pulse">Ładowanie aktywów...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#141d2b] rounded-xl shadow-2xl border border-slate-800 overflow-hidden font-sans">
      <div className="p-5 md:p-6 border-b border-slate-800/80 bg-[#161f2e]">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">Live Asset Table</h2>
        <p className="text-xs md:text-sm text-slate-400 font-semibold tracking-widest uppercase">TOP 100 ASSETS</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-[#1a2332] text-xs sm:text-sm text-slate-400 font-semibold border-b border-slate-800/80">
              <th className="py-4 px-6 font-medium"># <span className="text-slate-500 text-[10px] ml-1">▲</span></th>
              <th className="py-4 px-6 font-medium">Asset</th>
              <th className="py-4 px-6 font-medium">Price (USD) <span className="text-slate-500 text-[10px] ml-1">◆</span></th>
              <th className="py-4 px-6 font-medium">24h % <span className="text-slate-500 text-[10px] ml-1">◆</span></th>
              <th className="py-4 px-6 font-medium">Market Cap <span className="text-slate-500 text-[10px] ml-1">◆</span></th>
              <th className="py-4 px-6 font-medium">Sparkline</th>
            </tr>
          </thead>
          <tbody>
            {coins && coins.map((coin, index) => (
              <CoinItem key={coin.id} coin={coin} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CoinListTable