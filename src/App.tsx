import { useState } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import CategoryGrid from './components/CategoryGrid';
import StockList from './components/StockList';
import StockDetail from './components/StockDetail';
import BottomNav from './components/BottomNav';
import { STOCKS } from './constants';
import { Stock } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'domestic' | 'overseas' | 'etf' | 'all'>('all');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const filteredStocks = activeCategory === 'all' 
    ? STOCKS 
    : STOCKS.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col items-center">
      <div className="w-full max-w-2xl bg-bg-deep min-h-screen border-x border-border-subtle shadow-2xl relative">
        <Header />
        
        <main className="animate-in fade-in duration-700 pt-14 pb-20">
          <MarketTicker />
          
          <CategoryGrid 
            activeCategory={activeCategory} 
            onCategoryChange={(cat) => setActiveCategory(cat === activeCategory ? 'all' : cat)} 
          />
          
          <StockList 
            stocks={filteredStocks} 
            onStockSelect={setSelectedStock} 
          />
        </main>

        <StockDetail 
          stock={selectedStock} 
          onClose={() => setSelectedStock(null)} 
        />

        <div className="px-4 py-8 text-center">
          <p className="text-[10px] text-text-secondary opacity-40 leading-relaxed uppercase tracking-widest">
            본 서비스는 학습용 시뮬레이션 대시보드이며,<br/>
            2026년 4월 24일 시장 시뮬레이션 데이터를 기반으로 합니다.<br/>
            실제 투자 결정 시 공식 금융 사이트를 확인하시기 바랍니다.
          </p>
        </div>

        <BottomNav 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </div>
  );
}
