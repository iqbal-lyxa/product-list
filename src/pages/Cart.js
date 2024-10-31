import React from 'react';
import { useCart } from '../context/CartContext';
import { CartAction } from '../context/CratAction';
const Cart = () => {
    const { state, dispatch } = useCart();

    const handleIncrease = (product) => {
        dispatch({ type: CartAction.UPDATE_CART, payload: { ...product, quantity: product.quantity + 1 } });
    };

    const handleDecrease = (product) => {
        if (product.quantity > 1) {
            dispatch({ type: CartAction.UPDATE_CART, payload: { ...product, quantity: product.quantity - 1 } });
        } else {
            dispatch({ type: CartAction.REMOVE_FROM_CART, payload: product.id });
        }
    };

    return (
        <div className="container mx-auto mt-20 p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {state.cart.length > 0 ? (
                state.cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b py-2">
                        <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover" />

                        {/* Title with ellipsis for long text */}
                        <h3 className="text-lg font-semibold w-40 truncate" style={{ maxHeight: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.title}
                        </h3>

                        {/* Price with fixed height */}
                        <p className="text-gray-700 w-20 text-center" style={{ maxHeight: '2rem' }}>
                            ৳{item.price.toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center w-24 justify-center" style={{ maxHeight: '2rem' }}>
                            <button
                                onClick={() => handleDecrease(item)}
                                className="px-2 bg-gray-300 hover:bg-gray-400 rounded"
                            >
                                -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                                onClick={() => handleIncrease(item)}
                                className="px-2 bg-gray-300 hover:bg-gray-400 rounded"
                            >
                                +
                            </button>
                        </div>

                        {/* Total Price with fixed height */}
                        <p className="text-gray-700 font-semibold w-24 text-center" style={{ maxHeight: '2rem' }}>
                        ৳{(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
