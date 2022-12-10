export const whatDirectoryIsFileIn = (path) => {
  const arr = path.split('/');
  if (arr.length === 1) {
    return '';
  } else {
    arr.pop();
    return arr.join('/');
  }
};