export const format = (msg: string) => {
    if (msg.charAt(msg.length - 1) !== '.') return msg + '.';
    return msg;
};

export default format;