import React from 'react';
import { Product } from '@/types';
import { toImgURL } from '@/utils/toImgURL';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }: Props) => {
    return (
        <div className='flex h-max w-full max-w-96 flex-col items-center rounded-lg p-6'>
            <a href={`/shop/${product.collection}/${product.name}`}>
                <img draggable='false' src={toImgURL(product.img)} alt={product.name} className='aspect-square h-64 rounded-t-lg object-contain' />
            </a>
            <a href={`/shop/${product.collection}/${product.name}`} className='self-start text-left text-lg font-bold tracking-tight text-taupe/80'>
                {product.name}
            </a>
            <h3 className='w-full text-left tracking-tight text-taupe/40'>
                {product.collection
                    .split('-')
                    .map((word) => ' ' + word.charAt(0).toUpperCase() + word.slice(1) + ' ')
                    .join('&')}
            </h3>
            <h3 className='mt-1 flex w-full items-center justify-between'>
                <span className='font-semibold text-taupe/80'>{product.countryOfOrigin}</span>
                <span className='text-lg font-bold text-taupe/80'>${product.price}</span>
            </h3>
        </div>
    );
};

export default ProductCard;
