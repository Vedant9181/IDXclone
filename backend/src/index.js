import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import apiRouter from "./routes/index.js";
import { PORT } from "./config/serverConfig.js";
import chokidar from "chokidar";
import { handleEditorSocket } from "./socketHandlers/editorHandler.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");
});

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
  // console.log(socket)
  // console.log(socket.handshake.query.projectId);
  const projectId = socket.handshake.query.projectId;

  const watcher = chokidar.watch(`./projects/${projectId}`, {
    ignored: (path) => path.includes("node_modules"),
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
    },
    ignoreInitial: true,
  });

  watcher.on("all", (event, path) => {
    console.log("watcher all event listener");
    console.log(event, path);
  });

  // socket.on("message", (data) => {
  //   console.log("got a messagae event", data);
  // });

  handleEditorSocket(socket);

  socket.on("disconnect", async (reason) => {
    await watcher.close();
    console.log("editor disconnected ", reason);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
