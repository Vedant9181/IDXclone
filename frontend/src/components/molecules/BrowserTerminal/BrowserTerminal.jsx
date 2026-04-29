import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css"; // required styles
import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { useParams } from "react-router-dom";
import { AttachAddon } from "@xterm/addon-attach";
import axios from "../../../config/axiosConfig";

export function BrowserTerminal() {
  console.log("browser terminal rerender");
  const terminalRef = useRef(null);
  // const socket = useRef(null);
  const { projectId: projectIdFromUrl } = useParams();

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#282a37",
        foreground: "#f8f8f3",
        cursor: "#f8f8f3",
        cursorAccent: "#282a37",
        red: "#ff5544",
        green: "#50fa7c",
        yellow: "#f1fa8c",
        cyan: "#8be9fd",
      },
      fontSize: 16,
      fontFamily: "Fira Code",
      convertEol: true, // convert CRLF to LF
    });

    terminal.open(terminalRef.current);

    let fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    async function initializeTerminal() {
      try {
        const response = await axios.post(
          `/api/v1/container/init/${projectIdFromUrl}`
        );

        console.log(response);

        if (!response.data.success) {
          console.error("Failed to initialize container");
          return;
        }

        console.log("Container ready, connecting WebSocket...");
        const terminalWs = new WebSocket(
          `ws://localhost:3000/terminal?projectId=${projectIdFromUrl}`
        );

        terminalWs.onopen = () => {
          const attachAddon = new AttachAddon(terminalWs);
          terminal.loadAddon(attachAddon);
        };

        terminalWs.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        // setTerminalSocket(ws);
      } catch (error) {
        console.error("Error initializing terminal ws:", error);
      }
    }

    initializeTerminal();
    // let terminalSocket = new WebSocket(
    //   `ws://localhost:3000/terminal?projectId=${projectIdFromUrl}`
    // );

    // terminalSocket.onopen = () => {
    //   const attachAddon = new AttachAddon(terminalSocket);
    //   terminal.loadAddon(attachAddon);
    // };

    // socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
    //   query: {
    //     projectId: projectIdFromUrl,
    //   },
    // });

    // terminal.onData((data) => {
    //   socket.current.emit("shell-input", data);
    // });

    // socket.current.on("shell-output", (data) => {
    //   terminal.write(data);
    // });

    return () => {
      terminal.dispose();
    };
  }, [projectIdFromUrl]);

  return (
    <div
      className="terminal"
      id="terminal-container"
      style={{ height: "25vh", overflow: "auto" }}
      ref={terminalRef}
    >
      {/* yes
    nwe
    fww */}
    </div>
  );
}
