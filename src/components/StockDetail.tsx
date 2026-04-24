import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StockDetailProps {
  stock: Stock | null;
  onClose: () => void;
}

export default function StockDetail({ stock, onClose }: StockDetailProps) {
  if (!stock) return null;

  const accentColor = stock.isUp ? "#FF4D4D" : "#4D88FF";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center sm:justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-bg-deep w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border-t sm:border border-border-subtle overflow-hidden max-h-[95vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-3">
                    {stock.name} 
                    <span className="text-text-secondary font-normal text-sm opacity-40">{stock.symbol}</span>
                  </h2>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-4xl font-bold font-mono text-text-primary tracking-tighter">
                      {stock.price.toLocaleString()}
                    </span>
                    <div className={`flex items-center text-lg font-mono font-bold ${stock.isUp ? 'text-brand-up' : 'text-brand-down'}`}>
                      {stock.isUp ? '▲' : '▼'} {stock.change.toLocaleString()} ({stock.isUp ? '+' : ''}{stock.changePercent}%)
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-bg-surface border border-border-subtle rounded-full transition-colors text-text-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-[200px] w-full mb-10 bg-bg-surface/30 rounded-xl p-4 border border-border-subtle/50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stock.chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D323D" opacity={0.5} />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#8A8D98' }}
                    />
                    <YAxis 
                      domain={['dataMin', 'dataMax']} 
                      hide 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#14161C', borderRadius: '12px', border: '1px solid #2D323D', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                      itemStyle={{ fontWeight: 'bold', color: '#E0E0E0' }}
                      labelStyle={{ color: '#8A8D98', marginBottom: '4px', fontSize: '10px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={accentColor} 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">기업 개요</h3>
                  <p className="text-text-secondary text-sm leading-relaxed opacity-80">
                    {stock.description}
                  </p>
                </section>

                {stock.financials.length > 0 && (
                  <section>
                    <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-4">재무 실적</h3>
                    <div className="space-y-4">
                      {stock.financials.slice(-2).map((fin) => (
                        <div key={fin.year} className="flex justify-between items-end border-b border-border-subtle pb-2">
                          <span className="text-xs text-text-secondary">매출액 ({fin.year})</span>
                          <span className="font-mono text-sm text-text-primary">{fin.revenue}T <span className="opacity-40 text-[10px]">KRW</span></span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center bg-bg-surface p-3 rounded-lg border border-border-subtle">
                        <span className="text-xs text-text-secondary">평균 ROE</span>
                        <span className="font-mono font-bold text-brand-up">15.4%</span>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-bg-header border-t border-border-subtle">
            <button className="w-full py-4 bg-text-primary text-bg-deep rounded-xl font-bold text-sm uppercase tracking-tight hover:bg-brand-up hover:text-white transition-all transform active:scale-[0.98]">
              상세 재무제표 리포트 보기
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
