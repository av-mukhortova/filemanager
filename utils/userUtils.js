export const getUserName = () => {
    const args = process.argv.slice(2);
    const nameArg = args.find(arg => arg.startsWith('--username='));
    if (!nameArg) return null;

    return nameArg.split('=')[1] || null;
};