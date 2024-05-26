import { Product } from '@/types';

export const getProductImgUrl = (product: Product) => {
    return `/product-imgs/${product.img}`;
};

export default getProductImgUrl;
