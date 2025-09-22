import { create } from "zustand";

export const useActiveFileTabStore = create((set) => {
  return {
    activeFileTab: null,
    activeFileName: null,
    setActiveFileTab: ({ path, value, extension, fileName }) => {
      set({
        activeFileTab: {
          path,
          value,
          extension,
          fileName,
        },
      });
    },
    setActiveFileName: (fileName) => {
      set({ activeFileName: fileName });
    },
  };
});
