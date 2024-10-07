import readlinePromises from 'node:readline/promises';
const getUserName = () => {
    const args = process.argv.slice(2);
    const nameArg = args.find(arg => arg.startsWith('username='));
    if (!nameArg) return null;

    return nameArg.split('=')[1] || null;
};

const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()} \n`);
};

import { homedir } from 'os';
const setHomeDirectory = () => {
    process.chdir(homedir());
    printCurrentDirectory();
};

const handleUserCommand = async () => {

};

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

    rl.on(`line`, async (cmd) => {
        console.log(cmd);
        await handleUserCommand(cmd, closeReadLine);
        printCurrentDirectory();
    });

    rl.on(`close`, () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!\n`);
    });

    rl.on(`error`, () => {
        console.log(`An unknown error has occurred\n`);
    });
};

initFileManagerApp();