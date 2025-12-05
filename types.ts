export enum ButtonType {
  Number = 'NUMBER',
  Operator = 'OPERATOR',
  Action = 'ACTION',
  Scientific = 'SCIENTIFIC',
  Memory = 'MEMORY',
}

export interface CalcButton {
  label: string;
  value: string;
  type: ButtonType;
  span?: number; // Grid column span
  secondary?: boolean; // For secondary functions (shift)
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface AIResponse {
  answer: string;
  steps?: string[];
  explanation?: string;
}

export enum CalculatorMode {
  Standard = 'STANDARD',
  AI = 'AI',
}