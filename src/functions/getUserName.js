const args = process.argv.slice(2);
export const userName = () => args[0] ? args[0].split('=')[1] : 'Anonymous';