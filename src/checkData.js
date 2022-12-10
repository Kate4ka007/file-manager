import process from 'process';
import { readdir, rename } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { copyFile } from './functions/copyFile.js';
import goodBye from './functions/goodBye.js';

class File {
  constructor(name, type) {
    this.Name = name;
    this.Type = type;
  }
}

export const checkData = (data) => {
  if (data === ".exit") {
    goodBye();
  }
  if (data == 'up') {
    process.chdir('../');
  }
  if (data == 'ls') {
    const filesList = readdir(process.cwd(), { withFileTypes: true }).catch((error) => {
      throw new Error('ERROR_MESSAGE');
    }).then((data) => {
      let arr = [];
      for (let file of data) {
        if (file.isDirectory()) {
          arr.push(new File(file.name, "directory"));
        } else {
          arr.push(new File(file.name, "file"));
        }
      }
      console.table(arr);
    });
  }

  if (data.startsWith('cd')) {
    try {
      process.chdir(data.split(' ')[1]);
    } catch (error) {
      console.error('error: ', 'no such file in directory or wrong path');
    }

  }

  if (data.startsWith('cat')) {
    try {
      const readable = fs.createReadStream(data.split(' ')[1], 'utf-8');

      readable.on('data', (chunk) => {
        console.log(chunk.toString());
      });
    } catch (error) {
      console.error('error: ', 'no such file in directory or wrong path');
    }
  }

  if (data.startsWith('add')) {
    try {
      fs.writeFile(data.split(' ')[1], '', { flag: 'wx' }, (error) => {
        if (error) {
          console.log(error);
          throw new Error(ERROR_MESSAGE);
        }
      });

    } catch (error) {
      console.error('error: ', 'something went wrong');
    }
  }

  if (data.startsWith('rn')) {
    const pathOldFile = data.split(' ')[1];
    const newFileName = data.split(' ')[2];
    const pathToNewFile = pathOldFile.split('/');
    pathToNewFile.pop();
    let pathNewFile = path.join(pathToNewFile.join('/'), newFileName);
    rename(pathOldFile, pathNewFile)
      .catch((error) => {
        console.log(error);
        throw new Error('something went wrong');
      });
  }

  if (data.startsWith('cp')) {
    try {
      copyFile(data);

    } catch (error) {
      console.log(error);
      console.error('error: ', 'Something went wrong');
    }
  }

};