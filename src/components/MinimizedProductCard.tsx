import { CartItem, ProductWithQuantity } from '@/types';
import React from 'react';
import { toImgURL } from '@/utils/toImgURL';
import { FaMinus as MinusIcon, FaPlus as PlusIcon } from 'react-icons/fa6';
import { SetterOrUpdater } from 'recoil';

interface Props {
    product: ProductWithQuantity;
    setProducts: React.Dispatch<React.SetStateAction<CartItem[]>> | SetterOrUpdater<CartItem[]>;
    handleUpdateCart: (product: ProductWithQuantity, quantity: number) => void;
    suggested?: boolean;
    addProduct?: (product: ProductWithQuantity) => void;
}

const MinimizedProductCard: React.FC<Props> = ({ product, setProducts, handleUpdateCart, suggested, addProduct }: Props) => {
    const handleButtonClick = () => {
        if (suggested) return addProduct && addProduct(product);
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
            <a href={`/shop/${product.collection}/${product.name}`} className='w-2/3'>
                <img src={toImgURL(product.img)} alt={product.name} className='w-full' />
            </a>
            <div className='flex items-center gap-2'>
                <div className='flex h-full w-full flex-col justify-center px-2'>
                    <a href={`/shop/${product.collection}/${product.name}`} className='h-min text-lg font-bold tracking-tight'>
                        {product.name}
                    </a>
                    <p className='h-min tracking-tight text-gray-500'>$ {product.price}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    {!suggested && <p className='whitespace-nowrap text-lg font-bold tracking-tight'>✗ {product.quantity}</p>}
                    <button aria-label='remove-from-cart-btn' onClick={handleButtonClick} className='rounded-full border-2 border-taupe/50 p-1 transition-colors hover:border-taupe'>
                        {suggested ? <PlusIcon /> : <MinusIcon />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default MinimizedProductCard;
