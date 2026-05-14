import { useState } from "react"
import CoinListTable from "../features/coin-list/CoinListTable"

const MainLayout = () => {
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0d131f] text-white p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          

          <div className="xl:col-span-7">
            <CoinListTable 
              selectedCoinId={selectedCoinId} 
              onSelectCoin={setSelectedCoinId} 
            />
          </div>

          <div className="xl:col-span-5 hidden xl:block">
            <div className="bg-[#141d2b] rounded-xl shadow-2xl border border-slate-800 h-full min-h-[600px] flex items-center justify-center">
              {selectedCoinId ? (
                <p className="text-cyan-400">Wybrano: {selectedCoinId} (Tu będzie wykres)</p>
              ) : (
                <p className="text-slate-500 font-medium">Wybierz kryptowalutę z listy, aby zobaczyć wykres</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MainLayout