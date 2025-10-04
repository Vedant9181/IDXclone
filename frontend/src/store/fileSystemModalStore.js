import { create } from "zustand";

export const useFileSystemModalStore = create((set) => {
  return {
    isOpen: false,
    operation: null,
    targetPath: null,
    currentName: null,
    requiresInput:true,

    openModal: (operation, targetPath, currentName = "") => {
      set({
        isOpen: true,
        operation,
        targetPath,
        currentName,
        requiresInput: !operation.startsWith("delete")
      });
    },

    closeModal: () => {
      set({
        isOpen: false,
        operation: null,
        targetPath: null,
        currentName: null,
        requiresInput: true
      });
    },
  };
});
