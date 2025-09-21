import {
  createProjectService,
  getProjectTreeService,
} from "../service/projectService.js";

export const createProjectController = async (req, res) => {
  try {
    const projectId = await createProjectService();
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

export const getProjectTree = async (req, res) => {
  try {
    const tree = await getProjectTreeService(req.params.projectId);

    return res.status(200).json({
      data: tree,
      success: true,
      message: "Successfully fetched the tree",
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};
