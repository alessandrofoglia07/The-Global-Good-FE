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

export interface Review {
    productName: string;
    createdAt: number;
    productCollection: Collection;
    reviewId: string;
    username: string;
    rating: number;
    reviewTitle: string;
    reviewText: string;
}

export interface Filters {
    collection: string | null;
    usePriceFilter: boolean;
    maxPrice: number;
    availability: 'in-stock' | null;
    countries: string[];
}

export interface CartItem {
    collection: string;
    name: string;
    quantity: number;
}

export interface ProductWithQuantity extends Product {
    quantity: number;
}

export interface BlogPost {
    theme: string;
    createdAt: number;
    img: string;
    title: string;
    content: {
        custom: false;
        introduction: string;
        story: string;
        fairTradeImpact: string;
    } | {
        custom: true;
        paragraphs: { title: string; content: string; }[];
    };
    likes: number;
    liked: boolean;
    comments: string[]; // (foreign key)
    productCollection?: Collection;
}

export interface Comment {
    commentId: string; // partition key
    createdAt: number; // sort key
    blogTheme: string; // (foreign key)
    blogCreatedAt: number; // (foreign key)
    username: string; // (foreign key)
    content: string;
}