import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../Utilities/reducers/reducer.utils";

// helpers

const addItemToCartHelper = (cartItems, productToAdd) => {
  // productToEExists ??
  const isInCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if yes --> quantity ++
  if (isInCartItems)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

  // return modified array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementQuantityHelper = (cartItems, productToDecrement) => {
  if (productToDecrement.quantity === 1)
    return removeItemHelper(cartItems, productToDecrement);
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrement.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

const removeItemHelper = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

//impl
export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addItemToCartHelper(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decrementQuantity = (cartItems, productToDecrement) => {
  const newCartItems = decrementQuantityHelper(cartItems, productToDecrement);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItems = (cartItems, productToRemove) => {
  const newCartItems = removeItemHelper(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
