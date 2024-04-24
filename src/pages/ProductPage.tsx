import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/api/axios';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import { toCollectionName } from '@/utils/toCollectionName';
import useWindowSize from '@/hooks/useWindowSize';
import { toImgURL } from '@/utils/toImgURL';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import shuffle from '@/utils/shuffleArr';

const ProductPage: React.FC = () => {
    const { collection, name } = useParams<{ collection: string; name: string }>();
    const [w] = useWindowSize();

    const [product, setProduct] = useState<undefined | Product>(undefined);
    const [moreFromCollection, setMoreFromCollection] = useState<undefined | Product[]>(undefined);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/product/${collection}/${name}`);
            setProduct(res.data.product);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMoreFromCollection = async () => {
        try {
            const res = await axios.get(`/products?collection=${collection}&limit=5`);
            const filtered = res.data.products.filter((product: Product) => product.name !== name);
            shuffle(filtered);
            setMoreFromCollection(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchMoreFromCollection();
    }, []);

    return (
        <div id='ProductPage'>
            <Navbar />
            <div className='h-16 w-full' />
            <h4 className='mt-8 w-full px-8 font-semibold capitalize text-taupe/60'>
                {w > 768 ? <a href='/shop'>Shop {'>'}</a> : ''}{' '}
                <a href={`/shop?collection=${product?.collection || collection}`}>{product?.collection ? toCollectionName(product.collection) : toCollectionName(collection || '')}</a>{' '}
                {'>'} {product?.name || name}
            </h4>
            <main className='w-full md:px-[8%]'>
                <div className='grid w-full grid-cols-1 py-8 md:grid-cols-2 md:grid-rows-2 md:space-x-16 md:px-[8%] md:py-16 lg:grid-rows-1'>
                    <div>
                        {product ? (
                            <img
                                draggable={false}
                                src={toImgURL(product.img)}
                                alt={product.name}
                                className='max-h-[40vh] w-full object-contain md:max-h-[calc((100vh-5rem-4rem-2rem-2rem)*8/10)]'
                            />
                        ) : (
                            <div className='h-[calc((100vh-5rem-4rem-2rem-2rem)*8/10)] w-full animate-pulse rounded-lg bg-taupe/10' />
                        )}
                    </div>
                    <div className='px-6 pt-8 -md:col-start-1 -md:col-end-3 -md:row-start-2'>
                        <div className='w-full max-w-[35rem]'>
                            <section>
                                {product ? (
                                    <>
                                        <h1 className='mb-4 border-b-2 pb-2 text-4xl font-bold tracking-tight'>{product.name}</h1>
                                        <h2 className='text-xl font-semibold'>$ {product.price}</h2>
                                        <div className='mb-8 mt-4 flex flex-col gap-4'>
                                            <button className='w-full rounded-md bg-darktan px-4 py-3 font-bold uppercase tracking-wide text-white'>Add to Cart</button>
                                            <p className='text-lg text-taupe/60'>
                                                {product.availability > 100 ? (
                                                    <span className='select-none rounded-md bg-green-400 px-3 py-2 font-bold text-white'>Available ✓</span>
                                                ) : product.availability < 100 && product.availability > 0 ? (
                                                    <span className='select-none rounded-md bg-yellow-400 px-3 py-2 font-bold text-white'>Limited Stock ⚠</span>
                                                ) : (
                                                    <span className='select-none rounded-md bg-red-400 px-3 py-2 font-bold text-white'>Out of Stock ✗</span>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='mb-4 h-8 w-2/3 animate-pulse rounded-md bg-taupe/10' />
                                        <div className='mb-4 h-8 w-24 animate-pulse rounded-md bg-taupe/10' />
                                        <button disabled className='mb-4 w-full rounded-md bg-taupe/10 px-4 py-3 font-bold uppercase tracking-wide text-white'>
                                            Add to Cart
                                        </button>
                                        <div className='mb-4 h-8 w-1/2 animate-pulse rounded-md bg-taupe/10' />
                                    </>
                                )}
                            </section>
                            {product && w > 1024 && (
                                <div>
                                    <h2 className='py-1 text-xl font-semibold tracking-tight text-taupe/80'>{toCollectionName(product.collection)}</h2>
                                    <p className='text-lg text-taupe/60'>{product.description}</p>
                                    <section className='mt-8'>
                                        <h4 className='pb-2 pt-4 text-xl font-semibold text-taupe/80'>
                                            From{' '}
                                            <a href={`/shop?country=${product.countryOfOrigin}`} className='rounded-full bg-tan px-3 py-1'>
                                                {product.countryOfOrigin}
                                            </a>
                                        </h4>
                                        <h4 className='pb-4 pt-2 text-xl font-semibold text-taupe/80'>
                                            Made of{' '}
                                            {product.materials.map((material, i) => (
                                                <span key={i} className='mr-2 rounded-full bg-tan px-3 py-1'>
                                                    {material}
                                                </span>
                                            ))}
                                        </h4>
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>
                    {product && w <= 1024 && (
                        <div className='col-start-1 col-end-3 -md:px-6'>
                            <h2 className='py-1 text-xl font-semibold tracking-tight text-taupe/80'>{toCollectionName(product.collection)}</h2>
                            <p className='text-lg text-taupe/60'>{product.description}</p>
                            <section className='mt-8'>
                                <h4 className='pb-2 pt-4 text-xl font-semibold text-taupe/80'>
                                    From{' '}
                                    <a href={`/shop?country=${product.countryOfOrigin}`} className='rounded-full bg-tan px-3 py-1'>
                                        {product.countryOfOrigin}
                                    </a>
                                </h4>
                                <h4 className='pt-2 text-xl font-semibold text-taupe/80'>
                                    Made of{' '}
                                    {product.materials.map((material, i) => (
                                        <span key={i} className='mr-2 rounded-full bg-tan px-3 pt-1'>
                                            {material}
                                        </span>
                                    ))}
                                </h4>
                            </section>
                        </div>
                    )}
                </div>
                <div className='h-px w-full bg-taupe/20' />
                <div className='w-full py-8'>
                    <h2 className='w-full px-8 text-center text-3xl font-bold text-taupe/80'>
                        More from {product?.collection ? toCollectionName(product.collection) : toCollectionName(collection || '')}
                    </h2>
                    <div className='grid place-items-center gap-8 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4'>
                        {moreFromCollection ? (
                            (w > 768 ? moreFromCollection : moreFromCollection.slice(0, 2)).map((product) => <ProductCard key={product.name} product={product} />)
                        ) : (
                            <div className='h-[40vh] w-full animate-pulse rounded-lg bg-taupe/10' />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductPage;