import React from "react";
import data from "../data/shop.json";
import Product from "./product";

interface ShopProps {
  products: ShopifyBuy.Product[];
  productsMetaData: any;
  data: typeof data;
}

const Shop: React.FC<ShopProps> = ({
  data,
  products = [],
  productsMetaData,
}) => {
  return (
    <>
      {products.map((product, index, arr) => {
        // Find correspondig meta data object
        const productMetadata = productsMetaData?.find(
          ({ node }: any) => node.id === product.id
        )?.node?.metafields?.edges;

        return (
          <Product
            data={data}
            key={product.id}
            product={product}
            productMetadata={productMetadata}
            first={index === 0}
            last={index >= arr.length - 1}
          />
        );
      })}
    </>
  );
};

export default Shop;
