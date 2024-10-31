import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './pages/Cart';

const App = () => (
    <CartProvider>
        <Router>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow pb-32 pt-16">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    </CartProvider>
);

export default App;
