import "./ContextMenu.css";
import { useClickOutside } from "../../../hooks/utils/useClickOutside.js";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore.js";
import { useFileSystemModalStore } from "../../../store/fileSystemModalStore.js";

export const FolderContextMenu = ({ x, y, path }) => {
  console.log("rerender foldercontextjsx");
  const { setIsOpen, setFolder } = useFolderContextMenuStore();
  const { openModal } = useFileSystemModalStore();
  const contextMenuRef = useClickOutside(setIsOpen, setFolder);
  const folderName = path.split("\\").pop();

  function handleFileCreation() {
    console.log("Creating new file in", path);
    openModal("createFile", path);
    setIsOpen(false);
    setFolder(null);
  }

  function handleFolderCreation() {
    console.log("Creating new folder in", path);
    openModal("createFolder", path);
    setIsOpen(false);
    setFolder(null);
  }

  function handleFolderRename() {
    console.log("Renaming folder at", path, folderName);
    openModal("renameFolder", path, folderName);
    setIsOpen(false);
    setFolder(null);
  }

  function handleFolderDelete() {
    openModal("deleteFolder", path,folderName);
    console.log("Deleting folder at", path, );
    setIsOpen(false);
    setFolder(null);
  }

  // function handleOnMouseLeave() {
  //   setIsOpen(false);
  //   setFolder(false);
  // }

  return (
    // onclicking outside the context menu anywhere in the dom, it should close
    <div
      className="fileContextOptionsWrapper"
      style={{
        left: x,
        top: y,
      }}
      // onMouseLeave={handleOnMouseLeave}
      ref={contextMenuRef}
    >
      <button className="contextButton" onClick={handleFileCreation}>
        New File
      </button>
      <button className="contextButton" onClick={handleFolderCreation}>
        New Folder
      </button>
      <button className="contextButton" onClick={handleFolderRename}>
        Rename Folder
      </button>
      <button className="contextButton" onClick={handleFolderDelete}>
        Delete Folder
      </button>
    </div>
  );
};
