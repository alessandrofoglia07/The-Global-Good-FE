/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import collections from '@/assets/data/collections';
import { useSearchParams } from 'react-router-dom';
import Checkbox from '@/components/Checkbox';

const materials = ['cotton', 'leather', 'metal', 'polyester', 'rubber', 'steel', 'wood'];
const countries = ['usa', 'canada', 'mexico', 'uk', 'france', 'germany', 'italy', 'japan', 'china', 'india', 'brazil']; // TODO: Change based on actual data

// Search params: ?collection=clothing-accessories+home-living&maxprice=750&material=cotton+leather&availability=in-stock&country=usa
const ShopPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCollection, setSelectedCollection] = useState<string | null>(searchParams.get('collection')); // Default collection is all
    const [maxPrice, setMaxPrice] = useState<number>(parseInt(searchParams.get('maxprice') || '250')); // Default max price is $500
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>(searchParams.get('material')?.split(' ') || []); // Default material is all
    const [availability, setAvailability] = useState<'in-stock' | null>(searchParams.get('availability') === 'in-stock' ? 'in-stock' : null); // Default availability is all
    const [selectedCountries, setSelectedCountries] = useState<string[]>(searchParams.get('country')?.split(' ') || []); // Default country is all
    const [usePriceFilter, setUsePriceFilter] = useState<boolean>(searchParams.get('maxprice') !== null); // Default price filter is off

    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        updateRangeInput();
    }, [usePriceFilter]);

    const updateRangeInput = () => {
        if (!rangeRef.current) return;
        if (!usePriceFilter) {
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
        setMaxPrice(parseInt(rangeRef.current.value));
        updateRangeInput();
    };

    const handleMaterialChange = (material: string) => {
        if (selectedMaterials.includes(material)) {
            setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
        } else {
            setSelectedMaterials([...selectedMaterials, material]);
        }
    };

    const handleCountryChange = (country: string) => {
        if (selectedCountries.includes(country)) {
            setSelectedCountries(selectedCountries.filter((c) => c !== country));
        } else {
            setSelectedCountries([...selectedCountries, country]);
        }
    };

    return (
        <div id='ShopPage' className='w-screen'>
            <Navbar />
            <h1 className='mb-16 mt-32 w-full text-center text-5xl font-extrabold capitalize tracking-tight text-taupe'>All products</h1>
            <div className='relative left-1/2 grid max-h-screen w-screen max-w-6xl -translate-x-1/2 grid-cols-4'>
                <aside className='col-span-1'>
                    <h2 className='pb-4 text-xl font-extrabold uppercase tracking-tight text-tan/80'>Filters</h2>
                    <ul className='space-y-8 [&>li>h3]:pb-2 [&>li>h3]:text-lg [&>li>h3]:font-bold [&>li>h3]:uppercase [&>li>h3]:text-tan/70'>
                        <li>
                            <h3>Collections</h3>
                            <div>
                                {collections.map((collection, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedCollection(collection.title)}
                                        className='block pl-2 transition-colors hover:!text-taupe'
                                        style={{ color: collection.title === selectedCollection ? 'rgb(72 60 50)' : 'rgb(72 60 50 / 0.5)' }}>
                                        {collection.title}
                                    </button>
                                ))}
                            </div>
                        </li>
                        <li>
                            <h3 className='inline-flex'>
                                Price{' '}
                                <span>
                                    <Checkbox id='price-check' label='' checked={usePriceFilter} onChange={() => setUsePriceFilter((prev) => !prev)} />
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
                                    value={maxPrice}
                                    onChange={handleRangeInput}
                                    disabled={!usePriceFilter}
                                />
                                <p style={{ color: usePriceFilter ? '#D2B48C' : 'rgb(72 60 50 / 0.2)' }} className='transition-colors'>
                                    ${maxPrice}
                                </p>
                            </div>
                        </li>
                        <li>
                            <h3>Material</h3>
                            <div>
                                {materials.map((material, i) => (
                                    <div key={i}>
                                        <Checkbox
                                            checked={selectedMaterials.includes(material)}
                                            onChange={() => handleMaterialChange(material)}
                                            label={material}
                                            id={`check-material-${i}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li>
                            <h3>Availability</h3>
                            <div>
                                <Checkbox
                                    checked={availability === 'in-stock'}
                                    onChange={() => setAvailability((prev) => (prev === 'in-stock' ? null : 'in-stock'))}
                                    label='In stock'
                                    id='in-stock-check'
                                />
                            </div>
                        </li>
                        <li>
                            <h3>Country of origin</h3>
                            <div>
                                {countries.map((country, i) => (
                                    <div key={i}>
                                        <Checkbox
                                            checked={selectedCountries.includes(country)}
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
