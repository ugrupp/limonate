import Client from "shopify-buy";
import ClientUnoptimized from "shopify-buy/index.unoptimized.umd";

const client = Client.buildClient({
  domain: "limonate-limo.myshopify.com",
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN ?? "",
});

const clientUnoptimized = ClientUnoptimized.buildClient({
  domain: "limonate-limo.myshopify.com",
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN ?? "",
});

export { client, clientUnoptimized };
