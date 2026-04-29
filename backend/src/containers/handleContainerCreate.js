import Docker from "dockerode";

const docker = new Docker();

export const handleContainerCreate = async (
  projectId,
  webSocketServer,
  req,
  tcpSocket,
  head
) => {
  try {
    console.log(process.cwd());
    const container = await docker.createContainer({
      Image: "sandbox", // name given by us for the written dockerfile
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Cmd: ["/bin/bash"],
      Tty: true,
      User: "sandbox",
      ExposedPorts: {
        "5173/tcp": {},
      },
      Env: ["HOST=0.0.0.0"],
      HostConfig: {
        Binds: [
          // mounting the project directory to the container
          `${process.cwd()}\\projects\\${projectId}:/home/sandbox/app`,
        ],
        PortBindings: {
          "5173/tcp": [
            {
              HostPort: "0", // random port will be assigned by docker
            },
          ],
        },
      },
    });

    console.log("Container created", container.id);

    await container.start();

    webSocketServer.handleUpgrade(
      req,
      tcpSocket,
      head,
      (eestablishedWSConn) => {
        webSocketServer.emit("connection", eestablishedWSConn, req, container);
      }
    );

    console.log("container started");
  } catch (error) {
    console.log("Error creating container", error);
  }
};
