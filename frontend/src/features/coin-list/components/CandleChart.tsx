import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import type { Time } from "lightweight-charts";
import type { OHLCData } from "../api/getOHLC";

type Props = {
  data?: OHLCData;
  isLoading?: boolean;
};

const CandleChart = ({ data, isLoading }: Props) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    //todo
    // const handleResize = () => {
    //   if (chartRef.current && chartContainerRef.current) {
    //     chartRef.current.applyOptions({
    //       width: chartContainerRef.current.clientWidth,
    //       height: chartContainerRef.current.clientHeight,
    //     });
    //   }
    // };


    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#141d2b" },
        textColor: "#cbd5e1",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight || 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#34d399",
      downColor: "#f87171",
      borderVisible: false,
      wickUpColor: "#34d399",
      wickDownColor: "#f87171",
    });

    seriesRef.current = candlestickSeries;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== chartContainerRef.current) {
        return;
      }
      const newRect = entries[0].contentRect;
      chart.applyOptions({ height: newRect.height, width: newRect.width });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || !data) return;


    const formattedData = data.map((item) => ({
      time: (item[0] / 1000) as Time,
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
    }));


    formattedData.sort((a, b) => (a.time as number) - (b.time as number));

    seriesRef.current.setData(formattedData);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <div className="w-full h-full relative" ref={chartContainerRef}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#141d2b]/80 backdrop-blur-sm">
          <p className="text-cyan-400 font-medium animate-pulse">
            Ładowanie wykresu...
          </p>
        </div>
      )}
    </div>
  );
};

export default CandleChart;