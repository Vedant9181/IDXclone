import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import apiRouter from "./routes/index.js";
import { PORT } from "./config/serverConfig.js";
import chokidar from "chokidar";
import { handleEditorSocket } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "./containers/handleContainerCreate.js";
import { WebSocketServer } from "ws";
import { handleTerminalCreation } from "./containers/handleTerminalCreation.js";
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
    // console.log("watcher all event listener");
    // console.log(event, path);
  });

  // socket.on("message", (data) => {
  //   console.log("got a messagae event", data);
  // });

  handleEditorSocket(socket, editorNamespace, projectId);

  socket.on("disconnect", async (reason) => {
    await watcher.close();
    console.log("editor disconnected ", reason);
  });
});

let webSocketServer = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, tcp, head) => {
  const isTerminal = req.url.includes("/terminal");
  const projectId = req.url.split("=")[1];

  if (isTerminal) {
    console.log("Terminal upgrade request:", req.url);
    const container = global.containerMap?.get(projectId);

    if (!container) {
      console.error("Container not found for project:", projectId);
      // tcp.destroy();
      return;
    }

    webSocketServer.handleUpgrade(req, tcp, head, (ws) => {
      console.log("WebSocket upgraded successfully");
      webSocketServer.emit("connection", ws, req, container);
    });
  }
});

webSocketServer.on("connection", (ws, req, container) => {
  console.log("Terminal connected", container);
  handleTerminalCreation(container, ws);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const terminalNamespace = io.of("/terminal");

// terminalNamespace.on("connection", (socket) => {
//   console.log("connected to terminal socket", socket.id);

//   let projectId = socket.handshake.query["projectId"];

//   socket.on("shell-input", (data) => {
//     socket.emit("shell-output", data);
//   });

//   socket.on("disconnect", async (reason) => {
//     console.log("terminal disconnected ", reason, socket.id);
//   });

//   handleContainerCreate(projectId,socket)
// });

// editorNamespace.adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// editorNamespace.adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });
