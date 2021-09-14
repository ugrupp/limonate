import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "limonate-limo.myshopify.com",
  storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN ?? "",
});

export default client;
