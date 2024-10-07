import readlinePromises from 'node:readline/promises';
import { getUserName } from './utils/userUtils.js';
import { setHomeDirectory } from './utils/directoryUtils.js';
import { handleUserInput } from './handlers/userInputHandler.js';

const initFileManagerApp = () => {
    const username = getUserName() || 'Guest';
    console.log(`Welcome to the File Manager, ${username}! \n`);

    setHomeDirectory();

    const rl = readlinePromises.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const closeReadLine = () => {
        rl.close();
    };

    rl.on(`line`, async (input) => {
        await handleUserInput(input, closeReadLine);
    });

    rl.on(`close`, () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!\n`);
    });

    rl.on(`error`, () => {
        console.log(`An unknown error has occurred\n`);
    });
};

initFileManagerApp();