import { evaluate, format, round } from 'mathjs';

export const evaluateExpression = (expression: string, useDegrees: boolean = false): string => {
  try {
    // Basic sanitization
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');

    // Handle Degrees vs Radians for Trig functions
    // MathJS uses radians by default. We can create a scope or transform the input.
    // A simple way is to wrap numbers in 'deg' unit if in degree mode, but that's complex to parse.
    // Alternatively, we append ' deg' to numbers inside trig functions if we were using a full parser.
    // For simplicity in this React app, we will let mathjs handle standard rads,
    // and if the user wants degrees, they might need to use the 'deg' unit explicitly or we configure mathjs.
    // However, typical calc behavior switches the underlying eval mode.
    // Since mathjs doesn't have a global toggle easily swappable at runtime without config,
    // we will inject conversion factors for this demo if needed, or just stick to Radians (standard for Sci) 
    // and provide a helper. 
    
    // BETTER APPROACH: Use mathjs config if we were creating an instance, but `evaluate` is stateless.
    // We will assume RADIANS by default as per standard MathJS behavior. 
    // If useDegrees is true, we could regex replace `sin(x)` with `sin(x deg)` etc.
    
    if (useDegrees) {
       sanitized = sanitized.replace(/(sin|cos|tan)\(([^)]+)\)/g, '$1($2 deg)');
    }

    const result = evaluate(sanitized);

    if (typeof result === 'number') {
      // Precision handling to avoid 0.1 + 0.2 = 0.30000000000000004
      const rounded = format(result, { precision: 14 });
      return String(rounded);
    } else if (result && result.toString) {
      return result.toString();
    }
    
    return '';
  } catch (error) {
    console.error("Math evaluation error:", error);
    return 'Error';
  }
};

export const formatDisplay = (val: string): string => {
  // Add commas for thousands separators if it's a pure number
  if (!isNaN(Number(val)) && val !== '') {
    // Check if it has decimal
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return val;
};