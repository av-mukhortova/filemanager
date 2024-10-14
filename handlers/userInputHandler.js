import { handleNavCommand } from './navigationHandler.js';
import { handleFilesCommand } from './filesHandler.js';
import { handleOsCommand } from './osHandlers.js';
import { handleHashCommand } from './hashHandler.js';
import { handleZipCommand } from './zipHandler.js';
import { printCurrentDirectory } from '../utils/directoryUtils.js';
import { printError } from './errorHandler.js';

export const handleUserInput = async (input, closeReadline) => {
    const [cmdName, ...args] = input.trim().split(/\s+/g);
    const currentDir = process.cwd();

    try {
        switch(cmdName) {
            case 'up':
            case 'cd':
            case 'ls':
                await handleNavCommand(cmdName, args, currentDir);
                break;
            case 'cat':
            case 'add':
            case 'rn':
            case 'cp':
            case 'mv':
            case 'rm':
                await handleFilesCommand(cmdName, args, currentDir);
                break;
            case 'os':
                handleOsCommand(args);
                break;
            case 'hash':
                await handleHashCommand(args, currentDir);
                break;
            case 'compress':
            case 'decompress':
                await handleZipCommand(cmdName, args, currentDir);
                break;
            case '.exit':
                closeReadline();
                break;
            default:
                printError();
        }
        if (cmdName !== '.exit') printCurrentDirectory();
    } catch {
        printError('Operation failed');
    }
};