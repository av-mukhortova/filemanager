import { join } from 'path';
import { createGzip, createGunzip  } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline} from 'stream/promises';
import { printError } from './errorHandler.js';

export const handleZipCommand = async (cmd, args, dir) => {
    switch (cmd) {
        case 'compress':
            await compressFile(args, dir);
            break;
        case 'decompress':
            await decompressFile(args, dir);
            break;
        default:
            printError();
    }
};

const compressFile = async (args, dir) => {
    const [fileToCompress, compressedFile] = args;
    const fileToCompressPath = join(dir, fileToCompress);
    const compressedFilePath = join(dir, compressedFile);

    const gzip = createGzip();
    const source = createReadStream(fileToCompressPath);
    const destination = createWriteStream(compressedFilePath);

    await pipeline(source, gzip, destination);
};

const decompressFile = async (args, dir) => {
    const [fileToDecompress, decompressedFile] = args;
    const fileToDecompressPath = join(dir, fileToDecompress);
    const decompressedFilePath = join(dir, decompressedFile);

    const gzip = createGunzip();
    const source = createReadStream(fileToDecompressPath);
    const destination = createWriteStream(decompressedFilePath);

    await pipeline(source, gzip, destination);
};
