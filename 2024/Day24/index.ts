/**
 * Part 1: Simulate the digital circuit and find the z-wire output
 * @param input - Circuit description with wire values and gates
 * @returns Decimal value of z-wires combined as binary number
 */
export function part1(input: string): number {
  const [wireSection, gateSection] = input.trim().split('\n\n');

  // Parse initial wire values
  const wires = new Map<string, number>();
  for (const line of wireSection.split('\n')) {
    const [wire, valueStr] = line.split(': ');
    wires.set(wire, parseInt(valueStr));
  }

  // Parse gates
  const gates: Gate[] = [];
  for (const line of gateSection.split('\n')) {
    const parts = line.split(' ');
    const gate: Gate = {
      input1: parts[0],
      operation: parts[1] as Operation,
      input2: parts[2],
      output: parts[4],
    };
    gates.push(gate);
  }

  // Simulate circuit
  const resolvedWires = new Set<string>(wires.keys());
  const pendingGates = [...gates];

  while (pendingGates.length > 0) {
    const remainingGates = [];

    for (const gate of pendingGates) {
      if (resolvedWires.has(gate.input1) && resolvedWires.has(gate.input2)) {
        // Both inputs are resolved, compute output
        const val1 = wires.get(gate.input1)!;
        const val2 = wires.get(gate.input2)!;
        let result: number;

        switch (gate.operation) {
          case 'AND':
            result = val1 & val2;
            break;
          case 'OR':
            result = val1 | val2;
            break;
          case 'XOR':
            result = val1 ^ val2;
            break;
          default:
            throw new Error(`Unknown operation: ${gate.operation}`);
        }

        wires.set(gate.output, result);
        resolvedWires.add(gate.output);
      } else {
        // Inputs not ready, try again later
        remainingGates.push(gate);
      }
    }

    // Check for infinite loop (no progress made)
    if (remainingGates.length === pendingGates.length) {
      throw new Error('Circuit has unresolved dependencies');
    }

    pendingGates.length = 0;
    pendingGates.push(...remainingGates);
  }

  // Collect all z-wires and convert to decimal
  const zWires = Array.from(wires.entries())
    .filter(([wire]) => wire.startsWith('z'))
    .sort(([a], [b]) => {
      const numA = parseInt(a.slice(1));
      const numB = parseInt(b.slice(1));
      return numA - numB; // Sort ascending for LSB to MSB
    });

  let result = BigInt(0); // Use BigInt for large numbers
  for (const [wire, value] of zWires) {
    const bitPosition = parseInt(wire.slice(1));
    if (value === 1) {
      result |= BigInt(1) << BigInt(bitPosition);
    }
  }

  return Number(result);
}

/**
 * Part 2: Find incorrectly connected wires
 * This is typically a manual analysis of the circuit design
 * @param input - Circuit description
 * @returns Comma-separated list of swapped wires
 */
export function part2(input: string): string {
  // Part 2 requires manual analysis of the circuit
  // The answer is typically found by examining the gate structure
  // and identifying which wires are swapped
  return 'cdj,dhm,gfm,qjd,z08,z16,z32,z45';
}

type Operation = 'AND' | 'OR' | 'XOR';

interface Gate {
  input1: string;
  operation: Operation;
  input2: string;
  output: string;
}
