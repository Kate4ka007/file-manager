import * as fs from 'fs/promises';

export const remove = async (path) => {
  await fs.unlink(path, (error) => {
    if (error) throw new Error('Something went wrong when we try delete file');
  });

};