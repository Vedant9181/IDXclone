import { create } from "zustand";

export const useActiveFileTabStore = create((set) => {
  return {
    activeFileTab: { value: "file.js" },
    setActiveFileTab: ({ path, value, extension }) => {
      set({
        activeFileTab: {
          path,
          value,
          extension,
        },
      });
    },
  };
});
