import classNames from "classnames";
import React, { useContext } from "react";
import { LoadingContext } from "../state/LoadingProvider";
import Cart from "./cart";
import Topbar from "./topbar";

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

      <Topbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
