import { ButtonType, CalcButton } from './types';

export const MAX_HISTORY_ITEMS = 50;

export const SCIENTIFIC_BUTTONS: CalcButton[] = [
  { label: 'deg/rad', value: 'DEG_RAD', type: ButtonType.Scientific },
  { label: 'sin', value: 'sin(', type: ButtonType.Scientific },
  { label: 'cos', value: 'cos(', type: ButtonType.Scientific },
  { label: 'tan', value: 'tan(', type: ButtonType.Scientific },
  { label: 'ln', value: 'log(', type: ButtonType.Scientific },
  { label: 'log', value: 'log10(', type: ButtonType.Scientific },
  { label: '(', value: '(', type: ButtonType.Scientific },
  { label: ')', value: ')', type: ButtonType.Scientific },
  { label: '√', value: 'sqrt(', type: ButtonType.Scientific },
  { label: '^', value: '^', type: ButtonType.Scientific },
  { label: 'π', value: 'pi', type: ButtonType.Scientific },
  { label: 'e', value: 'e', type: ButtonType.Scientific },
  { label: '!', value: '!', type: ButtonType.Scientific },
  { label: 'inv', value: 'inv', type: ButtonType.Scientific }, // 1/x
  { label: '%', value: '%', type: ButtonType.Scientific },
  { label: 'abs', value: 'abs(', type: ButtonType.Scientific },
];

export const MAIN_PAD: CalcButton[] = [
  { label: 'C', value: 'CLEAR', type: ButtonType.Action },
  { label: '⌫', value: 'BACKSPACE', type: ButtonType.Action },
  { label: '/', value: '/', type: ButtonType.Operator },
  { label: '*', value: '*', type: ButtonType.Operator },
  { label: '7', value: '7', type: ButtonType.Number },
  { label: '8', value: '8', type: ButtonType.Number },
  { label: '9', value: '9', type: ButtonType.Number },
  { label: '-', value: '-', type: ButtonType.Operator },
  { label: '4', value: '4', type: ButtonType.Number },
  { label: '5', value: '5', type: ButtonType.Number },
  { label: '6', value: '6', type: ButtonType.Number },
  { label: '+', value: '+', type: ButtonType.Operator },
  { label: '1', value: '1', type: ButtonType.Number },
  { label: '2', value: '2', type: ButtonType.Number },
  { label: '3', value: '3', type: ButtonType.Number },
  { label: '=', value: 'EVAL', type: ButtonType.Action, span: 1, secondary: true }, 
  { label: '0', value: '0', type: ButtonType.Number, span: 2 },
  { label: '.', value: '.', type: ButtonType.Number },
  { label: 'Ans', value: 'ANS', type: ButtonType.Action },
];

export const AI_SUGGESTIONS = [
  "Calculate the area of a circle with radius 5",
  "Convert 100 degrees Fahrenheit to Celsius",
  "Solve 2x + 5 = 15",
  "What is the derivative of x^2?",
  "Distance to the moon in meters"
];