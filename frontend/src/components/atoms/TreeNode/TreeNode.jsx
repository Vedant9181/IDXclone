import { useEffect, useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolderOpened,
  VscFolder,
} from "react-icons/vsc";
import { FileIcon } from "../FileIcon/FileIcon.jsx";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";

export function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});

  const { editorSocket } = useEditorSocketStore();

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
    editorSocket.emit("readFile", { pathToFileOrFolder: fileFolderData.path });
  };

  useEffect(() => {
    console.log("visibility changed", visibility);
  }, [visibility]);

  return (
    fileFolderData && (
      <div
        style={{
          paddingLeft: "15px",
          color: "white",
        }}
      >
        {fileFolderData.children ? (
          <>
            <button
              onClick={() => toggleVisibility(fileFolderData.name)}
              style={{
                border: "none",
                cursor: "pointer",
                outline: "none",
                color: "white",
                paddingTop: "15px",
                fontSize: "16px",
                backgroundColor: "transparent",
                maxWidth: "100%",
              }}
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
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center" , justifyContent: "start"}}>
            <FileIcon extension={computeExtension(fileFolderData)} />

            <p
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                marginTop: "8px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={() => handleSelectedFile(fileFolderData)}
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
