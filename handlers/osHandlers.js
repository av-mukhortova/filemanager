import { homedir, userInfo, cpus, EOL, arch } from 'os';
import { printError } from './errorHandler.js';

export const handleOsCommand = (args) => {
    const [flag] = args || [];
    switch (flag) {
        case '--EOL':
            printEOL();
            break;
        case '--cpus':
            printCPUS();
            break;
        case '--homedir':
            printHomeDir();
            break;
        case '--username':
            printUsername();
            break;
        case '--architecture':
            printArchitecture();
            break;
        default:
            printError();
    }
};

const printEOL = () => {
    try {
        console.log(`EOL: ${JSON.stringify(EOL)}\n`);
    } catch {
        printError('Operation failed');
    }
};

const printCPUS = () => {
    try {
        const userMachineCpuData = cpus();
        const cpusData = userMachineCpuData.map((cpu) => ({
            model: cpu.model,
            speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
        }));
        console.log(`CPU number: \n`, userMachineCpuData.length);
        console.log(`CPU data: \n`, cpusData);
    } catch {
        printError('Operation failed');
    }
};

const printHomeDir = () => {
    try {
        const userHomeDirectory = homedir();
        console.log(`Home directory: ${userHomeDirectory}\n`);
    } catch {
        printError('Operation failed');
    }
};

const printUsername = () => {
    try {
        const userinfo = userInfo();
        console.log(`Sistem user name: ${userinfo.username}\n`);
    } catch {
        printError('Operation failed');
    }
};

const printArchitecture = () => {
    try {
        const cpuArchitecture = arch();
        console.log(`CPU architecture: ${cpuArchitecture}\n`);
    } catch {
        printError('Operation failed');
    }
};