import type { Coin } from "../types/Coin";
import { LineChart, Line, YAxis } from "recharts";
import { useCoinItem } from "../hooks/useCoinItem";

type Props = {
  coin: Coin;
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
};

const CoinItem = ({ coin, index, isSelected, onClick }: Props) => {
  const {
    isPositive,
    formattedCurrency,
    formattedPrice,
    formattedPercentage,
    sparklineData,
  } = useCoinItem(coin);

  const renderSparkline = () => {
    if (!sparklineData) {
      return <span className="text-slate-600 text-xs">No Data</span>;
    }

    const { chartData, min, max } = sparklineData;
    const color = isPositive ? "#34d399" : "#f87171";

    return (
      <div
        className={`w-[50px] h-[40px] ${isPositive ? "drop-shadow-[0_2px_4px_rgba(52,211,153,0.3)]" : "drop-shadow-[0_2px_4px_rgba(248,113,113,0.3)]"}`}
      >
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
    <div
      onClick={onClick}
      className={`
        grid grid-cols-[60px_250px_120px_100px_150px_1fr] items-center
        border-b border-slate-800/60 hover:bg-[#1a2332]/50 transition-colors group cursor-pointer
        ${isSelected ? "bg-[#1a2332] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" : ""}
      `}
    >
      <div className="py-4 px-4 sm:px-6 text-slate-300 font-medium relative w-full h-full flex items-center">
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400 rounded-r-md"></div>
        )}
        {index}.
      </div>
      <div className="py-4 px-4 sm:px-6 w-full flex items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 overflow-hidden">
          <span className="font-semibold text-white truncate max-w-[100px] sm:max-w-[120px]">
            {coin.name}
          </span>
          <span className="text-slate-400 text-sm font-medium flex-shrink-0">
            ({coin.symbol.toUpperCase()})
          </span>
        </div>
      </div>
      <div className="py-4 px-4 sm:px-6 text-slate-200 font-medium text-right w-full">
        {formattedPrice}
      </div>
      <div
        className={`py-4 px-4 sm:px-6 font-medium text-right w-full ${
          coin.price_change_percentage_24h == null
            ? "text-slate-500"
            : isPositive
              ? "text-emerald-400"
              : "text-red-400"
        }`}
      >
        {formattedPercentage}
      </div>
      <div className="py-4 px-4 sm:px-6 text-slate-300 font-medium text-right w-full">
        {formattedCurrency}
      </div>
      <div className="py-4 px-4 sm:px-6 w-full">{renderSparkline()}</div>
    </div>
  );
};

export default CoinItem;
