import { atom, selector } from "recoil";
import { Cart } from "shopify-buy";
import { client } from "./client";

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
    const lsCheckoutId =
      typeof window !== "undefined" ? null : localStorage.getItem("checkoutId");

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

// If locked => scrollbar width, `false` otherwise
export const scrollLockState = atom<undefined | string>({
  key: "scrollLockState",
  default: undefined,
  effects_UNSTABLE: [
    ({ setSelf, trigger }) => {
      if (typeof MutationObserver !== "undefined" && trigger === "get") {
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function ({ target }) {
            const paddingRight = (target as HTMLHtmlElement).style.paddingRight;
            setSelf(
              paddingRight &&
                (target as HTMLHtmlElement).style.overflow === "hidden"
                ? paddingRight
                : undefined
            );
          });
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["style"],
        });
      }
    },
  ],
});

// Scroll status
export const pageScrolledState = atom<boolean>({
  key: "pageScrolledState",
  default: false,
});
