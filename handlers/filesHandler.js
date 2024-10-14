import { join, resolve } from 'path';
import { createReadStream, createWriteStream, stat } from 'fs';
import { writeFile, rename, rm, mkdir } from 'fs/promises';
import { pipeline } from "node:stream/promises";
import { printError } from './errorHandler.js';

export const handleFilesCommand = async (cmd, args, dir) => {
    switch(cmd) {
        case 'cat':
            await readFile(dir, args);
            break;
        case 'add':
            await addFile(dir, args);
            break;
        case 'rn':
            await renameFile(dir, args);
            break;
        case 'cp':
            await copyFile(dir, args);
            break;
        case 'mv':
            await moveFile(dir, args);
            break;
        case 'rm':
            await removeFile(dir, args);
            break;
        default:
            printError();
    }
};

const readFile = async (dir, args) => {
    try {
        const [fileToRead] = args;
        const filePath = join(dir, fileToRead);

        const readStream = createReadStream(filePath, 'utf-8');
        readStream.on('data', (data) => {
            console.log(data + `\n`);
        });
    } catch {
        printError('Operation failed');
    }
};

const addFile = async (dir, args) => {
    try {
        const [fileName] = args;
        if (fileName) {
            const filePath = join(dir, fileName);
            await writeFile(filePath, '', {flag: 'wx'});
        } else {
            printError('Operation failed');
        }
    } catch {
        printError('Operation failed');
    }
};

const renameFile = async (dir, args) => {
    try {
        const [oldFileName, newFileName] = args;
        const oldFilePath = join(dir, oldFileName);
        const newFilePath = join(dir, newFileName);

        await rename(oldFilePath, newFilePath);
    } catch {
        printError('Operation failed');
    }
};

const copyFile = async (dir, args) => {
    try {
        const [fileNameToCopy, destinationFolder] = args;
        if (!fileNameToCopy || !destinationFolder) {
            printError('Operation failed');
        }

        const filePathToCopy = join(dir, fileNameToCopy);
        const destinationFolderPath = resolve(dir, destinationFolder);

        await stat(destinationFolderPath, async (err) => {
            if (err && err.code === 'ENOENT') {
                await mkdir(destinationFolderPath);
            }
            const destinationFilePath = join(destinationFolderPath, fileNameToCopy);
            const readStream = createReadStream(filePathToCopy, { encoding: 'utf8'});
            const writeStream = createWriteStream(destinationFilePath);
    
            await pipeline(readStream, writeStream);
        });
    } catch {
        printError('Operation failed');
    }
}

const moveFile = async (dir, args) => {
    await copyFile(dir, args);
    await removeFile(dir, args);
}

const removeFile = async (dir, args) => {
    try {
        const [deletedFile] = args;
        const deletedFilePath = join(dir, deletedFile);

        await rm(deletedFilePath);
    } catch {
        printError('Operation failed');
    }
}