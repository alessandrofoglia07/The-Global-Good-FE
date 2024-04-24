export const shuffle = (arr: unknown[]) => {
    let currIdx = arr.length;
    while (currIdx != 0) {
        const randIdx = Math.floor(Math.random() * currIdx);
        currIdx--;
        [arr[currIdx], arr[randIdx]] = [arr[randIdx], arr[currIdx]];
    }
};

export default shuffle;