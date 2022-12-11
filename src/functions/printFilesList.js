import process from 'process';
import { readdir } from 'fs/promises';
import { File } from '../assets/file';


export const printFilesList = () => {
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
};