import { TrendingUp, TrendingDown, Cpu, Smartphone, Monitor, Briefcase } from 'lucide-react';
import { Stock } from '../types';
import { motion } from 'motion/react';

interface StockListProps {
  stocks: Stock[];
  onStockSelect: (stock: Stock) => void;
}

const getStockIcon = (symbol: string) => {
  if (symbol.includes('005930')) return Cpu;
  if (symbol === 'AAPL') return Smartphone;
  if (symbol === 'NVDA') return Monitor;
  return Briefcase;
};

export default function StockList({ stocks, onStockSelect }: StockListProps) {
  return (
    <section className="mt-2 text-text-primary">
      <h3 className="px-4 text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">
        오늘의 주요 종목
      </h3>
      <div className="space-y-3 px-4">
        {stocks.map((stock, index) => {
          return (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onStockSelect(stock)}
              className={`bg-bg-surface p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 active:scale-[0.98] ${
                index === 0 
                  ? 'border-brand-up/30 shadow-[0_0_10px_rgba(255,77,77,0.1)]' 
                  : 'border-border-subtle hover:border-text-secondary/30'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{stock.name}</span>
                <span className={`text-sm font-mono font-bold ${stock.isUp ? 'text-brand-up' : 'text-brand-down'}`}>
                  {stock.isUp ? '+' : ''}{stock.changePercent}%
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-text-secondary">
                <span className="opacity-60">{stock.symbol}</span>
                <span className="font-mono tracking-tight font-medium">
                  {stock.price.toLocaleString()} <span className="opacity-40">{stock.currency}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
