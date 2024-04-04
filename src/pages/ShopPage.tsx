import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import { collections, Collection } from '@/assets/data/collections';
import { useSearchParams } from 'react-router-dom';
import Checkbox from '@/components/Checkbox';
import { countries } from '@/assets/data/countries';

interface Filters {
    collection: string | null;
    usePriceFilter: boolean;
    maxPrice: number;
    availability: 'in-stock' | null;
    countries: string[];
}

const ShopPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<Filters>({
        collection: collections.find((collection) => collection.id === searchParams.get('collection'))?.title || null,
        maxPrice: parseInt(searchParams.get('maxprice') || '250'),
        usePriceFilter: searchParams.get('maxprice') !== null,
        availability: searchParams.get('availability') === 'in-stock' ? 'in-stock' : null,
        countries: searchParams.get('country')?.split(' ') || []
    });

    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateRangeInput();
    }, [filters.usePriceFilter]);

    const setCollection = (collection: Collection) => {
        if (collection.title === filters.collection) {
            setFilters((prev) => ({ ...prev, collection: null }));
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete('collection');
            setSearchParams(newParams.toString());
        } else {
            setFilters((prev) => ({ ...prev, collection: collection.title }));
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('collection', collection.id);
            setSearchParams(newParams.toString());
        }
    };

    const handlePriceCheck = () => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (filters.usePriceFilter) {
            newParams.delete('maxprice');
        } else {
            newParams.set('maxprice', filters.maxPrice.toString());
        }
        setSearchParams(newParams.toString());

        setFilters((prev) => ({ ...prev, usePriceFilter: !prev.usePriceFilter }));
    };

    const updateRangeInput = () => {
        if (!rangeRef.current) return;
        if (!filters.usePriceFilter) {
            rangeRef.current.style.background = 'rgb(72 60 50 / 0.2)';
            rangeRef.current.style.accentColor = 'rgb(72 60 50 / 0.2)';
            return;
        }
        const rangeValue = parseInt(rangeRef.current.value) / 5;
        rangeRef.current.style.accentColor = '#D2B48C';
        rangeRef.current.style.background = 'linear-gradient(to right, #D2B48C 0%, #D2B48C ' + rangeValue + '%, rgb(72 60 50 / 0.2) ' + rangeValue + '%, rgb(72 60 50 / 0.2) 100%)';
    };

    const handleRangeInput = (e: React.ChangeEvent) => {
        if (!rangeRef.current) {
            handleRangeInput(e);
            return;
        }
        setFilters((prev) => ({ ...prev, maxPrice: parseInt(rangeRef.current!.value) }));
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('maxprice', rangeRef.current.value);
        setSearchParams(newParams.toString());
        updateRangeInput();
    };

    const handleAvailabilityChange = () => {
        setFilters((prev) => ({ ...prev, availability: prev.availability === 'in-stock' ? null : 'in-stock' }));

        const newParams = new URLSearchParams(searchParams.toString());
        if (filters.availability === 'in-stock') {
            newParams.delete('availability');
        } else {
            newParams.set('availability', 'in-stock');
        }
        setSearchParams(newParams.toString());
    };

    const handleCountryChange = (country: string) => {
        if (filters.countries.includes(country)) {
            setFilters((prev) => ({ ...prev, countries: prev.countries.filter((c) => c !== country) }));

            // If there is only one country left, remove the country query parameter
            if (filters.countries.length === 1) {
                setFilters((prev) => ({ ...prev, countries: [] }));
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.delete('country');
                setSearchParams(newParams.toString());
            } else {
                const newParams = new URLSearchParams(searchParams.toString());
                newParams.set('country', filters.countries.filter((c) => c !== country).join(' '));
                setSearchParams(newParams.toString());
            }
        } else {
            setFilters((prev) => ({ ...prev, countries: [...prev.countries, country] }));

            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set('country', [...filters.countries, country].join(' '));
            setSearchParams(newParams.toString());
        }
    };

    return (
        <div id='ShopPage' className='w-screen'>
            <Navbar />
            <h1 className='mb-16 mt-32 w-full text-center text-5xl font-extrabold capitalize tracking-tight text-taupe'>{filters.collection || 'All products'}</h1>
            <div className='relative left-1/2 grid max-h-screen w-screen max-w-6xl -translate-x-1/2 grid-cols-4'>
                <aside className='col-span-1'>
                    <h2 className='select-none pb-4 text-xl font-extrabold uppercase tracking-tight text-tan/80'>Filters</h2>
                    <ul className='space-y-8 [&>li>h3]:select-none [&>li>h3]:pb-2 [&>li>h3]:text-lg [&>li>h3]:font-bold [&>li>h3]:uppercase [&>li>h3]:text-tan/70'>
                        <li>
                            <h3>Collections</h3>
                            <div>
                                {collections.map((collection: Collection, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCollection(collection)}
                                        className='block pl-2 transition-colors hover:!text-taupe'
                                        style={{ color: collection.title === filters.collection ? 'rgb(72 60 50)' : 'rgb(72 60 50 / 0.5)' }}>
                                        {collection.title}
                                    </button>
                                ))}
                            </div>
                        </li>
                        <li>
                            <h3 className='inline-flex'>
                                Price{' '}
                                <span>
                                    <Checkbox id='price-check' ariaLabel='use-price-filter-checkbox' label='' checked={filters.usePriceFilter} onChange={handlePriceCheck} />
                                </span>
                            </h3>
                            <div>
                                <input
                                    type='range'
                                    min={0}
                                    max={500}
                                    step={5}
                                    className='h-1 w-full cursor-pointer appearance-none rounded-xl accent-tan'
                                    ref={rangeRef}
                                    value={filters.maxPrice}
                                    onChange={handleRangeInput}
                                    disabled={!filters.usePriceFilter}
                                    alt='Price range slider'
                                    aria-label='price-range-slider'
                                />
                                <p style={{ color: filters.usePriceFilter ? '#D2B48C' : 'rgb(72 60 50 / 0.2)' }} className='transition-colors'>
                                    ${filters.maxPrice}
                                </p>
                            </div>
                        </li>
                        <li>
                            <h3>Availability</h3>
                            <div>
                                <Checkbox checked={filters.availability === 'in-stock'} onChange={handleAvailabilityChange} label='In stock' id='in-stock-check' />
                            </div>
                        </li>
                        <li>
                            <h3>Country of origin</h3>
                            <div>
                                {countries.map((country, i) => (
                                    <div key={i}>
                                        <Checkbox
                                            checked={filters.countries.includes(country)}
                                            onChange={() => handleCountryChange(country)}
                                            label={country}
                                            id={`check-country-${i}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </li>
                    </ul>
                </aside>
                <main className='col-span-3 overflow-auto'>Main</main>
            </div>
        </div>
    );
};

export default ShopPage;
