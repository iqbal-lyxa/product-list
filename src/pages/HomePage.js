import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data.products?.map(product => ({ ...product, discountPrice:  product.price - ((product.price * product?.discountPercentage || 0)/ 100) || 0 })));
            setLoading(false);
        };
        getProducts();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto p-4">
            <SearchBar setProducts={setProducts} />
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
