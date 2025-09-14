import express from "express";
import { pingCheck } from "../../controller/pingController.js";
import projectRouter from "./project.js";

const router = express.Router();

router.get("/ping", pingCheck);
router.use("/projects", projectRouter);

export default router;
