
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchProductDetail } from '../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetchProductDetail(id);
            setProduct({...response, discountPrice:  response.price - ((response.price * response?.discountPercentage || 0)/ 100) || 0 });
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="font-sans">
            <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">

                    {/* Image section */}
                    <div className="w-full lg:sticky top-0 sm:flex gap-2">
                        <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full cursor-pointer rounded-md outline"
                                />
                            ))}
                        </div>
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-4/5 rounded-md object-cover"
                        />
                    </div>

                    {/* Details section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-gray-800 text-xl font-bold">৳{product.discountPrice?.toFixed(2)}</p>
                            <p className="text-gray-400 text-xl">
                                <strike>৳{(product.price).toFixed(2)}</strike>
                                <span className="text-sm ml-1.5">Tax included</span>
                            </p>
                        </div>

                        <div className="flex space-x-2 mt-4">
                            {[...Array(Math.floor(product.rating))].map((_, i) => (
                                <svg key={i} className="w-5 fill-blue-600" viewBox="0 0 14 13">
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            ))}
                            
                            {/* Add half star if applicable */}
                            {product.rating % 1 !== 0 && (
                                <svg className="w-5 fill-blue-600" viewBox="0 0 14 13">
                                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            )}
                            <span className="text-gray-500 ml-2">({product.rating})</span>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800">About the item</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        <button
                            type="button"
                            className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
                        >
                            Add to cart
                        </button>

                        {/* Reviews section */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800">Reviews ({product.reviews.length})</h3>
                            {product.reviews.map((review, index) => (
                                <div key={index} className="mt-4">
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-800 font-bold">{review.rating}</p>
                                        <svg className="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13">
                                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                        </svg>
                                        <p className="text-sm text-gray-800 ml-3">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md">
                                Read all reviews
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
