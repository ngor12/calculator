import React, { useState, useEffect, useRef } from 'react';
import { askGeminiMath } from '../services/gemini';
import { AIResponse } from '../types';
import { Send, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { AI_SUGGESTIONS } from '../constants';

interface AIAssistantProps {
  onPasteResult: (val: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onPasteResult }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    const result = await askGeminiMath(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl p-4 border border-slate-800">
      <div className="flex items-center gap-2 mb-4 text-indigo-400">
        <Sparkles size={20} />
        <h2 className="font-semibold text-white">Gemini Math Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 min-h-[200px] space-y-4">
        {!response && !loading && (
          <div className="text-slate-400 text-sm p-4 bg-slate-800/50 rounded-xl">
            <p className="mb-3 font-medium text-white">Try asking me:</p>
            <ul className="space-y-2">
              {AI_SUGGESTIONS.map((s, i) => (
                <li 
                  key={i} 
                  className="cursor-pointer hover:text-indigo-400 flex items-center gap-2 transition-colors"
                  onClick={() => setInput(s)}
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-40 text-indigo-400 animate-pulse">
            <Loader2 size={32} className="animate-spin mb-2" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        {response && (
            <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-slate-800 rounded-xl border border-indigo-500/30">
                    <div className="text-xs text-indigo-300 uppercase font-bold tracking-wider mb-1">Answer</div>
                    <div className="text-3xl font-mono font-bold text-white mb-2">{response.answer}</div>
                    <button 
                        onClick={() => onPasteResult(response.answer)}
                        className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition"
                    >
                        Use Result
                    </button>
                </div>
                
                {response.explanation && (
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                         <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Explanation</div>
                         <p className="text-slate-300 leading-relaxed">{response.explanation}</p>
                    </div>
                )}

                {response.steps && response.steps.length > 0 && (
                     <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">
                             <BookOpen size={14} />
                             Steps
                        </div>
                        <ul className="space-y-2">
                            {response.steps.map((step, idx) => (
                                <li key={idx} className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-slate-500 font-mono select-none">{idx + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your math problem..."
          className="w-full bg-slate-950 text-white rounded-xl p-4 pr-12 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-800"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;