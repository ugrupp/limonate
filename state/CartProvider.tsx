import React, { createContext, useEffect, useState } from "react";
import { Cart } from "shopify-buy";
import client from "../lib/client";

export const CartContext = createContext<
  [
    Cart | null,
    React.Dispatch<React.SetStateAction<Cart | null>>,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
>([null, () => {}, false, () => {}]);

interface CartProviderProps {}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // this state will be shared with all components
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const initializeCart = async () => {
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

      // Set to global state
      setCart(newCart);
    };

    initializeCart();
  }, []);

  return (
    // this is the provider providing state
    <CartContext.Provider value={[cart, setCart, cartOpen, setCartOpen]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
