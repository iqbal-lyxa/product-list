import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white shadow-md fixed bottom-0 left-0 w-full z-[1000]">
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-600">© {new Date().getFullYear()} MyShop. All rights reserved.</p>
                <p className="text-gray-600">Follow us on social media!</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-gray-700 hover:text-green-500">Facebook</a>
                    <a href="#" className="text-gray-700 hover:text-green-500">Twitter</a>
                    <a href="#" className="text-gray-700 hover:text-green-500">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
