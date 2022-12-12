import path from "path";
import process from 'process';
import fs from 'fs';
import { remove } from "./remove.js";


export const copyFile = (data, flag = false) => {
  const path_to_file = data.split(' ')[1];
  const path_to_new_directory = data.split(' ')[2];
  const current_path = process.cwd();
  const full_path_to_file = path.join(current_path, path_to_file);
  const file_name = path_to_file.split('/').pop();
  const full_path_to_new_file = path.join(path_to_new_directory, file_name);

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
        if (flag) {
          remove(full_path_to_file);
        }
      });
      readStream.on('error', (error) => {
        console.log(error);
        throw new Error('Something went wrong');
      });
    } else {
      console.log('file already exists');
    }
  });
};