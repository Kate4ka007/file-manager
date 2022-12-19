import os from "os";

export const getOsData = (data) => {
  const command = data.split(" ")[1];
  switch (command) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`amount of CPUS: ${cpus.length}`);
      cpus.forEach((item, ind) => {
        const speed = item.speed / 1000;
        console.log(
          `${ind + 1}: ${item.model}, ${Math.round(speed * 10) / 10} GHz`
        );
      });
      break;
    case "--homedir":
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    default:
      break;
  }
};
