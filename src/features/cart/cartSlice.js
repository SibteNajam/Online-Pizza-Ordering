import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';


const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        addItem(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
            if (item) {
                item.quantity += action.payload.quantity;
                item.totalPrice = item.quantity * item.unitPrice;
            } else {
                state.cart.push(action.payload);
            }

            console.log("After addItem:", state.cart); // ✅ Check this in browser console
        }
        ,
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                // Decrease the quantity if greater than 1
                if (item.quantity > 1) {
                    item.quantity--;
                    item.totalPrice = item.quantity * item.unitPrice;
                } else {
                    // Remove the item from the cart when quantity reaches 0
                    state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
                }
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    },
});

// 'reselect to optimize this type of selectors functions'
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);


//   
export const getCart = (state) => state.cart.cart;

// can use tthis in menu item but for now thre used different approach tthre but doing sme thing baiscalyy
export const selectItemQuantity = (id) => (state) =>
    state.cart.find((item) => item.pizzaId === id)?.quantity || 0;



//for performance optimiztaion use create slecotr

const selectCart = (state) => state.cart.cart;

export const selectCartItemById = (id) =>
    createSelector([selectCart], (cart) => cart.find((item) => item.pizzaId === id));
