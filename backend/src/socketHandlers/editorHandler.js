import fs from "fs/promises";

export const handleEditorSocket = (socket) => {
  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder, "utf-8");
      socket.emit("readFileSuccess", {
        data: response,
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log("Error reading the file", error);
      socket.emit("error", {
        data: "Error reading the file",
      });
    }
  });

  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit("writeFileSuccess", {
        data: "File written successfully",
      });
    } catch (error) {
      console.log("Error writing the file", error);
      socket.emit("error", {
        data: "Error writing the file",
      });
    }
  });

  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, "", "wx");
      socket.emit("createFileSuccess", {
        data: "File created successfully",
      });
    } catch (error) {
      console.log("Error creating the file", error);
      socket.emit("error", {
        data: "Error creating the file",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rm(pathToFileOrFolder);
      socket.emit("deleteFileSuccess", {
        data: "File deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the file", error);
      socket.emit("error", {
        data: "Error deleting the file",
      });
    }
  });

  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit("createFolderSuccess", {
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating the folder", error);
      socket.emit("error", {
        data: "Error creating the folder",
      });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
      socket.emit("deleteFolderSuccess", {
        data: "Folder deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the folder", error);
      socket.emit("error", {
        data: "Error deleting the folder",
      });
    }
  });
};
