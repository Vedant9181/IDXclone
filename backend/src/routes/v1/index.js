import express from "express";
import { pingCheck } from "../../controller/pingController.js";
import projectRouter from "./project.js";
import { createContainer } from "../../controller/containerController.js";
const router = express.Router();

router.get("/ping", pingCheck);
router.use("/projects", projectRouter);
router.post("/container/init/:projectId", createContainer);

export default router;
