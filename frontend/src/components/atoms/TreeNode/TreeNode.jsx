import "./TreeNode.css";

import { useEffect, useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolderOpened,
  VscFolder,
} from "react-icons/vsc";
import { FileIcon } from "../FileIcon/FileIcon.jsx";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore.js";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore.js";
import { useFolderContextMenuStore } from "../../../store/folderContextMenuStore.js";

export function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

  const { activeFileTab } = useActiveFileTabStore();

  const {
    setX,
    setY,
    setIsOpen: setIsFileContextMenuOpen,
    setFile,
    file: activeFile,
  } = useFileContextMenuStore();

  const {
    setX: setFolderX,
    setY: setFolderY,
    setIsOpen: setIsFolderContextMenuOpen,
    setFolder,
    folder: activeFolder,
  } = useFolderContextMenuStore();

  const toggleVisibility = (folderName) => {
    setVisibility({ ...visibility, [folderName]: !visibility[folderName] });
  };

  const computeExtension = (fileFolderData) => {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
  };

  const sortChildren = (children) => {
    return children.sort((a, b) => {
      // If one is a folder and other is a file, folder comes first
      if (a.children && !b.children) return -1;
      if (!a.children && b.children) return 1;

      // If both are folders or both are files, sort alphabetically
    });
  };

  const handleSelectedFile = (fileFolderData) => {
    if (activeFileTab?.path === fileFolderData.path) return;
    editorSocket.emit("readFile", { pathToFileOrFolder: fileFolderData.path });
  };

  const handleContextMenuForFiles = (e, path) => {
    console.log(e);
    e.preventDefault();
    setFile(path);
    setX(e.clientX);
    setY(e.clientY);
    setIsFileContextMenuOpen(true);
  };

  const handleContextMenuForFolders = (e, fileFolderData) => {
    e.preventDefault();
    setFolder(fileFolderData.path);
    setFolderX(e.clientX);
    setFolderY(e.clientY);
    setIsFolderContextMenuOpen(true);
    
    if (!visibility[fileFolderData.name]) setVisibility({ ...visibility, [fileFolderData.name]: true });
  };

  useEffect(() => {
    console.log("visibility changed", visibility);
  }, [visibility]);

  return (
    fileFolderData && (
      <div style={{ paddingLeft: "15px", color: "white" }}>
        {fileFolderData.children ? (
          <div
            className={`${
              activeFolder === fileFolderData.path ? "activeFolder" : ""
            }`}
            onContextMenu={(e) =>
              handleContextMenuForFolders(e, fileFolderData)
            }
          >
            <button
              onClick={() => toggleVisibility(fileFolderData.name)}
              className="folder-button"
            >
              {visibility[fileFolderData.name] ? (
                <>
                  <VscChevronDown />
                  <VscFolderOpened style={{ color: "#90a4ae" }} />
                </>
              ) : (
                <>
                  <VscChevronRight />
                  <VscFolder style={{ color: "#90a4ae" }} />
                </>
              )}
              {fileFolderData.name}
            </button>
          </div>
        ) : (
          <div
            className={`file-node ${
              activeFileTab?.path === fileFolderData.path ? "selected" : ""
            } 
            ${activeFile === fileFolderData.path ? "active" : ""}`}
            onClick={() => handleSelectedFile(fileFolderData)}
            onContextMenu={(e) =>
              handleContextMenuForFiles(e, fileFolderData.path)
            }
          >
            <FileIcon extension={computeExtension(fileFolderData)} />

            <p
              style={{
                paddingTop: "15px",
                paddingBottom: "21px",
                marginTop: "8px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              {fileFolderData.name}
            </p>
          </div>
        )}

        {visibility[fileFolderData.name] &&
          fileFolderData.children &&
          sortChildren(fileFolderData.children).map((child) => (
            <TreeNode fileFolderData={child} key={child.name} />
          ))}
      </div>
    )
  );
}
