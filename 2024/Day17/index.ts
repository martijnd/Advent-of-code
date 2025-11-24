/**
 * Part 1: Run the program and collect output
 * @param input - Computer program and initial register values
 * @returns Comma-separated output values
 */
export function part1(input: string): string {
  const computer = parseInput(input);
  return runProgram(computer);
}

/**
 * Part 2: Find initial A value that makes program output itself
 * @param input - Computer program and initial register values
 * @returns Initial value for register A
 */
export function part2(input: string): number {
  const computer = parseInput(input);
  const targetOutput = computer.program.join(',');

  // The programs in these puzzles often work by processing A in chunks of 3 bits
  // Let's try a more targeted search starting from reasonable values

  // Start from a large number since these puzzles often have big A values
  let startA = 10000000000000; // 10^13

  for (let a = startA; a < startA * 10; a++) {
    const testComputer: Computer = {
      registers: { A: a, B: 0, C: 0 },
      program: computer.program,
      ip: 0,
      output: []
    };

    const output = runProgram(testComputer);
    if (output === targetOutput) {
      return a;
    }
  }

  return -1; // Not found
}

/**
 * Parse input into computer state
 * @param input - Raw input string
 * @returns Computer state object
 */
function parseInput(input: string): Computer {
  const lines = input.trim().split('\n');
  const registers: Registers = { A: 0, B: 0, C: 0 };

  for (const line of lines) {
    if (line.startsWith('Register A:')) {
      registers.A = parseInt(line.split(':')[1].trim());
    } else if (line.startsWith('Register B:')) {
      registers.B = parseInt(line.split(':')[1].trim());
    } else if (line.startsWith('Register C:')) {
      registers.C = parseInt(line.split(':')[1].trim());
    } else if (line.startsWith('Program:')) {
      const program = line.split(':')[1].trim().split(',').map(Number);
      return {
        registers,
        program,
        ip: 0,
        output: []
      };
    }
  }

  throw new Error('Invalid input format');
}

/**
 * Run the computer program
 * @param computer - Computer state
 * @returns Comma-separated output string
 */
function runProgram(computer: Computer): string {
  while (computer.ip < computer.program.length) {
    const opcode = computer.program[computer.ip];
    const operand = computer.program[computer.ip + 1];

    executeInstruction(computer, opcode, operand);

    // jnz instruction handles its own IP changes
    if (opcode !== 3) {
      computer.ip += 2;
    }
  }

  return computer.output.join(',');
}

/**
 * Execute a single instruction
 * @param computer - Computer state
 * @param opcode - Instruction opcode (0-7)
 * @param operand - Instruction operand
 */
function executeInstruction(computer: Computer, opcode: number, operand: number): void {
  switch (opcode) {
    case 0: // adv: A = A / (2^combo)
      computer.registers.A = Math.floor(computer.registers.A / Math.pow(2, getComboValue(computer, operand)));
      break;

    case 1: // bxl: B = B XOR literal
      computer.registers.B = computer.registers.B ^ operand;
      break;

    case 2: // bst: B = combo % 8
      computer.registers.B = getComboValue(computer, operand) % 8;
      break;

    case 3: // jnz: if A != 0, jump to literal
      if (computer.registers.A !== 0) {
        computer.ip = operand;
        return; // Don't increment IP after jump
      }
      // If no jump, continue to normal IP increment
      break;

    case 4: // bxc: B = B XOR C (ignores operand)
      computer.registers.B = computer.registers.B ^ computer.registers.C;
      break;

    case 5: // out: output combo % 8
      computer.output.push(getComboValue(computer, operand) % 8);
      break;

    case 6: // bdv: B = A / (2^combo)
      computer.registers.B = Math.floor(computer.registers.A / Math.pow(2, getComboValue(computer, operand)));
      break;

    case 7: // cdv: C = A / (2^combo)
      computer.registers.C = Math.floor(computer.registers.A / Math.pow(2, getComboValue(computer, operand)));
      break;

    default:
      throw new Error(`Unknown opcode: ${opcode}`);
  }
}

/**
 * Get the value of a combo operand
 * @param computer - Computer state
 * @param operand - Combo operand (0-6)
 * @returns Resolved value
 */
function getComboValue(computer: Computer, operand: number): number {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return computer.registers.A;
    case 5:
      return computer.registers.B;
    case 6:
      return computer.registers.C;
    case 7:
      throw new Error('Reserved operand 7 should not appear');
    default:
      throw new Error(`Invalid combo operand: ${operand}`);
  }
}

interface Computer {
  registers: Registers;
  program: number[];
  ip: number; // Instruction pointer
  output: number[];
}

interface Registers {
  A: number;
  B: number;
  C: number;
}
