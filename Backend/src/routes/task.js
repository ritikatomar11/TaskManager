import Router from "express"

const router  = Router()

router.route("/tasks").get(verifyJWT , getTasks); 
router.route("/tasks").post(verifyJWT , addTask); 
router.route("/tasks/:id").put(verifyJWT , updateTaskStatus); 

export default router; 