import React from 'react';
import { Product } from '@/types';
import { toImgURL } from '@/utils/toImgURL';

// {
//     name: string;
//     description: string;
//     img: string;
//     collection: Collection;
//     price: number;
//     countryOfOrigin: string;
//     materials: string[];
//     availability: number;
// }

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
    return (
        <div className='flex h-max w-full flex-col items-center rounded-lg bg-tan/10 p-8 shadow-md'>
            <img src={toImgURL(product.img)} alt={product.name} className='aspect-square h-64 rounded-t-lg object-cover' />
            <h2 className='mt-4 w-full text-left text-lg font-bold tracking-tight text-taupe/80'>{product.name}</h2>
        </div>
    );
};

export default ProductCard;
