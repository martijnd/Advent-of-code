import { readFileSync } from 'fs'
import { join } from 'path'

export default (cwd: string) =>
  readFileSync(join(cwd, '/input.txt')).toString('utf8').split('\n')
