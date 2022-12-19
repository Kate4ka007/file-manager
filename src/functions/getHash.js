import { createHash } from 'crypto';
import process from 'process';
import * as fs from 'fs';
import { getFullPathToFile } from './getFullPath.js';

export const getHash = (data) => {
  const full_path_to_file = getFullPathToFile(data);
  const sha256 = createHash('sha256');
  const readStream = fs.createReadStream(full_path_to_file, 'utf-8');
  readStream.pipe(sha256).setEncoding('hex').pipe(process.stdout);
  readStream.on('close', () => {
    process.stdout.write('\n');
  });
};