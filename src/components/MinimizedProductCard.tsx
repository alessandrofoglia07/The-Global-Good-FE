import { CartItem, ProductWithQuantity } from '@/types';
import React from 'react';
import LoadingImg from './LoadingImg';
import { toImgURL } from '@/utils/toImgURL';
import { FaMinus as MinusIcon } from 'react-icons/fa6';
import { SetterOrUpdater } from 'recoil';

interface Props {
    product: ProductWithQuantity;
    setProducts: React.Dispatch<React.SetStateAction<CartItem[]>> | SetterOrUpdater<CartItem[]>;
    handleUpdateCart: (product: ProductWithQuantity, quantity: number) => void;
}

const MinimizedProductCard: React.FC<Props> = ({ product, setProducts, handleUpdateCart }: Props) => {
    const handleRemove = () => {
        if (product.quantity === 1) {
            setProducts((prev) => prev.filter((item) => item.name !== product.name));
            handleUpdateCart(product, 0);
        } else {
            setProducts((prev) =>
                prev.map((item) => {
                    if (item.name === product.name) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
            );
            handleUpdateCart(product, product.quantity - 1);
        }
    };

    return (
        <>
            <LoadingImg src={toImgURL(product.img)} alt={product.name} containerClassName='w-2/3' className='h-full' />
            <div className='flex items-center gap-2'>
                <div className='flex h-full w-full flex-col justify-center px-2'>
                    <a href={`/shop/${product.collection}/${product.name}`} className='h-min text-lg font-bold tracking-tight'>
                        {product.name}
                    </a>
                    <p className='h-min tracking-tight text-gray-500'>$ {product.price}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <p className='text-lg font-bold tracking-tight'>x {product.quantity}</p>
                    <button aria-label='remove-from-cart-btn' onClick={handleRemove} className='rounded-full border-2 border-taupe/50 p-1 transition-colors hover:border-taupe'>
                        <MinusIcon />
                    </button>
                </div>
            </div>
        </>
    );
};

export default MinimizedProductCard;
