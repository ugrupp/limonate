import { useContext } from "react";
import { Cart, LineItemToAdd } from "shopify-buy";
import { CartContext } from "../state/CartProvider";
import { LoadingContext } from "../state/LoadingProvider";
import client from "./client";

export type Checkout = {
  addItem: (item: LineItemToAdd) => Promise<void>;
  updateQuantity: (input: ShopifyBuy.AttributeInput) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
};

const useCart = (): [Cart | null, Checkout] => {
  const [_, setLoading] = useContext(LoadingContext);
  const [cart, setCart] = useContext(CartContext);

  const checkoutId = cart?.id;

  /**
   * add item to cart
   */
  const addItem = async (item: LineItemToAdd) => {
    if (checkoutId) {
      setLoading(true);
      const updatedCart = await client.checkout.addLineItems(checkoutId, [
        item,
      ]);
      setCart(updatedCart);
      setLoading(false);
    }
  };

  /**
   * update item quantity
   */
  const updateQuantity = async (input: ShopifyBuy.AttributeInput) => {
    if (checkoutId) {
      setLoading(true);
      const updatedCart = await client.checkout.updateLineItems(checkoutId, [
        input,
      ]);
      setCart(updatedCart);
      setLoading(false);
    }
  };

  /**
   * remove item from cart
   */
  const removeItem = async (lineItemId: string) => {
    if (checkoutId) {
      setLoading(true);
      const udpatedCart: Cart = await client.checkout.removeLineItems(
        checkoutId,
        [lineItemId]
      );
      setCart(udpatedCart);
      setLoading(false);
    }
  };

  const checkout = {
    addItem,
    updateQuantity,
    removeItem,
  };

  return [cart, checkout];
};

export default useCart;
