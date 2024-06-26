import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { Product } from '@/types';
import { toImgURL } from '@/utils/toImgURL';
import { toCollectionName } from '@/utils/toCollectionName';
import { Dialog } from '@headlessui/react';
import useDebounce from '@/hooks/useDebounce';

interface Props {
    open: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<Props> = ({ open, onClose }) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    const debouncedSearch = useDebounce(search, 300);

    const fetchProducts = async (q: string) => {
        try {
            if (!q) return setProducts([]);
            const res = await axios.get(`/products/search?q=${q}`);
            setProducts(res.data.products.slice(0, 4));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts(debouncedSearch);
    }, [debouncedSearch]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <div className='fixed inset-0 z-[60] bg-black/25' />
            <Dialog.Panel className='animate-zoom-in-center fixed left-1/2 top-1/2 z-[61] max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-neutral-50 p-8 sm:w-[80vw] md:w-[60vw] lg:w-[50vw]'>
                <input
                    type='text'
                    placeholder='Type your search...'
                    spellCheck='false'
                    value={search}
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-100 p-2 text-taupe shadow-sm focus:outline-none'
                />
                {products.length > 0 && (
                    <div className='mt-4 flex h-full w-full flex-col items-center space-y-4'>
                        {products.map((product) => (
                            <div key={product.name} className='flex min-h-28 w-full items-center gap-8 rounded-lg border border-gray-100 bg-white py-4 shadow-sm md:px-8 -md:flex-col'>
                                <a href={`/shop/${product.collection}/${product.name}`} className='grid w-full place-items-center md:w-2/5 lg:w-1/4'>
                                    <img src={toImgURL(product.img)} alt={product.name} className='max-h-32 md:max-h-24' />
                                </a>
                                <div className='flex h-full w-full flex-col justify-center px-4 md:w-3/5 md:px-2 lg:w-3/4'>
                                    <p className='h-min text-sm text-gray-500'>{toCollectionName(product.collection)}</p>
                                    <a href={`/shop/${product.collection}/${product.name}`} className='h-min w-max max-w-[80%] text-lg font-bold tracking-tight'>
                                        {product.name}
                                    </a>
                                    <p className='h-min tracking-tight text-gray-500'>$ {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Dialog.Panel>
        </Dialog>
    );
};

export default SearchModal;
