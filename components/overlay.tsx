import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import useBoop from "../lib/useBoop";
import Dot from "./dot";

interface OverlayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  desktopHalf?: boolean;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  isOpen,
  setIsOpen,
  desktopHalf = false,
}) => {
  const [
    menuOpenerBoopAnimation,
    menuOpenerBoopTransition,
    menuOpenerBoopTrigger,
  ] = useBoop({
    scale: 1.15,
  });

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className={classNames([
          "fixed z-40 inset-0",
          {
            "xl:left-1/2": desktopHalf,
          },
        ])}
      >
        {/* Background */}
        <Transition.Child
          enter="transition duration-300 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
          as={Fragment}
        >
          <Dialog.Overlay className="absolute inset-0 bg-light" />
        </Transition.Child>

        {/* Content */}
        <Transition.Child
          enter="transition duration-300 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <div
            className={classNames([
              "absolute inset-15 md:inset-40 mx-auto bg-dark rounded-[15px] selection-inverted text-light",
              {
                "xl:inset-60 2xl:inset-x-90": !desktopHalf,
                "2xl:inset-60 3xl:inset-x-90": desktopHalf,
              },
            ])}
          >
            {/* Closer */}
            <div className="absolute z-20 top-15 right-15 md:top-20 md:right-20 2xl:top-30 2xl:right-30">
              <Dot
                text="Warenkorb schließen"
                theme="light"
                onClick={closeHandler}
                onMouseEnter={menuOpenerBoopTrigger}
                animate={menuOpenerBoopAnimation}
                transition={menuOpenerBoopTransition}
              />
            </div>

            {/* Content */}
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Overlay;
