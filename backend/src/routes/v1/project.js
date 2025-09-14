import express from "express";
import { createProjectController } from "../../controller/projectController.js";
const router = express.Router();

router.post("/", createProjectController);

export default router;
