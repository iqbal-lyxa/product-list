import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {

    const { state } = useCart();

    const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-[1000]">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">MyShop</Link>
                </h1>
                <div className="flex items-center">
                    <Link to="/" className="mx-4 text-gray-700 hover:text-green-500">Home</Link>
                    <Link to="/cart" className="mx-4 text-gray-700 hover:text-green-500">Cart
                        {cartCount > 0 && (
                            <span className="absolute bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs top-2 ml-7">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
