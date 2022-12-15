import * as fs from 'fs/promises';

export const remove = async (path) => {
  await fs.unlink(path).catch((error) => {
    if (error) {
      console.log(error);
      console.error('Something went wrong when we try delete file');
    }
  });
};