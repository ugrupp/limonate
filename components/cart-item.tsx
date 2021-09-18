import Image from "next/image";
import shopData from "../data/shop.json";
import useCart from "../lib/useCart";
import { formatCurrency, formatUnitPrice } from "../lib/util";
import cartStyles from "../styles/cart.module.css";

interface CartItemProps {
  item: ShopifyBuy.LineItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { variant, title, quantity, id } = item;

  // Product info extensions & overrides
  const productExtension = shopData.products.find(
    ({ id }) => id === variant.product.id
  );

  const price = formatCurrency(
    variant.priceV2.amount,
    variant.priceV2.currencyCode
  );

  const unitPrice = formatUnitPrice(
    variant.unitPrice,
    variant.unitPriceMeasurement
  );

  const [cart, checkout] = useCart();
  const handleIncreaseQuantity = async () => {
    await checkout.updateQuantity({
      id,
      variantId: variant.id,
      quantity: quantity + 1,
    });
  };
  const handleDecreaseQuantity = async () => {
    await checkout.updateQuantity({
      id,
      variantId: variant.id,
      quantity: quantity - 1,
    });
  };

  const variantTitle = variant.title !== "Default Title" ? variant.title : "";

  const quantityButtonStyles = [
    "rounded-full cursor-pointer inline-flex justify-center items-center leading-[2] text-center",
    "border-[1.2px] md:border-[1.4px] 2xl:border-[2px] focus:outline-none",
    "bg-transparent border-light hover:bg-light text-light hover:text-dark focus-visible:outline-white transition-colors duration-200",
    "h-18 w-18 md:h-[36px] md:w-[36px] 2xl:h-[45px] 2xl:w-[45px]",
    "translate-y-[-0.14em]",
  ].join(" ");

  return (
    <div className={cartStyles.root}>
      {/* Title */}
      <div className="col-span-2 xl:col-span-1 relative">
        {/* Cutout */}
        {!!productExtension?.cutout && (
          <div className="absolute left-30 xl:left-40 2xl:left-90 top-1/2 -translate-y-1/2">
            <div className="w-75 md:w-100 2xl:w-[130px] aspect-w-3 aspect-h-4">
              <Image
                quality={85}
                layout="fill"
                src={productExtension.cutout.src}
                alt={productExtension.cutout.alt ?? title}
                objectFit="contain"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative">
          <h3>• {title}</h3>
          <p>
            {variantTitle ? (
              <>
                {variant.title} ({unitPrice})
              </>
            ) : (
              <>{unitPrice}</>
            )}
          </p>
        </div>
      </div>

      {/* Quantity */}
      <p className="relative z-10 self-start col-span-1 xl:text-center xl:justify-center flex items-center gap-x-20 md:gap-x-30 xl:gap-x-40 2xl:gap-x-45">
        <button
          onClick={handleDecreaseQuantity}
          className={quantityButtonStyles}
        >
          <span className="translate-y-[0.14em]">-</span>
        </button>
        {quantity}
        <button
          onClick={handleIncreaseQuantity}
          className={quantityButtonStyles}
        >
          <span className="translate-y-[0.14em]">+</span>
        </button>
      </p>

      {/* Price */}
      <p className="relative z-10 col-span-1 text-right">{price}</p>
    </div>
  );
};

export default CartItem;
