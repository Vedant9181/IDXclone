import { create } from "zustand";

export const useFileContextMenuStore = create((set) => {
  return {
    file: null,
    x: null,
    y: null,
    isOpen: false,

    setFile: (incomingFile) => {
      set({
        file: incomingFile,
      });
    },

    setX: (incomingX) => {
      set({
        x: incomingX,
      });
    },

    setY: (incomingY) => {
      set({
        y: incomingY,
      });
    },

    setIsOpen: (incomingIsOpen) => {
      set({
        isOpen: incomingIsOpen,
      });
    },
  };
});
