import CoinListTable from "../features/coin-list/CoinListTable"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d131f] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <CoinListTable/>
      </div>
    </div>
  )
}

export default MainLayout