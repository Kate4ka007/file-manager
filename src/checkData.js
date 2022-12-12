import process from 'process';
import fs from 'fs';
import { copyFile } from './functions/copyFile.js';
import goodBye from './functions/goodBye.js';
import { renameFile } from './functions/renameFile.js';
import { addEmptyFile } from './functions/addEmptyFile.js';
import { printFilesList } from './functions/printFilesList.js';
import { moveFile } from './functions/moveFile.js';
import { remove } from './functions/remove.js';
import path from 'path';

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

    try {
      const path_to_file = data.split(' ')[1];
      const current_path = process.cwd();
      const full_path_to_file = path.join(current_path, path_to_file);
      remove(full_path_to_file);
    } catch (error) {
      console.log(error);
      console.error('error: ', 'Something went wrong');
    }

  }
};
