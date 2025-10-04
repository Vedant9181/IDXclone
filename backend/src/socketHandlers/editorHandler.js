import fs from "fs/promises";

export const handleEditorSocket = (socket, editorNamespace, projectId) => {
  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      let currentSocketRoom = Array.from(socket.rooms).find(
        (room) => room !== socket.id && room.startsWith(projectId)
      ); // the prev room socket had joined

      if (currentSocketRoom) {
        console.log("remov");
        socket.leave(currentSocketRoom);
      }
      var fileName = pathToFileOrFolder.split("\\").pop();

      socket.join(`${projectId}_${fileName}`);

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
      let fileName = pathToFileOrFolder.split("\\").pop();

      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.in(`${projectId}_${fileName}`).emit("writeFileSuccess", {
        data: "File written successfully",
        path: pathToFileOrFolder,
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
      const response = await fs.writeFile(pathToFileOrFolder, "", {
        flag: "wx",
      });
      editorNamespace.emit("createFileSuccess", {
        data: "File created successfully",
      });
    } catch (error) {
      console.log("Error creating the file", error);
      socket.emit("error", {
        data: "Error creating the file",
      });
    }
  });

  socket.on("renameFile", async ({ oldPath, newPath }) => {
    try {
      const response = await fs.rename(oldPath, newPath);
      editorNamespace.emit("renameFileSuccess", {
        data: "File renamed successfully",
      });
    } catch (error) {
      console.log("Error renaming the file", error);
      socket.emit("error", {
        data: "Error renaming the file",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rm(pathToFileOrFolder);
      editorNamespace.emit("deleteFileSuccess", {
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
      editorNamespace.emit("createFolderSuccess", {
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating the folder", error);
      socket.emit("error", {
        data: "Error creating the folder",
      });
    }
  });

  socket.on("renameFolder", async ({ oldPath, newPath }) => {
    try {
      const response = await fs.rename(oldPath, newPath);
      editorNamespace.emit("renameFolderSuccess", {
        data: "Folder renamed successfully",
      });
    } catch (error) {
      console.log("Error renaming the Folder", error);
      socket.emit("error", {
        data: "Error renaming the Folder",
      });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rm(pathToFileOrFolder, { recursive: true, force: true });
      editorNamespace.emit("deleteFolderSuccess", {
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
