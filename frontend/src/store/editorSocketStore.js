import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore.js";
import { useTreeStructureStore } from "./treeStructureStore.js";

export const useEditorSocketStore = create((set) => {
  return {
    editorSocket: null,
    setEditorSocketStore: (incomingSocket) => {
      const setActiveFileTab =
        useActiveFileTabStore.getState().setActiveFileTab;
      const projectTreeSetter =
        useTreeStructureStore.getState().setTreeStructure;

      incomingSocket?.on("readFileSuccess", (data) => {
        console.log("Read file success", data);
        const fileExtension = data.path.split(".").pop();

        setActiveFileTab({
          path: data.path,
          value: data.data,
          extension: fileExtension,
        });
      });

      incomingSocket?.on("writeFileSuccess", (data) => {
        console.log("writeFileSuccess event captured");

        incomingSocket?.emit("readFile", {
          pathToFileOrFolder: data.path,
        });
      });

      const treeUpdateEvents = [
        "deleteFileSuccess",
        "deleteFolderSuccess",
        "createFileSuccess",
        "createFolderSuccess",
        "renameFileSuccess",
        "renameFolderSuccess",
      ];

      treeUpdateEvents.forEach((event) => {
        incomingSocket?.on(event, () => {
          console.log(`${event} event captured`);
          projectTreeSetter();
        });
      });

      // incomingSocket?.on("deleteFileSuccess", () => {
      //   console.log("deleteFileSuccess event captured");
      //   projectTreeSetter();
      // });

      // incomingSocket?.on("createFileSuccess", () => {
      //   console.log("createFileSuccess event captured");
      //   projectTreeSetter();
      // });

      // incomingSocket?.on("renameFileSuccess", () => {
      //   console.log("renameFileSuccess event captured");
      //   projectTreeSetter();
      // });

      // incomingSocket?.on("createFolderSuccess", () => {
      //   console.log("createFolderSuccess event captured");
      //   projectTreeSetter();
      // });

      // incomingSocket?.on("renameFolderSuccess", () => {
      //   console.log("renameFolderSuccess event captured");
      //   projectTreeSetter();
      // });

      set({ editorSocket: incomingSocket });
    },
  };
});
