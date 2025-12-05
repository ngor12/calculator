import React, { useState, useCallback, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import HistorySidebar from './HistorySidebar';
import AIAssistant from './AIAssistant';
import { ButtonType, HistoryItem, CalculatorMode } from '../types';
import { evaluateExpression } from '../utils/math';
import { History, Sparkles, Calculator as CalcIcon, Github } from 'lucide-react';
import { MAX_HISTORY_ITEMS } from '../constants';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState(''); // The formula string
  const [currentInput, setCurrentInput] = useState(''); // What is being typed currently
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isRad, setIsRad] = useState(true); // Default to Radians
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.Standard);

  const handlePress = useCallback((value: string, type: ButtonType) => {
    // Reset result state if we start typing new numbers after an evaluation
    // unless it's an operator, which should continue the operation
    
    if (type === ButtonType.Action) {
      if (value === 'CLEAR') {
        setExpression('');
        setCurrentInput('');
        setResult('');
      } else if (value === 'BACKSPACE') {
        if (currentInput.length > 0) {
          setCurrentInput(prev => prev.slice(0, -1));
        } else if (expression.length > 0) {
             // If input is empty but expression exists, remove last char of expression?
             // Usually calculators behave differently. 
             // We'll stick to clearing current input first.
             setExpression(''); // Simple reset for now if input empty
        }
      } else if (value === 'EVAL') {
        calculate();
      } else if (value === 'ANS') {
        if (history.length > 0) {
          setCurrentInput(prev => prev + history[0].result);
        }
      }
      return;
    }

    if (type === ButtonType.Scientific) {
        if (value === 'DEG_RAD') {
            setIsRad(!isRad);
            return;
        }
    }

    // If we just evaluated and type a number, reset.
    if (result && !expression && type === ButtonType.Number) {
        setResult('');
        setCurrentInput(value);
        return;
    }
    
    // If we just evaluated and type an operator, use the result as start
    if (result && !expression && type === ButtonType.Operator) {
        setExpression(result + value);
        setResult('');
        setCurrentInput('');
        return;
    }

    if (type === ButtonType.Operator) {
        if (currentInput) {
            setExpression(prev => prev + currentInput + value);
            setCurrentInput('');
        } else if (expression) {
            // Swap operator if last char is operator
            const lastChar = expression.trim().slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                 setExpression(prev => prev.slice(0, -1) + value);
            } else {
                 setExpression(prev => prev + value);
            }
        } else if (value === '-') {
            // Negative start
            setCurrentInput('-');
        }
    } else {
        // Numbers and Functions
        setCurrentInput(prev => prev + value);
    }

  }, [currentInput, expression, result, isRad, history]);

  const calculate = () => {
    const fullExpr = expression + currentInput;
    if (!fullExpr) return;

    const evalResult = evaluateExpression(fullExpr, !isRad);
    
    if (evalResult !== 'Error') {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        expression: fullExpr,
        result: evalResult,
        timestamp: Date.now(),
      };
      
      setHistory(prev => [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS));
      setResult(evalResult);
      setExpression('');
      setCurrentInput(evalResult);
    } else {
      setResult('Error');
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === CalculatorMode.AI) return; // Disable keys in AI mode

      const key = e.key;
      if (/[0-9.]/.test(key)) handlePress(key, ButtonType.Number);
      if (['+', '-', '*', '/'].includes(key)) handlePress(key, ButtonType.Operator);
      if (key === 'Enter') handlePress('=', ButtonType.Action); // Map Enter to Eval
      if (key === 'Backspace') handlePress('BACKSPACE', ButtonType.Action);
      if (key === 'Escape') handlePress('CLEAR', ButtonType.Action);
      if (key === '(' || key === ')') handlePress(key, ButtonType.Scientific);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress, mode]);

  const insertAiResult = (val: string) => {
      // Strip non-numeric chars for safety if needed, but keeping it flexible
      setCurrentInput(val);
      setMode(CalculatorMode.Standard);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Main Calculator Area */}
        <div className={`flex-1 p-6 md:p-8 transition-all duration-300 ${isHistoryOpen ? 'md:mr-80' : ''}`}>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CalcIcon className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight hidden sm:block">Gemini SciCalc</h1>
                </div>

                <div className="flex items-center bg-slate-800 p-1 rounded-xl">
                    <button 
                        onClick={() => setMode(CalculatorMode.Standard)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === CalculatorMode.Standard ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Standard
                    </button>
                    <button 
                         onClick={() => setMode(CalculatorMode.AI)}
                         className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${mode === CalculatorMode.AI ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Sparkles size={14} />
                        AI Assist
                    </button>
                </div>

                <button 
                    onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                    className={`p-3 rounded-xl transition-colors ${isHistoryOpen ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    <History size={20} />
                </button>
            </div>

            {mode === CalculatorMode.Standard ? (
                <div className="animate-fade-in-up">
                    <Display 
                        expression={expression} 
                        result={currentInput || result} 
                        isAiMode={false} 
                    />
                    <Keypad onPress={handlePress} isRad={isRad} />
                </div>
            ) : (
                <div className="h-[500px] animate-fade-in">
                    <AIAssistant onPasteResult={insertAiResult} />
                </div>
            )}
        </div>

        {/* History Sidebar Component */}
        <HistorySidebar 
            history={history}
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            onClear={() => setHistory([])}
            onSelect={(item) => {
                setCurrentInput(item.result);
                setIsHistoryOpen(false);
            }}
        />

      </div>
      
      {/* Footer Credits */}
      <div className="absolute bottom-4 text-slate-500 text-sm flex gap-4">
        <span>Powered by Gemini 2.5 Flash</span>
      </div>
    </div>
  );
};

export default Calculator;