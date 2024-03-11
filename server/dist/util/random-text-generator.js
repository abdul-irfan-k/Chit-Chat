export const generateRandomUUID = (length) => {
    const onlyLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array(length)
        .fill(null)
        .map(() => onlyLetters[Math.floor(Math.random() * onlyLetters.length)])
        .join("");
};
