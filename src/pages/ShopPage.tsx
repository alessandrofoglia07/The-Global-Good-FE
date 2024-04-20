import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { collections } from '@/assets/data/collections';
import { useSearchParams } from 'react-router-dom';
import { Filters, Product } from '@/types';
import FiltersSelector from '@/components/FiltersSelector';
import axios from '@/api/axios';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

const ShopPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<Filters>({
        collection: collections.find((collection) => collection.id === searchParams.get('collection'))?.title || null,
        maxPrice: parseInt(searchParams.get('maxprice') || '50'),
        usePriceFilter: searchParams.get('maxprice') !== null,
        availability: searchParams.get('availability') === 'in-stock' ? 'in-stock' : null,
        countries: searchParams.get('country')?.split(' ') || []
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);

    const fetchProducts = async (params: URLSearchParams) => {
        const res = await axios.get('/products', { params });
        setProducts(res.data.products);
    };

    useEffect(() => {
        console.log('fetching products');

        const queryParams = new URLSearchParams();
        if (filters.collection) queryParams.set('collection', collections.find((collection) => collection.title === filters.collection)?.id || '');
        if (filters.usePriceFilter) queryParams.set('maxPrice', filters.maxPrice.toString());
        if (filters.availability) queryParams.set('availability', 'true');
        if (filters.countries.length) queryParams.set('countries', filters.countries.join(','));

        fetchProducts(queryParams);
    }, [filters.availability, filters.collection, filters.countries, filters.maxPrice, filters.usePriceFilter]);

    useEffect(() => {
        const disableFilterOpen = () => window.innerWidth > 768 && setFilterOpen(false);
        document.addEventListener('resize', disableFilterOpen);
        return () => document.removeEventListener('resize', disableFilterOpen);
    }, []);

    return (
        <div id='ShopPage' className='w-screen'>
            <Navbar />
            <div className='h-16 w-full' />
            <h3 className='mt-8 w-full text-center text-3xl font-semibold capitalize text-taupe'>Shop</h3>
            <h1 className='mb-16 mt-4 w-full text-center text-5xl font-extrabold capitalize tracking-tight text-taupe'>{filters.collection || 'All products'}</h1>
            <div className='relative left-1/2 flex h-max w-screen max-w-7xl -translate-x-1/2 grid-cols-4 flex-col md:grid'>
                {!filterOpen && (
                    <aside className='col-span-1 px-4 md:pb-32 -md:hidden'>
                        <FiltersSelector searchParams={searchParams} setSearchParams={setSearchParams} filters={filters} setFilters={setFilters} setFiltersOpen={setFilterOpen} />
                    </aside>
                )}
                <div className='w-full md:hidden'>
                    <button onClick={() => setFilterOpen((prev) => !prev)} className='w-1/2 rounded-md border-2 border-taupe/30 bg-tan/30 px-6 py-4 text-xl font-bold text-taupe'>
                        Filter
                    </button>
                </div>
                <main className='col-span-3 px-4 pb-32 -md:mt-16'>
                    <ul className='grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {products.map((product: Product, i) => (
                            <ProductCard product={product} key={i} />
                        ))}
                    </ul>
                </main>
            </div>
            <Footer />
            {filterOpen && (
                <aside className='animate-slide-in fixed top-0 h-screen w-full bg-slate-100 px-8 pt-20'>
                    <FiltersSelector searchParams={searchParams} setSearchParams={setSearchParams} filters={filters} setFilters={setFilters} setFiltersOpen={setFilterOpen} />
                </aside>
            )}
        </div>
    );
};

export default ShopPage;
