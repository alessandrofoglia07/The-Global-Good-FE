function isValidHttpUrl(str: string) {
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
}

export const toImgURL = (img: string, general: boolean = false) => {
    if (general) {
        if (isValidHttpUrl(img)) {
            return img;
        }
        if (import.meta.env.PROD) {
            return `/product-imgs/${img}`;
        } else {
            return `${import.meta.env.VITE_PROD_BASE_URL}/product-imgs/${img}`;
        }
    }
    if (import.meta.env.PROD) {
        return `/product-imgs/${img}`;
    } else {
        return `${import.meta.env.VITE_PROD_BASE_URL}/product-imgs/${img}`;
    }
};
