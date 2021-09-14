import classNames from "classnames";
import { useContext } from "react";
import { LoadingContext } from "../state/LoadingProvider";
import Cart from "./cart";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading] = useContext(LoadingContext);

  return (
    <div
      className={classNames({
        "cursor-progress": loading,
      })}
    >
      <Cart />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
