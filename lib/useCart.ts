import { useSetRecoilState } from "recoil";
import { Cart, LineItemToAdd } from "shopify-buy";
import { client } from "./client";
import { cartState, loadingState } from "./state";
import { useLoadableState } from "./useLoadable";

export type Checkout = {
  addItem: (item: LineItemToAdd) => Promise<void>;
  updateQuantity: (input: ShopifyBuy.AttributeInput) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
};

const useCart = (): [Cart | null, Checkout] => {
  const setLoading = useSetRecoilState(loadingState);
  const {
    error,
    loading,
    result: cart,
    setterOrUpdater: setCart,
  } = useLoadableState(cartState);

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
