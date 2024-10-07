import { dirname } from 'path';

export const handleNavCommand = async (cmd, args, dir) => {
    switch(cmd) {
        case 'up':
            goUp(dir);
            break;
        default:
            throw new Error('Invalid input');
    }
};

const goUp = (currentDir) => {
    const parentDir = dirname(currentDir);
    process.chdir(parentDir);
}