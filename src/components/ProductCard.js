import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CartAction } from '../context/CratAction';

const ProductCard = ({ product }) => {
    const { state, dispatch } = useCart();
    const cartItem = state.cart.find(item => item.id === product.id);

    const handleAddToCart = () => {
        dispatch({ type: CartAction.ADD_TO_CART, payload: { ...product, quantity: cartItem?.quantity + 1 } });
    };

    const handleRemoveFromCart = () => {
        if (cartItem?.quantity > 1) {
            dispatch({ type: CartAction.UPDATE_CART, payload: { ...product, quantity: cartItem?.quantity - 1 } });
        } else {
            dispatch({ type: CartAction.REMOVE_FROM_CART, payload: product.id });
        }
    };

    return (
        <div className="relative w-52 h-85 w-[225px] bg-white hover:shadow-lg p-2 flex flex-col group">
            {/* Image Section */}
            <div className="bg-gray-100 h-[210px] w-[210px] rounded-lg overflow-hidden relative">
                {/* Dark overlay only on image hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                {

                }
                <span className="z-[100] absolute top-0 left-0 bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded">- ৳ {((product.price * product?.discountPercentage || 0)/ 100).toFixed(2)}</span>

                <LazyLoadImage
                    src={product.images[0]}
                    alt={product.title}
                    effect="blur"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Cart and Quick View buttons */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className={`flex rounded items-center ${cartItem?.quantity > 0 ? 'bg-green-500 hover:bg-green-600 text-white' : 'backdrop-blur bg-gray/30 text-white'} flex-nowrap w-40 h-10 justify-center border border-white-800`}>
                    {cartItem?.quantity > 0 && (
                        <button
                            onClick={handleRemoveFromCart}
                            className="text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8" />
                            </svg>
                        </button>
                    )}
                    <button onClick={handleAddToCart} className="text-center px-1">
                        {cartItem?.quantity > 0 ? `${cartItem?.quantity} Added in Cart` : 'Add to Cart'}
                    </button>
                </div>
                <button
                    className="flex items-center backdrop-blur bg-gray/30 text-white justify-center border border-white-800 rounded py-1 px-3 mt-2 w-40"
                    onClick={() => window.location.href = `/product/${product.id}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-white-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.1.34-.272.674-.5.994a11.985 11.985 0 01-9.042 5.006C7.523 19 3.732 16.057 2.458 12z" />
                    </svg>
                    Quick View
                </button>
            </div>

            {/* Product Details */}
            <h3 className="mt-1">{product.category}</h3>
            <h3 className="mt-1 font-semibold">{product.title}</h3>
            <div className="flex items-center mt-1 justify-between">
                <p className="mr-2 text-lg font-semibold text-gray-900">৳{product.discountPrice?.toFixed(2)}</p>
                <p className="text-base font-medium text-gray-500 line-through">৳{(product.price).toFixed(2)}</p>
            </div>
            <div className="flex items-center mt-1">
                <span className="text-yellow-500">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span className="text-gray-500 ml-1">({product.rating})</span>
            </div>
        </div>

    );
};

export default ProductCard;
