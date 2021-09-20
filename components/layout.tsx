import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../lib/state";
import Cart from "./cart";
import OverlayMenu from "./overlay-menu";
import Topbar from "./topbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const loading = useRecoilValue(loadingState);
  const cursorClass = "cursor-progress";
  useEffect(() => {
    loading
      ? document.body.classList.add(cursorClass)
      : document.body.classList.remove(cursorClass);
  }),
    [loading];

  return (
    // TODO: apply to body
    <div>
      <Cart />
      <OverlayMenu />

      <Topbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
