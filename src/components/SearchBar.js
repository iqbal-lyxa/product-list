import React, { useState } from 'react';
import { searchProducts } from '../services/api';
import { debounce } from '../utils/debounce';

const SearchBar = ({ setProducts }) => {
    const [query, setQuery] = useState('');

    const handleSearch = debounce(async (query) => {
        if (query) {
            const data = await searchProducts(query);
            setProducts(data.products);
        }

    }, 300);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value); 
    };

    return (
        <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
            className="p-2 border rounded w-full"
        />
    );
};

export default SearchBar;
