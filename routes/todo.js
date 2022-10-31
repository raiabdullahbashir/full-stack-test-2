const router = require("express").Router();
const toDoController = require("../controllers/toDoController");
const auth = require("../middlewares/auth");

router.post("/create", auth, toDoController.createToDo);
router.delete("/remove", auth, toDoController.removeToDo);
router.patch("/mark_done", auth, toDoController.mark_todo_Done);
router.get("/marked_done", auth, toDoController.get_todo_marked_done);
router.get("/incomplete", auth, toDoController.get_todo_incomplete);

module.exports = router;
