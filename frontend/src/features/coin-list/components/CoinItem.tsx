import type { Coin } from "../types/Coin"
import { LineChart, Line, YAxis } from "recharts";
import { useCoinItem } from "../hooks/useCoinItem";

type Props = {
    coin: Coin;
    index: number;
}

const CoinItem = ({coin, index}: Props) => {
  const { 
    isPositive, 
    formattedCurrency, 
    formattedPrice, 
    formattedPercentage, 
    sparklineData 
  } = useCoinItem(coin);

  const renderSparkline = () => {
    if (!sparklineData) {
      return <span className="text-slate-600 text-xs">No Data</span>;
    }

    const { chartData, min, max } = sparklineData;
    const color = isPositive ? "#34d399" : "#f87171";

    return (
      <div className={`w-[120px] h-[40px] flex items-center ${isPositive ? 'drop-shadow-[0_2px_4px_rgba(52,211,153,0.3)]' : 'drop-shadow-[0_2px_4px_rgba(248,113,113,0.3)]'}`}>
        <LineChart width={120} height={40} data={chartData}>
          <YAxis domain={[min, max]} hide />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </div>
    );
  };

  return (
    <tr className="border-b border-slate-800/60 hover:bg-[#1a2332]/50 transition-colors group">
      <td className="py-4 px-6 text-slate-300 font-medium relative">
        {index === 1 && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-md"></div>
        )}
        {index}.
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-semibold text-white">{coin.name}</span>
            <span className="text-slate-400 text-sm font-medium">({coin.symbol.toUpperCase()})</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-slate-200 font-medium">
        {formattedPrice}
      </td>
      <td className={`py-4 px-6 font-medium ${
        coin.price_change_percentage_24h == null ? 'text-slate-500' : isPositive ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {formattedPercentage}
      </td>
      <td className="py-4 px-6 text-slate-300 font-medium">
        {formattedCurrency}
      </td>
      <td className="py-4 px-6">
        {renderSparkline()}
      </td>
    </tr>
  )
}

export default CoinItem