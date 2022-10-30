const router = require("express").Router();
const toDoController = require("../controllers/toDoController");

router.post("/create", toDoController.createToDo);

module.exports = router;
