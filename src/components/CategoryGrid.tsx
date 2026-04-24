import { Flag, Globe, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryGridProps {
  onCategoryChange: (category: 'domestic' | 'overseas' | 'etf' | 'all') => void;
  activeCategory: string;
}

export default function CategoryGrid({ onCategoryChange, activeCategory }: CategoryGridProps) {
  const categories = [
    { id: 'all', label: '전체' },
    { id: 'domestic', label: '국내 주식' },
    { id: 'overseas', label: '해외 주식' },
    { id: 'etf', label: 'ETF' },
  ];

  return (
    <section className="px-4 py-6 flex justify-center">
      <nav className="flex gap-1 bg-bg-surface p-1 rounded-full border border-border-subtle shadow-lg">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-border-subtle text-text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
    </section>
  );
}
