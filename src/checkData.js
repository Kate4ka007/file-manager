import process from 'process';
import fs from 'fs';
import { copyFile } from './functions/copyFile.js';
import goodBye from './functions/goodBye.js';
import { renameFile } from './functions/renameFile.js';
import { addEmptyFile } from './functions/addEmptyFile.js';
import { printFilesList } from './functions/printFilesList.js';
import { remove } from './functions/remove.js';
import path from 'path';
import { getOsData } from './functions/getOsDate.js';
import { getHash } from './functions/getHash.js';
import { getFullPathToFile } from './functions/getFullPath.js';
import { compress } from './functions/compressFile.js';
import { decompress } from './functions/decompressFile.js';

export const checkData = (data) => {

  if (data === '.exit') {

    goodBye();

  } else if (data == 'up') {

    process.chdir('../');

  } else if (data == 'ls') {

    printFilesList();

  } else if (data.startsWith('cd')) {

    try {
      process.chdir(data.split(' ')[1]);
    } catch (error) {
      console.error('error: ', 'no such file in directory or wrong path');
    }

  } else if (data.startsWith('cat')) {

    try {
      const readable = fs.createReadStream(data.split(' ')[1], 'utf-8');
      readable.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    } catch (error) {
      console.error('error: ', 'no such file in directory or wrong path');
    }

  } else if (data.startsWith('add')) {

    try {
      addEmptyFile(data);
    } catch (error) {
      console.error('error: ', 'something went wrong');
    }

  } else if (data.startsWith('rn')) {

    renameFile(data);

  } else if (data.startsWith('cp')) {

    try {
      copyFile(data);
    } catch (error) {
      console.log(error);
      console.error('error: ', 'Something went wrong');
    }

  } else if (data.startsWith('mv')) {

    try {
      copyFile(data, true);
    } catch (error) {
      console.log(error);
      console.error('error: ', 'Something went wrong');
    }

  } else if (data.startsWith('rm')) {
    remove(getFullPathToFile(data));
  } else if (data.startsWith('os')) {

    getOsData(data);

  } else if (data.startsWith('hash')) {

    getHash(data);

  } else if (data.startsWith('compress')) {

    compress(data);

  } else if (data.startsWith('decompress')) {

    decompress(data);

  }
};
