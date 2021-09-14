import type { AppProps } from "next/app";
import Layout from "../components/layout";
import CartProvider from "../state/CartProvider";
import LoadingProvider from "../state/LoadingProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </LoadingProvider>
  );
}
export default MyApp;
