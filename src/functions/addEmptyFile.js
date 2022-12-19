import fs from 'fs';
import { getFullPathToFile } from './getFullPath.js';

export const addEmptyFile = (data) => {
  const path_to_file = getFullPathToFile(data);
  fs.writeFile(path_to_file, '', { flag: 'wx' }, (error) => {
    if (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  });
};