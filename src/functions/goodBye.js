import { userName } from "./getUserName.js";

const goodBye = () => {
  console.log(`👋 Thank you for using File Manager, ${userName()}, goodbye!`);
  console.log(`🎁 Merry Christmas and Happy New Year! 🎄`);
  process.exit();
};

export default goodBye;