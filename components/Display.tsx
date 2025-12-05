import React, { useEffect, useRef } from 'react';
import { formatDisplay } from '../utils/math';

interface DisplayProps {
  expression: string;
  result: string;
  isAiMode: boolean;
}

const Display: React.FC<DisplayProps> = ({ expression, result, isAiMode }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto scroll to end if expression is long
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollLeft = resultRef.current.scrollWidth;
    }
  }, [expression, result]);

  return (
    <div className="flex flex-col justify-end p-6 bg-slate-900 rounded-2xl mb-4 shadow-inner border border-slate-800 h-40 relative overflow-hidden group">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
      
      {/* Expression Line (Previous Input) */}
      <div 
        className="w-full text-right text-slate-400 text-lg mb-2 font-mono overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        {isAiMode ? "AI Prompt" : (expression || '\u00A0')}
      </div>

      {/* Result / Current Input Line */}
      <div 
        ref={resultRef}
        className={`w-full text-right font-mono font-bold tracking-tight text-white overflow-x-auto no-scrollbar whitespace-nowrap transition-all duration-300 ${
            expression.length > 15 ? 'text-3xl' : 'text-5xl'
        }`}
      >
        {result === '' && !expression ? '0' : formatDisplay(result || expression)}
      </div>

      {isAiMode && (
        <div className="absolute top-4 left-4">
           <span className="px-2 py-1 bg-indigo-600 rounded text-xs font-bold text-white shadow-lg animate-pulse">
             AI MODE
           </span>
        </div>
      )}
    </div>
  );
};

export default Display;