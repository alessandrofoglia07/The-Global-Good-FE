import React, { useEffect, useRef, useState } from 'react';
import Checkbox from './Checkbox';
import { Collection, collections } from '@/assets/data/collections';
import { Filters } from '@/types';
import countries from '@/assets/data/countries.json';
import { SetURLSearchParams } from 'react-router-dom';
import useWindowSize from '@/hooks/useWindowSize';
import { IoClose as XIcon } from 'react-icons/io5';

interface Props {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersSelector: React.FC<Props> = ({ searchParams, setSearchParams, filters, setFilters, setFiltersOpen }: Props) => {
    const rangeRef = useRef<HTMLInputElement>(null);

    const [priceLocal, setPriceLocal] = useState(filters.maxPrice);

    const [w] = useWindowSize();

    useEffect(() => {
        updateRangeInput();
    }, [filters.usePriceFilter]);

    useEffect(() => {
        setFilters(filters);
    }, [filters]);

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

        updateRangeInput();
        setPriceLocal(parseInt(rangeRef.current.value));
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('maxprice', rangeRef.current.value);
        setSearchParams(newParams.toString());

        const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
            let timeoutId: number;
            return (...args: T) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        };

        debounce(() => {
            setFilters((prev) => ({ ...prev, maxPrice: parseInt(rangeRef.current!.value) }));
        }, 500)();
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
        <>
            {w > 768 ? (
                <h2 className='select-none pb-4 text-xl font-extrabold uppercase tracking-tight text-darktan/90'>Filters</h2>
            ) : (
                <div className='flex h-min w-full items-center justify-between pb-4'>
                    <h2 className='select-none text-xl font-extrabold uppercase tracking-tight text-darktan/90'>Filters</h2>
                    <button onClick={() => setFiltersOpen((prev) => !prev)} className='grid place-items-center text-4xl text-darktan'>
                        <XIcon />
                    </button>
                </div>
            )}
            <ul className='space-y-8 [&>li>h3]:select-none [&>li>h3]:pb-2 [&>li>h3]:text-lg [&>li>h3]:font-bold [&>li>h3]:uppercase [&>li>h3]:text-darktan/80'>
                <li>
                    <h3>Collections</h3>
                    <div>
                        {collections.map((collection: Collection, i) => (
                            <button
                                key={i}
                                onClick={() => setCollection(collection)}
                                className='block pl-2 transition-colors hover:!text-taupe'
                                style={{ color: collection.title === filters.collection ? 'rgb(72 60 50 / 0.8)' : 'rgb(72 60 50 / 0.5)' }}>
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
                            value={priceLocal}
                            onChange={handleRangeInput}
                            disabled={!filters.usePriceFilter}
                            alt='Price range slider'
                            aria-label='price-range-slider'
                        />
                        <p style={{ color: filters.usePriceFilter ? '#D2B48C' : 'rgb(72 60 50 / 0.2)' }} className='select-none transition-colors'>
                            ${priceLocal}
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
                                <Checkbox checked={filters.countries.includes(country)} onChange={() => handleCountryChange(country)} label={country} id={`check-country-${i}`} />
                            </div>
                        ))}
                    </div>
                </li>
            </ul>
        </>
    );
};

export default FiltersSelector;
