import { create } from "zustand";

export const useEditorSocketStore = create((set) => {
  return {
    editorSocket: null,
    setEditorSocketStore: (incomingSocket) => {
      set({ editorSocket: incomingSocket });
    },
  };
});
