import { useState, useEffect, useRef } from "react";
import { useFileSystemModalStore } from "../../../store/fileSystemModalStore.js";
import { Input, Modal } from "antd";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";

export const ModalManager = () => {
  const {
    isOpen: isModalOpen,
    operation,
    targetPath,
    currentName,
    closeModal,
    requiresInput,
  } = useFileSystemModalStore();

  const { editorSocket } = useEditorSocketStore();

  const [inputValue, setInputValue] = useState(currentName);
  const [inputStatus, setInputStatus] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && requiresInput) {
      setInputValue(currentName);
      inputRef.current.focus();
    }
  }, [isModalOpen, currentName]);

  if (!isModalOpen) return null;

  const getModalConfig = () => {
    console.log("cuurentName: ", currentName);
    //get modal config based on operation
    switch (operation) {
      case "createFile":
        return {
          title: "Create New File",
          placeholder: "Enter file name (e.g., index.js)",
          defaultValue: "",
          okText: "Create",
        };
      case "createFolder":
        return {
          title: "Create New Folder",
          placeholder: "Enter folder name",
          defaultValue: "",
          okText: "Create",
        };
      case "renameFile":
        return {
          title: "Rename File",
          placeholder: "Enter new file name",
          defaultValue: currentName,
          okText: "Rename",
        };
      case "renameFolder":
        return {
          title: "Rename Folder",
          placeholder: "Enter new folder name",
          defaultValue: currentName,
          okText: "Rename",
        };
      case "deleteFolder":
        return {
          title: "Delete Folder",
          message: `Are you sure you want to delete "${currentName}"?`,
          okText: "Delete",
          okType: "danger",
        };

      case "deleteFile":
        return {
          title: "Delete File",
          message: `Are you sure you want to delete "${currentName}"?`,
          okText: "Delete",
          okType: "danger",
        };
    }
  };

  function handleOk() {
    if (requiresInput && !inputValue) {
      setInputStatus("error");
      return;
    }

    const fileFolderName = inputValue?.trim();

    switch (operation) {
      case "createFile":
        editorSocket.emit("createFile", {
          pathToFileOrFolder: `${targetPath}\\${fileFolderName}`,
        });
        break;

      case "createFolder":
        editorSocket.emit("createFolder", {
          pathToFileOrFolder: `${targetPath}\\${fileFolderName}`,
        });
        break;

      case "renameFile": {
        // targetPath is the full path to the file
        const fileDir = targetPath.substring(0, targetPath.lastIndexOf("\\"));
        editorSocket.emit("renameFile", {
          oldPath: targetPath,
          newPath: `${fileDir}\\${fileFolderName}`,
        });
        break;
      }

      case "renameFolder": {
        const folderDir = targetPath.substring(0, targetPath.lastIndexOf("\\"));
        editorSocket.emit("renameFolder", {
          oldPath: targetPath,
          newPath: `${folderDir}\\${fileFolderName}`,
        });
        break;
      }

      case "deleteFile":
        editorSocket.emit("deleteFile", { pathToFileOrFolder: targetPath });
        break;

      case "deleteFolder":
        editorSocket.emit("deleteFolder", { pathToFileOrFolder: targetPath });
        break;

      default:
        console.error("Unknown operation:", operation);
    }

    closeModal();
    setInputValue(null);
    setInputStatus(null);
  }

  function handleCancel() {
    closeModal();
    setInputValue(null);
    setInputStatus(null);
  }

  const modalConfig = getModalConfig();

  return (
    <Modal
      title={
        inputStatus === "error"
          ? "A new file or folder must be provided"
          : modalConfig.title
      }
      closable={false}
      centered={true}
      maskClosable={false}
      open={isModalOpen}
      onOk={handleOk}
      okText={modalConfig.okText}
      okButtonProps={
        modalConfig.okType === "danger" ? { danger: true } : undefined
      }
      onCancel={handleCancel}
    >
      {requiresInput ? (
        <Input
          ref={inputRef}
          placeholder={modalConfig.placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleOk}
          // defaultValue={modalConfig.defaultValue}
          status={inputStatus}
        />
      ) : (
        <p>{modalConfig.message}</p>
      )}
    </Modal>
  );
};
