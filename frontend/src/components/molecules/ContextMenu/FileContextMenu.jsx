import "./ContextMenu.css";
// import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
// import { useCallback, useEffect, useRef } from "react";
import { useClickOutside } from "../../../hooks/utils/useClickOutside.js";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import { useFileSystemModalStore } from "../../../store/fileSystemModalStore.js";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsOpen: isFileContextMenuOpen, setFile } =
    useFileContextMenuStore();
  const { openModal } = useFileSystemModalStore();
  const contextMenuRef = useClickOutside(isFileContextMenuOpen, setFile);

  const fileName = path.split("\\").pop();

  function handleFileDelete() {
    console.log("Deleting file at", path);
    openModal("deleteFile", path, fileName);
    isFileContextMenuOpen(false);
  }

  function handleRenameFile() {
    openModal("renameFile", path, fileName);
    isFileContextMenuOpen(false);
  }
  return (
    // onclicking outside the context menu anywhere in the dom, it should close
    <div
      className="fileContextOptionsWrapper"
      style={{
        left: x,
        top: y,
      }}
      ref={contextMenuRef}
    >
      <button className="contextButton" onClick={handleFileDelete}>
        Delete File
      </button>
      <button className="contextButton" onClick={handleRenameFile}>
        Rename File
      </button>
    </div>
  );
};
