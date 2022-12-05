import { readFileSync } from 'fs';
import { resolve } from 'path';

export const getInput = (cwd: string) =>
  readFileSync(resolve(cwd, 'input.txt'), { encoding: 'utf-8' });
