import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from "stream";
import { getFullPathToFile } from './getFullPath.js';
import path from 'path';

export const decompress = (data) => {
  const path_to_file = data.split(' ')[1];
  const full_path_to_file = getFullPathToFile(data);
  const path_to_new_directory = data.split(' ')[2];
  let file_name = path_to_file.split('/').pop();
  file_name = file_name.replace('.br', '');
  const full_path_to_new_file = path.join(path_to_new_directory, file_name);

  const unzip = createBrotliDecompress();
  const readStream = createReadStream(full_path_to_file);
  const writeStream = createWriteStream(full_path_to_new_file);

  pipeline(readStream, unzip, writeStream, (error) => {
    if (error) {
      console.log(error);
      console.error('Something went wrong');
    }
  });
};