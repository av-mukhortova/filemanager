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
            printError();
    }
};

const goUp = (currentDir) => {
    try {
        const parentDir = dirname(currentDir);
        process.chdir(parentDir);
    } catch {
        printError('Operation failed');
    }
};

const goToFolder = (args) => {
    try {
        const [folder] = args;
        const destinationPath = normalize(folder);

        process.chdir(destinationPath);
    } catch {
        printError('Operation failed');
    }
};

const printFolderContent = async (dir) => {
    try {
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
    } catch {
        printError('Operation failed');
    }
};