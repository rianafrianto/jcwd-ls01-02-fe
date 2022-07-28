import React from "react";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/outline";

function SelectCustom(props) {
  const { buttonStyle, panelStyle, optionsFunc, stateValue, disabled } = props;
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`${buttonStyle} btn-plain h-full border border-neutral-gray bg-white flex justify-between items-center rounded-lg truncate focus:outline-primary px-2 cursor-pointer relative disabled:cursor-not-allowed`}
            disabled={disabled}
          >
            {stateValue}{" "}
            <ChevronDownIcon
              className={`h-5 duration-300 ${
                open && "text-primary rotate-180"
              }`}
            />
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                as={motion.div}
                static
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                className={`${panelStyle} absolute top-10 z-10 bg-putih rounded focus:outline-none shadow-xl shadow-black/20 bg-white overflow-hidden flex flex-col`}
                onClick={close}
              >
                {optionsFunc()}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}

export default SelectCustom;
