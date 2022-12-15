import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from "stream";
import { getFullPathToFile } from './getFullPath.js';
import path from 'path';

export const compress = (data) => {
  const path_to_file = data.split(' ')[1];
  const full_path_to_file = getFullPathToFile(data);
  const path_to_new_directory = data.split(' ')[2];
  const file_name = path_to_file.split('/').pop() + '.br';
  const full_path_to_new_file = path.join(path_to_new_directory, file_name);

  const zip = createBrotliCompress();
  const readStream = createReadStream(full_path_to_file);
  const writeStream = createWriteStream(full_path_to_new_file);

  pipeline(readStream, zip, writeStream, (error) => {
    if (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  });
};