interface Folder {
  name: string;
  files: number[];
  folders: Record<string, Folder>;
  cursor?: true;
}

export function part1wip(input: string) {
  const rows = input.split('\n');

  const files: { folderName: string; size: number }[] = [];
  let activeFolderName = '';
  rows.forEach((row) => {
    if (row.startsWith('$ cd') && row !== 'cd ..') {
      activeFolderName = row.slice(5);
      return;
    }

    if (!row.startsWith('$') && !row.startsWith('dir')) {
      files.push({
        folderName: activeFolderName,
        size: Number(row.split(' ')[0]),
      });
    }
  });

  const folders: Record<string, number> = {};

  files.forEach((file) => {
    folders[file.folderName] = (folders[file.folderName] ?? 0) + file.size;
  });
  console.log(folders);
  let total = 0;
  Object.values(folders).forEach((folderSize) => {
    console.log(folderSize);
    if (total + folderSize < 100_000) {
      total += folderSize;
    }
  });

  return total;
}

export function part1(input: string) {
  const rows = input.split('\n');
  let filesystem: Folder = { name: '/', files: [], folders: {} };
  let cursor: string[] = [];
  let currentFolder = filesystem;

  rows.slice(1).forEach((row) => {
    if (row.startsWith('$ cd ..')) {
      cursor.pop();

      return;
    }

    if (row.startsWith('$ cd')) {
      const location = row.slice(5);
      cursor = [...cursor, location];
      currentFolder = goToFolder(filesystem, cursor, location);

      return;
    }

    if (row.startsWith('dir')) {
      // Add a folder to file system
      const folderName = row.slice(4);
      currentFolder.folders = {
        ...currentFolder.folders,
        [folderName]: {
          name: folderName,
          files: [],
          folders: {},
        },
      };
      // Add a file to file system

      return;
    }

    if (row.startsWith('$ ls')) {
      return;
    }

    currentFolder.files = [...currentFolder.files, Number(row.split(' ')[0])];
  });

  console.log(filesystem.folders.a.folders.e);
  return traverse(filesystem);
}

function traverse(filesystem: Folder, total = 0, max = 100_000) {
  filesystem.files.forEach((file) => {
    if (file + total < max) {
      total += file;
    }
  });

  Object.values(filesystem.folders).forEach((folder) => {
    total = traverse(folder, total);
  });

  return total;
}

function goToFolder(filesystem: Folder, cursor: string[], name: string) {
  cursor.forEach((loc) => {
    if (!filesystem.folders[loc]) {
      filesystem.folders[loc] = { name, files: [], folders: {} };
    }
    filesystem = filesystem.folders[loc];
  });

  return filesystem;
}

export function part2(input: string) {}
