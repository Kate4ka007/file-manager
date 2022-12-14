import { rename } from 'fs/promises';
import path from 'path';

export const renameFile = (data) => {
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
};