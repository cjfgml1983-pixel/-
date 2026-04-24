import { Home, BarChart2, Star, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'markets', label: '시장', icon: BarChart2 },
    { id: 'watchlist', label: '관심종목', icon: Star },
    { id: 'profile', label: '마이페이지', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-bg-header border-t border-border-subtle h-16 z-50 flex justify-around items-center px-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive ? 'text-text-primary scale-110' : 'text-text-secondary opacity-60 hover:opacity-100'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
