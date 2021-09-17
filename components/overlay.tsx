import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface OverlayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay: React.FC<OverlayProps> = ({ children, isOpen, setIsOpen }) => {
  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={() => setIsOpen(false)} className="fixed z-40 inset-0">
        <Dialog.Overlay className="fixed inset-0 bg-light" />

        {/* TODO: validate etc */}
        <div className="absolute inset-15 md:inset-40 2xl:inset-60 bg-dark rounded-[15px] selection-inverted text-light">
          {children}
        </div>
      </Dialog>
    </Transition>
  );
};

export default Overlay;
