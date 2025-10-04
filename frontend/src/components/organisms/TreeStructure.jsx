import { useEffect } from "react";
import { useTreeStructureStore } from "../../store/treeStructureStore.js";
import { TreeNode } from "../atoms/TreeNode/TreeNode.jsx";
import { useFileContextMenuStore } from "../../store/fileContextMenuStore.js";
import { FileContextMenu } from "../molecules/ContextMenu/FileContextMenu.jsx";
import { createPortal } from "react-dom";
import { useFolderContextMenuStore } from "../../store/folderContextMenuStore.js";
import { FolderContextMenu } from "../molecules/ContextMenu/FolderContextMenu.jsx";
import { ModalManager } from "../molecules/ModalManager/ModalManager.jsx";

export const TreeStructure = () => {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    file,
    isOpen: isFileContextMenuOpen,
    x: fileContextX,
    y: fileContextY,
  } = useFileContextMenuStore();

  const {
    folder,
    isOpen: isFolderContextMenuOpen,
    x: folderContextX,
    y: folderContextY,
  } = useFolderContextMenuStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("tree", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);

  return (
    <>
      {isFileContextMenuOpen &&
        fileContextX &&
        fileContextY &&
        createPortal(
          <FileContextMenu x={fileContextX} y={fileContextY} path={file} />,
          document.body
        )}

      {isFolderContextMenuOpen &&
        folderContextX &&
        folderContextY &&
        createPortal(
          <FolderContextMenu
            x={folderContextX}
            y={folderContextY}
            path={folder}
          />,
          document.body
        )}

      <ModalManager />

      <TreeNode fileFolderData={treeStructure} />
    </>
  );
};
