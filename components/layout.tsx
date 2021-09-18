import classNames from "classnames";
import React from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../lib/state";
import Cart from "./cart";
import OverlayMenu from "./overlay-menu";
import Topbar from "./topbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const loading = useRecoilValue(loadingState);

  return (
    <div
      className={classNames({
        "cursor-progress": loading,
      })}
    >
      <Cart />
      <OverlayMenu />

      <Topbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
