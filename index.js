import process from 'process';
import fs from 'fs';
import { pipeline } from 'stream';


const app = () => {
  const args = process.argv.slice(2);
  const userName = args[0].split('=')[1];
  console.log(`Welcome to the File Manager, ${userName}!`);
  process.stdin.on('data', (data) => {
    data = data.toString().trim();
    if (data === ".exit") {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      process.exit();
    }



  });

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
  });

};
app()

