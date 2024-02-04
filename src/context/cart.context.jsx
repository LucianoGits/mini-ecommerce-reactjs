// import React, { createContext, useReducer } from "react";

// const addItemToCartHelper = (cartItems, productToAdd) => {
//   // productToEExists ??
//   const isInCartItems = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   //if yes --> quantity ++
//   if (isInCartItems)
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );

//   // return modified array
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const decrementQuantityHelper = (cartItems, productToDecrement) => {
//   if (productToDecrement.quantity === 1)
//     return removeItemHelper(cartItems, productToDecrement);
//   return cartItems.map((cartItem) =>
//     cartItem.id === productToDecrement.id
//       ? {
//           ...cartItem,
//           quantity: cartItem.quantity - 1,
//         }
//       : cartItem
//   );
// };

// const removeItemHelper = (cartItems, productToRemove) => {
//   return cartItems.filter((item) => item.id !== productToRemove.id);
// };

// const countItems = (cartItemsArr) => {
//   return cartItemsArr.reduce(
//     (prevItem, currentItem) => prevItem + currentItem.quantity,
//     0
//   );
// };

// const countTotal = (cartItemsArr) => {
//   return cartItemsArr.reduce(
//     (prevItem, currentItem) =>
//       prevItem + currentItem.quantity * currentItem.price,
//     0
//   );
// };

// export const CartContext = createContext({
//   isCartOpen: null,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   decrementQuantity: () => {},
//   removeItem: () => {},
//   cartSize: 0,
//   cartTotal: 0,
// });

// //useReducer IMplementation

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartSize: 0,
//   cartTotal: 0,
// };

// export const CART_ACTION_TYPES = {
//   SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
//   SET_CART_ITEMS: "SET_CART_ITEMS",
// };

// const cartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return { ...state, ...payload };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return { ...state, isCartOpen: payload };
//     default:
//       throw new Error(`Unhandled type ${type} in cartReducer`);
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

//   const { cartItems, isCartOpen, cartTotal, cartSize } = state;

//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartSize = countItems(newCartItems);
//     const newCartTotal = countTotal(newCartItems);

//     dispatch({
//       type: CART_ACTION_TYPES.SET_CART_ITEMS,
//       payload: {
//         cartItems: newCartItems,
//         cartSize: newCartSize,
//         cartTotal: newCartTotal,
//       },
//     });
//   };

//   const addItemToCart = (productToAdd) => {
//     const newCartItems = addItemToCartHelper(cartItems, productToAdd);
//     updateCartItemsReducer(newCartItems);
//   };

//   const decrementQuantity = (productToDecrement) => {
//     const newCartItems = decrementQuantityHelper(cartItems, productToDecrement);
//     updateCartItemsReducer(newCartItems);
//   };

//   const removeItem = (productToRemove) => {
//     const newCartItems = removeItemHelper(cartItems, productToRemove);
//     updateCartItemsReducer(newCartItems);
//   };

//   const handleToggle = () => {
//     dispatch({
//       type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
//       payload: !isCartOpen,
//     });
//   };

//   const value = {
//     isCartOpen,
//     handleToggle,
//     addItemToCart,
//     cartItems,
//     cartSize,
//     decrementQuantity,
//     removeItem,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
