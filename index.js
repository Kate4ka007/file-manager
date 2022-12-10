import process from 'process';
import { checkData } from './src/checkData.js';
import { userName } from './src/functions/getUserName.js';
import goodBye from './src/functions/goodBye.js';


const app = () => {

  console.log(`Welcome to the File Manager, ${userName()}!`);
  process.stdin.on('data', (data) => {
    data = data.toString().trim();
    checkData(data);

    setTimeout(() => {
      console.log(`👉 You are currently in ${process.cwd()}`);
    }, 2000);

  });

  process.on('SIGINT', () => {
    goodBye();
  });

};
app()

