import { create } from "zustand";

export const useFolderContextMenuStore = create((set) => {
  return {
    folder: null,
    x: null,
    y: null,
    isOpen: false,

    setFolder: (incomingFile) => {
      set({
        folder: incomingFile,
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
