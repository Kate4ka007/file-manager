import { copyFile } from "./copyFile.js";
import { remove } from "./remove.js";
import path from 'path';

export const moveFile = (data) => {
  copyFile(data);
  const path_to_file = data.split(' ')[1];
  const current_path = process.cwd();
  const full_path_to_file = path.join(current_path, path_to_file);

  remove(full_path_to_file);
};