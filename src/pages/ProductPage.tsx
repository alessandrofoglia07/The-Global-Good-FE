import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/api/axios';
import { Product } from '@/types';

const ProductPage: React.FC = () => {
    const { collection, name } = useParams<{ collection: string; name: string }>();

    const [product, setProduct] = useState<undefined | Product>(undefined);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/product/${collection}/${name}`);
            setProduct(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return <div>ProductPage</div>;
};

export default ProductPage;
