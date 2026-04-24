export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  isUp: boolean;
}

export interface FinancialData {
  year: string;
  revenue: number;
  operatingProfit: number;
  roe: number;
  per: number;
}

export interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  isUp: boolean;
  category: 'domestic' | 'overseas' | 'etf';
  description: string;
  financials: FinancialData[];
  chartData: { time: string; price: number }[];
}
