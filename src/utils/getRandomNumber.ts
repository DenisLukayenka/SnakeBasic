export const getRandomNumber = (maxValue: number): number => {
    if (maxValue === 0) {
        return -1;
    }

    return Math.floor(Math.random() * maxValue);
}