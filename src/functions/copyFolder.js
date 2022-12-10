import * as fs from "fs/promises";
import path from "path";

export const copyFolder = async (folder_path, folder_path) => {
  const filesList = await fs.readdir(folder_path);

  await fs.mkdir(folder_path).catch((error) => {
    throw new Error('Something went wrong');
  });

  for (let file of filesList) {
    const path_old_file = path.join(folder_path, file);
    const path_copy_file = path.join(folder_path, file);

    const files = await fs.readFile(path_old_file, "utf8").catch((error) => {
      console.log(error);
      throw new Error('Something went wrong');
    });

    await fs.writeFile(path_copy_file, files, { flag: 'wx' }).catch((error) => {
      console.log(error);
      throw new Error('Something went wrong');
    });;
  }
};