export type Collection = 'clothing-accessories' | 'home-living' | 'beauty-wellness' | 'food-beverages';

export interface Product {
    name: string;
    description: string;
    img: string;
    collection: Collection;
    price: number;
    countryOfOrigin: string;
    materials: string[];
    availability: number;
}

export interface Filters {
    collection: string | null;
    usePriceFilter: boolean;
    maxPrice: number;
    availability: 'in-stock' | null;
    countries: string[];
}