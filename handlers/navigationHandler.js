import { dirname, normalize } from 'path';
import { readdir } from 'node:fs/promises';
import { printError } from './errorHandler.js';

export const handleNavCommand = async (cmd, args, dir) => {
    switch(cmd) {
        case 'up':
            goUp(dir);
            break;
        case 'cd':
            goToFolder(args);
            break;
        case 'ls':
            await printFolderContent(dir);
            break;
        default:
            printError('Invalid input');
    }
};

const goUp = (currentDir) => {
    const parentDir = dirname(currentDir);
    process.chdir(parentDir);
};

const goToFolder = (args) => {
    const [folder] = args;
    const destinationPath = normalize(folder);

    process.chdir(destinationPath);
};

const printFolderContent = async (dir) => {
    const files = await readdir(dir, { withFileTypes: true});

    const sortedFiles = files.sort((a,b) => {
        if (a.isFile() === b.isFile()) return a.name - b.name;
        return a.isFile() ? 1 : -1;
    });

    const result = sortedFiles.map(file => ({
        Name: file.name,
        Type: file.isFile() ? 'file' : 'directory',
    }));

    console.table(result);
};