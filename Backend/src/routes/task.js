import Router from "express"
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { getTasks, addTask, updateTaskStatus } from "../controllers/task.js";
const router  = Router()

router.route("/tasks").get(verifyJWT , getTasks); 
router.route("/tasks").post(verifyJWT , addTask); 
router.route("/tasks/:id").put(verifyJWT , updateTaskStatus); 

export default router; 