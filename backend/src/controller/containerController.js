import Docker from "dockerode";

let docker = new Docker();

export const createContainer = async (req, res) => {
  try {
    // console.log(process.cwd());

    const projectId = req.params.projectId;

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

    global.containerMap = global.containerMap || new Map();
    global.containerMap.set(projectId, container);

    return res.json({
      success: true,
      containerId: container.id,
      message: "Container ready for terminal connection",
    });
  } catch (error) {
    console.log("Error creating container", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
