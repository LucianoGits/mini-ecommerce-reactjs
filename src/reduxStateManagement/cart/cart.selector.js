import { createSelector } from "reselect";

const selectCartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartSlice],
  (cart) => cart.isCartOpen
);

export const selectCartSize = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce(
    (prevItem, currentItem) => prevItem + currentItem.quantity,
    0
  );
});

export const selectTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
  }
);
