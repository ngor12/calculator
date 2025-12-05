import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Clock } from 'lucide-react';

interface HistorySidebarProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, isOpen, onClear, onSelect, onClose }) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-indigo-400">
            <Clock size={20} />
            <h2 className="font-semibold text-white">History</h2>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={onClear} 
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                title="Clear History"
            >
                <Trash2 size={18} />
            </button>
            <button 
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
                ✕
            </button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100%-4rem)] p-4 space-y-3">
        {history.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
                <p>No calculations yet.</p>
            </div>
        ) : (
            history.map((item) => (
            <div 
                key={item.id} 
                onClick={() => onSelect(item)}
                className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 cursor-pointer border border-slate-700/50 hover:border-indigo-500/50 transition group"
            >
                <div className="text-sm text-slate-400 font-mono mb-1 truncate">{item.expression}</div>
                <div className="text-xl text-white font-mono font-bold text-right group-hover:text-indigo-400 transition-colors">{item.result}</div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;