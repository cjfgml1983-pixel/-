import { Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-bg-header border-b border-border-subtle h-14 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-up flex items-center justify-center font-black text-white text-sm">
          SB
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-text-primary leading-none">
            StockBoard
          </h1>
          <span className="text-[9px] text-text-secondary opacity-60 font-mono">
            Market Data: 2026.04.24
          </span>
        </div>
      </div>
      <button className="p-2 hover:bg-bg-surface rounded-full transition-colors text-text-secondary hover:text-text-primary">
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
}
