import { promisify } from "util";
import child_process from "child_process";

export const execPromisified = promisify(child_process.exec);
