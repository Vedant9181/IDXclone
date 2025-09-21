import express from "express";
import {
  createProjectController,
  getProjectTree,
} from "../../controller/projectController.js";
const router = express.Router();

router.post("/", createProjectController);
router.get("/:projectId", getProjectTree);
export default router;
