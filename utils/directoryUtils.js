import { homedir } from 'os';

export const setHomeDirectory = () => {
    process.chdir(homedir());
    printCurrentDirectory();
};

export const printCurrentDirectory = () => {
    console.log(`You are currently in ${process.cwd()} \n`);
};
