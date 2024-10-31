const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return response.json();
};

export const fetchProductDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
};

export const searchProducts = async (query) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    return response.json();
};
