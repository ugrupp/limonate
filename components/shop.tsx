import React from "react";
import data from "../data/shop.json";
import Product from "./product";

interface ShopProps {
  products: ShopifyBuy.Product[];
  data: typeof data;
}

const Shop: React.FC<ShopProps> = ({ data, products = [] }) => {
  return (
    <>
      {products.map((product, index, arr) => {
        return (
          <Product
            data={data}
            key={product.id}
            product={product}
            first={index === 0}
            last={index >= arr.length - 1}
          />
        );
      })}
    </>
  );
};

export default Shop;
