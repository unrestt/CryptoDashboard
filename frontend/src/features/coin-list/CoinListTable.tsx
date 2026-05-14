import { useEffect, useState, useMemo } from "react";
import { useCoins } from "./hooks/useCoins";
import toast from "react-hot-toast";
import CoinItem from "./components/CoinItem";
import SearchBar from "./components/SearchBar";

type Props = {
  selectedCoinId?: string | null;
  onSelectCoin?: (id: string) => void;
};

const CoinListTable = ({ selectedCoinId, onSelectCoin }: Props) => {
  const { data: coins, isLoading, isError, error } = useCoins();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Błąd pobierania kryptowalut");
    }
  }, [isError, error]);

  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    if (!searchQuery.trim()) return coins;

    const lowerQuery = searchQuery.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lowerQuery) ||
        coin.symbol.toLowerCase().includes(lowerQuery),
    );
  }, [coins, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-[#141d2b] rounded-xl shadow-lg border border-slate-800">
        <p className="text-lg font-medium text-cyan-400 animate-pulse">
          Ładowanie aktywów...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#141d2b] rounded-xl shadow-2xl border border-slate-800 overflow-hidden font-sans">
      <div className="p-5 md:p-6 border-b border-slate-800/80 bg-[#161f2e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
            Live Asset Table
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-semibold tracking-widest uppercase">
            TOP 100 ASSETS
          </p>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="overflow-auto max-h-[600px] xl:max-h-[800px] 2xl:max-h-[calc(100vh-140px)]">
        <div className="min-w-[700px] flex flex-col">
          <div className="sticky top-0 z-10 grid grid-cols-[60px_250px_120px_100px_150px_1fr] bg-[#161f2e] text-xs sm:text-sm text-slate-400 font-semibold border-b border-slate-800/80 shadow-md">
            <div className="py-4 px-4 sm:px-6 font-medium">
              # <span className="text-slate-500 text-[10px] ml-1">▲</span>
            </div>
            <div className="py-4 px-4 sm:px-6 font-medium">Asset</div>
            <div className="py-4 px-4 sm:px-6 font-medium text-right">
              Price (USD){" "}
              <span className="text-slate-500 text-[10px] ml-1">◆</span>
            </div>
            <div className="py-4 px-4 sm:px-6 font-medium text-right">
              24h % <span className="text-slate-500 text-[10px] ml-1">◆</span>
            </div>
            <div className="py-4 px-4 sm:px-6 font-medium text-right">
              Market Cap{" "}
              <span className="text-slate-500 text-[10px] ml-1">◆</span>
            </div>
            <div className="py-4 px-4 sm:px-6 font-medium">Sparkline</div>
          </div>
          <div className="flex flex-col">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin, index) => (
                <CoinItem
                  key={coin.id}
                  coin={coin}
                  index={index + 1}
                  isSelected={selectedCoinId === coin.id}
                  onClick={() => onSelectCoin?.(coin.id)}
                />
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 border-b border-slate-800/60">
                <p className="text-lg font-medium text-slate-300 mb-1">
                  Nie znaleziono kryptowaluty
                </p>
                <p className="text-sm">
                  Spróbuj wpisać inną nazwę lub symbol.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinListTable;
