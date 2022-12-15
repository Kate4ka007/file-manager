import { copyFile } from "./copyFile.js";
import { remove } from "./remove.js";
import { getFullPathToFile } from './getFullPath.js';

export const moveFile = (data) => {
  copyFile(data);
  const full_path_to_file = getFullPathToFile(data);
  remove(full_path_to_file);
};