import { useState } from "react";
import CoinListTable from "../features/coin-list/CoinListTable";
import CandleChart from "../features/coin-list/components/CandleChart";
import { useOHLC } from "../features/coin-list/hooks/useOHLC";

const MainLayout = () => {
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  
  // Pobieranie danych historycznych wykresu dla wybranego coina
  const { data: ohlcData, isLoading: isChartLoading } = useOHLC(selectedCoinId);

  return (
    <div className="min-h-screen bg-[#0d131f] text-white p-2 md:p-4 lg:p-6 font-sans">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7">
            <CoinListTable
              selectedCoinId={selectedCoinId}
              onSelectCoin={setSelectedCoinId}
            />
          </div>

          <div className="xl:col-span-5 hidden xl:block">
            <div className="bg-[#141d2b] rounded-xl shadow-2xl border border-slate-800 h-[800px] flex items-center justify-center overflow-hidden p-4">
              {selectedCoinId ? (
                <div className="w-full h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-4 pl-2 border-l-4 border-cyan-400 capitalize">
                    {selectedCoinId} - 7 Days (4H)
                  </h3>
                  <div className="flex-1 w-full relative rounded-lg overflow-hidden border border-slate-800/80">
                    <CandleChart data={ohlcData} isLoading={isChartLoading} />
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 font-medium">
                  Wybierz kryptowalutę z listy, aby zobaczyć wykres
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;