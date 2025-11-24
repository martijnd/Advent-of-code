/**
 * Part 1: Find equations that can be made true with + and * operators
 * @param input - Puzzle input string
 * @returns Sum of test values from valid equations
 */
export function part1(input: string): number {
  const equations = parseInput(input);
  return equations
    .filter(([target, numbers]) => canMakeTarget(target, numbers))
    .reduce((sum, [target]) => sum + target, 0);
}

/**
 * Part 2: Find equations that can be made true with +, *, and || (concatenation) operators
 * @param input - Puzzle input string
 * @returns Sum of test values from valid equations
 */
export function part2(input: string): number {
  const equations = parseInput(input);
  return equations
    .filter(([target, numbers]) => canMakeTargetWithConcat(target, numbers))
    .reduce((sum, [target]) => sum + target, 0);
}

/**
 * Parse input into array of [target, numbers] tuples
 * Input format: "target: num1 num2 num3 ..."
 * @param input - Raw puzzle input
 * @returns Array of equations as [target, numbers[]] pairs
 */
function parseInput(input: string): [number, number[]][] {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [targetStr, numbersStr] = line.split(': ');
      const target = parseInt(targetStr);
      const numbers = numbersStr.split(' ').map(Number);
      return [target, numbers];
    });
}

/**
 * Check if target can be achieved with + and * operators
 * Uses bit manipulation to try all 2^(n-1) operator combinations
 * @param target - Target value to achieve
 * @param numbers - Array of numbers to combine
 * @returns true if any operator combination produces target
 */
function canMakeTarget(target: number, numbers: number[]): boolean {
  // Base case: single number
  if (numbers.length === 1) {
    return numbers[0] === target;
  }

  // For n numbers, we need n-1 operators
  const numOperators = numbers.length - 1;
  // Each operator has 2 choices (+ or *), so 2^(n-1) total combinations
  const numCombinations = 1 << numOperators; // 2^numOperators

  // Try every possible combination of operators
  // Use bit mask where each bit represents an operator choice
  for (let mask = 0; mask < numCombinations; mask++) {
    let result = numbers[0];

    // Apply each operator in sequence
    for (let i = 0; i < numOperators; i++) {
      // Extract operator choice from mask: bit i represents operator at position i
      const operator = mask & (1 << i) ? '*' : '+';
      const nextNum = numbers[i + 1];

      if (operator === '+') {
        result += nextNum;
      } else {
        result *= nextNum;
      }
    }

    // Check if this combination produces the target
    if (result === target) {
      return true;
    }
  }

  return false;
}

/**
 * Check if target can be achieved with +, *, and || (concatenation) operators
 * Uses base-3 numbering to try all 3^(n-1) operator combinations
 * @param target - Target value to achieve
 * @param numbers - Array of numbers to combine
 * @returns true if any operator combination produces target
 */
function canMakeTargetWithConcat(target: number, numbers: number[]): boolean {
  // Base case: single number
  if (numbers.length === 1) {
    return numbers[0] === target;
  }

  // For n numbers, we need n-1 operators
  const numOperators = numbers.length - 1;
  // Each operator has 3 choices (+, *, ||), so 3^(n-1) total combinations
  const numCombinations = 3 ** numOperators;

  // Try every possible combination of operators
  // Use base-3 representation where each digit represents operator choice:
  // 0 = +, 1 = *, 2 = ||
  for (let combination = 0; combination < numCombinations; combination++) {
    let result = numbers[0];
    let tempCombination = combination;

    // Apply each operator in sequence
    for (let i = 0; i < numOperators; i++) {
      // Extract operator choice: use modulo 3 to get current digit
      const operatorIndex = tempCombination % 3;
      // Shift right by dividing by 3 (move to next digit)
      tempCombination = Math.floor(tempCombination / 3);

      const nextNum = numbers[i + 1];

      if (operatorIndex === 0) {
        // Addition
        result += nextNum;
      } else if (operatorIndex === 1) {
        // Multiplication
        result *= nextNum;
      } else {
        // Concatenation: combine as strings then parse as number
        result = parseInt(result.toString() + nextNum.toString());
      }
    }

    // Check if this combination produces the target
    if (result === target) {
      return true;
    }
  }

  return false;
}
