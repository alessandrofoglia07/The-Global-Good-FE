export const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    let timeoutId: number;
    return (...args: T) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
