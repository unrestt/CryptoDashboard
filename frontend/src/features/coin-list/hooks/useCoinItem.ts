import { useMemo } from 'react';
import type { Coin } from '../types/Coin';

export const useCoinItem = (coin: Coin) => {
  const isPositive = coin.price_change_percentage_24h != null ? coin.price_change_percentage_24h >= 0 : false;

  const formattedCurrency = useMemo(() => {
    const value = coin.market_cap;
    if (value == null) return 'N/A';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [coin.market_cap]);

  const formattedPrice = useMemo(() => {
    const price = coin.current_price;
    if (price == null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  }, [coin.current_price]);

  const formattedPercentage = useMemo(() => {
    if (coin.price_change_percentage_24h == null) return 'N/A';
    return `${isPositive ? '+' : ''}${coin.price_change_percentage_24h.toFixed(1)}%`;
  }, [coin.price_change_percentage_24h, isPositive]);

  const sparklineData = useMemo(() => {
    if (!coin.sparkline_in_7d || !coin.sparkline_in_7d.price || coin.sparkline_in_7d.price.length === 0) {
      return null;
    }
    const chartData = coin.sparkline_in_7d.price.map((price) => ({ price }));
    const min = Math.min(...coin.sparkline_in_7d.price);
    const max = Math.max(...coin.sparkline_in_7d.price);
    
    return { chartData, min, max };
  }, [coin.sparkline_in_7d]);

  return {
    isPositive,
    formattedCurrency,
    formattedPrice,
    formattedPercentage,
    sparklineData
  };
};
