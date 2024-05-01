import React, { useState } from 'react';
import axios from '@/api/axios';
import { Product } from '@/types';
import { toImgURL } from '@/utils/toImgURL';
import { toCollectionName } from '@/utils/toCollectionName';

interface Props {
    open: boolean;
    onClose: () => void;
}

// Fix scrolling
const SearchModal: React.FC<Props> = ({ open, onClose }) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async (val?: string) => {
        try {
            if (!val && search) return setProducts([]);
            const res = await axios.get(`/products/search?q=${val || search}`);
            setProducts(res.data.products.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        fetchProducts(e.target.value);
    };

    if (!open) return null;

    return (
        <>
            <div className='animate-fade-in fixed left-0 top-0 z-50 h-full w-full bg-black/20' onClick={onClose} />
            <div className='animate-zoom-in-center fixed left-1/2 top-1/2 z-[60] max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-neutral-50 p-8 sm:w-[80vw] md:w-[50vw] lg:w-[40vw]'>
                <input
                    type='text'
                    placeholder='Type your search...'
                    spellCheck='false'
                    value={search}
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-100 p-2 text-taupe shadow-sm focus:outline-none'
                />
                <div className='mt-4 flex h-full w-full flex-col items-center space-y-4'>
                    {products.map((product) => (
                        <div key={product.name} className='flex min-h-28 w-full items-center gap-8 rounded-lg border border-gray-100 bg-white px-8 py-4 shadow-sm'>
                            <a className='grid w-2/5 place-items-center lg:w-1/4'>
                                <img src={toImgURL(product.img)} alt={product.name} className='max-h-24' />
                            </a>
                            <div className='flex h-full w-3/5 flex-col justify-center px-2 lg:w-3/4'>
                                <p className='h-min text-sm text-gray-500'>{toCollectionName(product.collection)}</p>
                                <a href={`/shop/${product.collection}/${product.name}`} className='h-min w-max max-w-[80%] text-lg font-bold tracking-tight'>
                                    {product.name}
                                </a>
                                <p className='h-min tracking-tight text-gray-500'>$ {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchModal;
