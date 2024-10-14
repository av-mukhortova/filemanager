import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'path';
import { printError } from './errorHandler.js';

export const handleHashCommand = async (args, dir) => {
    try {
        const [fileToCalculate] = args;
        const filePathToCalculate = join(dir, fileToCalculate);

        const readStream = createReadStream(filePathToCalculate);
        const hash = createHash('sha256');

        readStream.pipe(hash).on('finish', () => {
            console.log(`SHA256 hash of file: ${hash.digest('hex')}` );
        });
    } catch {
        printError('Operation failed');
    }
};