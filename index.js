import process from 'process';
import { readdir } from 'fs/promises';
import fs from 'fs';
import { pipeline } from 'stream';
import path from 'path';

class File {
  constructor(name, type) {
    this.Name = name;
    this.Type = type;
  }
}


const app = () => {
  const args = process.argv.slice(2);
  const userName = args[0].split('=')[1];
  console.log(`Welcome to the File Manager, ${userName}!`);
  process.stdin.on('data', (data) => {
    data = data.toString().trim();
    if (data === ".exit") {
      console.log(`👋 Thank you for using File Manager, ${userName}, goodbye!`);
      console.log(`🎁 Merry Christmas and Happy New Year! 🎄`);
      process.exit();
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
          if (error) throw new Error(ERROR_MESSAGE);
        });

      } catch (error) {
        console.error('error: ', 'no such file in directory or wrong path');
      }
    }

    console.log(`👉 You are currently in ${process.cwd()}`);
  });

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    console.log(`🎁 Merry Christmas and Happy New Year! 🎄`);
    process.exit();
  });

};
app()

