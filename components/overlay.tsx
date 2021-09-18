import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface OverlayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay: React.FC<OverlayProps> = ({ children, isOpen, setIsOpen }) => {
  return (
    <Transition show={isOpen}>
      <Dialog onClose={() => setIsOpen(false)} className="fixed z-40 inset-0">
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
          <Dialog.Overlay className="fixed inset-0 bg-light" />
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
          <div className="absolute inset-15 md:inset-40 2xl:inset-60 bg-dark rounded-[15px] selection-inverted text-light">
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Overlay;
