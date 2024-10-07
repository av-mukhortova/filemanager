import { handleNavCommand } from './navigationHandler.js';
import { printCurrentDirectory } from '../utils/directoryUtils.js';

export const handleUserInput = async (input, closeReadline) => {
    const [cmdName, ...args] = input.trim().split(/\s+/g);
    const currentDir = process.cwd();

    switch(cmdName) {
        case 'up':
            await handleNavCommand(cmdName, args, currentDir);
            break;
        case '.exit':
            closeReadline();
            break;
        default:
            throw new Error('Invalid input');
    }
    if (cmdName !== '.exit') printCurrentDirectory();
};