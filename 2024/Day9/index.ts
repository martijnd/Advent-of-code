/**
 * Part 1: Compact disk by moving file blocks to fill gaps
 * Calculate checksum of final disk layout
 * @param input - Disk map string
 * @returns Checksum of compacted disk
 */
export function part1(input: string): number {
  const disk = expandDisk(input.trim());
  compactDisk(disk);
  return calculateChecksum(disk);
}

/**
 * Part 2: Compact disk by moving whole files instead of individual blocks
 * Calculate checksum of final disk layout
 * @param input - Disk map string
 * @returns Checksum of compacted disk
 */
export function part2(input: string): number {
  const disk = expandDisk(input.trim());
  compactDiskWholeFiles(disk);
  return calculateChecksum(disk);
}

/**
 * Expand disk map into actual disk blocks
 * @param diskMap - String of alternating file size and free space
 * @returns Array where each element is a file ID or null for free space
 */
function expandDisk(diskMap: string): (number | null)[] {
  const disk: (number | null)[] = [];
  let fileId = 0;
  let isFile = true;

  for (const char of diskMap) {
    const size = parseInt(char);

    for (let i = 0; i < size; i++) {
      if (isFile) {
        disk.push(fileId);
      } else {
        disk.push(null);
      }
    }

    if (isFile) {
      fileId++;
    }
    isFile = !isFile;
  }

  return disk;
}

/**
 * Compact disk by moving individual blocks from end to fill gaps
 * @param disk - Disk array to modify in place
 */
function compactDisk(disk: (number | null)[]): void {
  let left = 0;
  let right = disk.length - 1;

  while (left < right) {
    // Find next free space from left
    while (left < right && disk[left] !== null) {
      left++;
    }

    // Find next file block from right
    while (left < right && disk[right] === null) {
      right--;
    }

    // Move file block to free space
    if (left < right) {
      disk[left] = disk[right];
      disk[right] = null;
      left++;
      right--;
    }
  }
}

/**
 * Compact disk by moving whole files (not individual blocks)
 * @param disk - Disk array to modify in place
 */
function compactDiskWholeFiles(disk: (number | null)[]): void {
  // Find all files (groups of consecutive blocks with same ID)
  const files: Array<{ id: number; start: number; size: number }> = [];

  let i = 0;
  while (i < disk.length) {
    if (disk[i] !== null) {
      const fileId = disk[i]!;
      let start = i;
      let size = 0;

      // Count consecutive blocks of this file
      while (i < disk.length && disk[i] === fileId) {
        size++;
        i++;
      }

      files.push({ id: fileId, start, size });
    } else {
      i++;
    }
  }

  // Process files from highest ID to lowest
  files.sort((a, b) => b.id - a.id);

  for (const file of files) {
    // Find leftmost free space that can fit this file
    let freeStart = -1;
    let freeSize = 0;

    for (let i = 0; i < file.start; i++) {
      if (disk[i] === null) {
        if (freeStart === -1) {
          freeStart = i;
        }
        freeSize++;

        if (freeSize >= file.size) {
          // Move file to this location
          for (let j = 0; j < file.size; j++) {
            disk[freeStart + j] = file.id;
            disk[file.start + j] = null;
          }
          break;
        }
      } else {
        freeStart = -1;
        freeSize = 0;
      }
    }
  }
}

/**
 * Calculate checksum of disk layout
 * @param disk - Disk array
 * @returns Checksum (sum of position * fileId for all file blocks)
 */
function calculateChecksum(disk: (number | null)[]): number {
  let checksum = 0;

  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== null) {
      checksum += i * disk[i]!;
    }
  }

  return checksum;
}
