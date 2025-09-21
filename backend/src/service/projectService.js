import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";
import { execPromisified } from "../utils/execUtility.js";
import directoryTree from "directory-tree";
import path from "path";
export const createProjectService = async () => {
  //
  const projectId = uuidv4();
  console.log("projectId:", projectId);

  await fs.mkdir(`projects/${projectId}`);

  //After this call the vite command in the newly created project folder

  const { stdout, stderr } = await execPromisified(REACT_PROJECT_COMMAND, {
    cwd: `./projects/${projectId}`,
  });

  console.log(stderr);

  return projectId;
};

export const getProjectTreeService = async (projectId) => {
  const projectPath = path.resolve(`./projects/${projectId}`);
  // console.log("project path", projectPath);
  const tree = directoryTree(projectPath);
  // console.log("tree data: \n", tree.path);
  return tree;
};
