import path from 'path';
import process from 'process';

export const getFullPathToFile = (data) => {
  const path_to_file = data.split(' ')[1];
  if (path.isAbsolute(path_to_file)) {
    return path_to_file;
  } else {
    const current_path = process.cwd();
    const full_path_to_file = path.join(current_path, path_to_file);
    return full_path_to_file;
  }
};