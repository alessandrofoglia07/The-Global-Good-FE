export const toCollectionName = (collectionStr: string) => {
    return collectionStr
        .split('-')
        .map((word) => ' ' + word.charAt(0).toUpperCase() + word.slice(1) + ' ')
        .join('&');
};
