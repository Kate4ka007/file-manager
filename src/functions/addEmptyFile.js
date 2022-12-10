import fs from 'fs';

export const addEmptyFile = (data) => {
  fs.writeFile(data.split(' ')[1], '', { flag: 'wx' }, (error) => {
    if (error) {
      console.log(error);
      throw new Error('Something went wrong');
    }
  });
};