import React from 'react';
import { CalcButton, ButtonType } from '../types';
import { MAIN_PAD, SCIENTIFIC_BUTTONS } from '../constants';

interface KeypadProps {
  onPress: (value: string, type: ButtonType) => void;
  isRad: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onPress, isRad }) => {
  
  const renderButton = (btn: CalcButton) => {
    let baseClasses = "relative overflow-hidden rounded-xl font-medium text-lg transition-all duration-150 active:scale-95 flex items-center justify-center select-none shadow-sm";
    let colorClasses = "";

    switch (btn.type) {
      case ButtonType.Operator:
        colorClasses = "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/20";
        break;
      case ButtonType.Action:
        if (btn.value === 'EVAL') {
          colorClasses = "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20";
        } else if (btn.value === 'CLEAR' || btn.value === 'BACKSPACE') {
          colorClasses = "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30";
        } else {
          colorClasses = "bg-slate-700 text-slate-200 hover:bg-slate-600";
        }
        break;
      case ButtonType.Scientific:
        // Highlight DEG/RAD based on state
        if (btn.value === 'DEG_RAD') {
             colorClasses = "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700";
        } else {
             colorClasses = "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/50";
        }
        break;
      case ButtonType.Number:
      default:
        colorClasses = "bg-slate-800/80 text-white hover:bg-slate-700 border border-slate-700/50";
        break;
    }

    const spanClass = btn.span ? `col-span-${btn.span}` : '';

    return (
      <button
        key={btn.value}
        onClick={() => onPress(btn.value, btn.type)}
        className={`${baseClasses} ${colorClasses} ${spanClass} h-14 md:h-16`}
      >
        {btn.value === 'DEG_RAD' ? (isRad ? 'RAD' : 'DEG') : btn.label}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {/* Scientific Keys - Top on Mobile, Left on Desktop */}
      <div className="md:col-span-3 grid grid-cols-4 gap-3 order-last md:order-first">
        {SCIENTIFIC_BUTTONS.map(renderButton)}
      </div>

      {/* Separator for desktop */}
      <div className="hidden md:block w-px bg-slate-800 mx-auto h-full"></div>

      {/* Main NumPad */}
      <div className="md:col-span-3 grid grid-cols-4 gap-3">
        {MAIN_PAD.map(renderButton)}
      </div>
    </div>
  );
};

export default Keypad;