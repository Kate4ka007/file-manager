import process from 'process';
import { readdir, rename, readFile, writeFile } from 'fs/promises';
import fs from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import url from 'url';
// import { whatDirectoryIsFileIn } from './src/functions/common.js';

class File {
  constructor(name, type) {
    this.Name = name;
    this.Type = type;
  }
}


const app = () => {
  const args = process.argv.slice(2);
  const userName = () => args[0] ? args[0].split('=')[1] : 'Anonymous';
  console.log(`Welcome to the File Manager, ${userName()}!`);
  process.stdin.on('data', (data) => {
    data = data.toString().trim();
    if (data === ".exit") {
      console.log(`👋 Thank you for using File Manager, ${userName()}, goodbye!`);
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
        const path_to_file = data.split(' ')[1];
        const path_to_new_directory = data.split(' ')[2];
        const current_path = process.cwd();
        const full_path_to_file = path.join(current_path, path_to_file);
        const file_name = path_to_file.split('/').pop();
        const full_path_to_new_file = path.join(path_to_new_directory, file_name);

        /*         fs.writeFile(full_path_to_new_file, '', { flag: 'wx' }, (error) => {
                  if (error) {
                    console.log(error);
                    throw new Error('Something went wrong, maybe file already exists');
                  }
                }); */

        fs.open(full_path_to_new_file, 'r', (err, fd) => {
          if (err) {
            const readStream = fs.createReadStream(full_path_to_file, 'utf-8');
            const writable = fs.createWriteStream(full_path_to_new_file);
            let result = '';

            readStream.on('data', (chunk) => {
              result += chunk;
            });
            readStream.on('end', () => {
              writable.write(result);
            });
            readStream.on('error', (error) => {
              console.log(error);
              throw new Error('Something went wrong');
            });
          } else {
            console.log('file already exists');
          }
        });




      } catch (error) {
        console.log(error);
        console.error('error: ', 'Something went wrong');
      }
    }

    setTimeout(() => {
      console.log(`👉 You are currently in ${process.cwd()}`);
    }, 2000);

  });

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName()}, goodbye!`);
    console.log(`🎁 Merry Christmas and Happy New Year! 🎄`);
    process.exit();
  });

};
app()

