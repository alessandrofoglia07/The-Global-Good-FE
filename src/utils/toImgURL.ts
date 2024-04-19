export const toImgURL = (img: string) => {
    if (import.meta.env.PROD) {
        return `product-imgs/${img}`;
    } else {
        return `${import.meta.env.VITE_PROD_BASE_URL}/product-imgs/${img}`;
    }
};