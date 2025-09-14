import { promisify } from "util";
import child_process from "child_process";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const execPromisified = promisify(child_process.exec);

export const createProjectController = async (req, res) => {
  try {
    // const { stdout, stderr } = await execPromisified("dir");
    // console.log("stdout:", stdout);
    // console.log("stderr:", stderr);
    // res.status(200).json({ message: "Project created successfully" });

    //create a unique id then inside projects folder create a folder with that id

    const projectId = uuidv4();
    console.log("projectId:", projectId);

    await fs.mkdir(`projects/${projectId}`);

    //After this call the vite command in the newly created project folder

    const { stdout, stderr } = await execPromisified(
      "npm create vite@latest sandbox -- --template react",
      {
        cwd: `./projects/${projectId}`,
      }
    );

    console.log(stderr);

    return res.json({
      message: "Project created",
      data: projectId,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};
