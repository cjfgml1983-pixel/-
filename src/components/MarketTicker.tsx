import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketIndex } from '../types';
import { MARKET_INDICES } from '../constants';

export default function MarketTicker() {
  return (
    <section className="bg-bg-surface border-b border-border-subtle overflow-x-auto hide-scrollbar py-2.5 px-4 shadow-inner">
      <div className="flex gap-8 min-w-max items-center">
        {MARKET_INDICES.map((index, i) => (
          <div key={index.name} className={`flex items-center gap-2 ${i !== 0 ? 'border-l border-border-subtle pl-8' : ''}`}>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-none">
              {index.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-text-primary">
                {index.value.toLocaleString()}
              </span>
              <div className={`flex items-center text-[10px] font-bold ${index.isUp ? 'text-brand-up' : 'text-brand-down'}`}>
                <span>{index.isUp ? '+' : ''}{index.changePercent}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
