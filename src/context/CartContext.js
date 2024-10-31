import React, { createContext, useContext, useReducer } from 'react';
import { CartAction } from './CratAction';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case CartAction.ADD_TO_CART: {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity <= existingItem.stock) {
                    return {
                        ...state,
                        cart: state.cart.map(item =>
                            item.id === action.payload.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                } else {
                    alert("Cannot add more than available stock");
                    console.warn("Cannot add more than available stock");
                    return state; 
                }
            }
        
            if (action.payload.stock > 0) {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            } else {
                return state;
            }
        }
        
        case CartAction.UPDATE_CART:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        
        case CartAction.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
