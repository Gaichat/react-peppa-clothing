import { createSelector } from 'reselect';

const cartSelector = state => state.cart;

//these selectors create with createSelectors are memoized selectors
export const cartItemSelector = createSelector(
    [cartSelector],
    cart => cart.cartItems
);

export const cartItemsCountSelector = createSelector(
    [cartItemSelector],
    cartItems => cartItems.reduce((accumulator,cartItem)=>accumulator+cartItem.quantity,0)
);

export const cartHiddenSelector = createSelector(
  [cartSelector],
  cart => cart.hidden
);

export const cartTotalSelector = createSelector(
  [cartItemSelector],
    cartItems => cartItems.reduce((accumulator,cartItem)=>accumulator+cartItem.quantity*cartItem.price,0)
);