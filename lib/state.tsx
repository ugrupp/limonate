import { atom, selector } from "recoil";
import { Cart } from "shopify-buy";
import client from "./client";

// Menu overlay
export const menuOpenState = atom<boolean>({
  key: "menuOpenState",
  default: false,
});

// Cart overlay
export const cartOpenState = atom<boolean>({
  key: "cartOpenState",
  default: false,
});

// Cart
export const fetchCartState = selector({
  key: "fetchCartState",
  get: async () => {
    const lsCheckoutId = localStorage.getItem("checkoutId");

    let newCart: Cart;
    let newCheckoutId: string;

    // Fetch or create the checkout object
    if (lsCheckoutId) {
      newCart = await client.checkout.fetch(lsCheckoutId);
      newCheckoutId = newCart.id as string;
    } else {
      newCart = await client.checkout.create();
      newCheckoutId = newCart.id as string;
      localStorage.setItem("checkoutId", newCheckoutId);
    }

    return newCart;
  },
});

export const cartState = atom<Cart>({
  key: "cartState",
  default: fetchCartState,
});

// Loading
export const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});
