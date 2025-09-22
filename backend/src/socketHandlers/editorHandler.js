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
};
