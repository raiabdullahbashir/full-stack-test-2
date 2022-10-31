const TODOs = require("../models/toDoTask");
const User = require("../models/User");

const toDoController = {
  createToDo: async (req, res) => {
    try {
      const { content } = req.body;
      const user = await User.findById(req.user.id).select("-password");

      if (!content)
        return res.status(400).json({ msg: "Please provide content of todo." });
      const newToDo = new TODOs({
        user: req.user.id,
        content,
      });
      await newToDo.save();
      res.json({ msg: "New todo has been created!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeToDo: async (req, res) => {
    try {
      TODOs.deleteOne({ _id: req.body, user: req.user.id }, (err, data) => {
        if (err) {
          res.status(400).json({ msg: err.message });
        } else {
          if (data.deletedCount === 1) {
            res.status(200).json({ msg: "todo removed successfully." });
          } else {
            res.status(400).json({ msg: "todo not found." });
          }
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: "Server Error." });
    }
  },
  mark_todo_Done: async (req, res) => {
    try {
      const id = { _id: req.body, user: req.user.id };
      const update = { isCompleted: true };
      let doc = await TODOs.findOneAndUpdate(id, update, { new: true });
      if (doc) res.status(201).json({ msg: "todo marked done." });
      else res.status(200).json({ msg: "Id not found." });
    } catch (err) {
      return res.status(500).json({ msg: "Invalid Id." });
    }
  },
  get_todo_marked_done: async (req, res) => {
    try {
      let doc = await TODOs.find({ isCompleted: true, user: req.user.id });
      if (doc) res.status(200).json({ msg: "Done TODOs found.", results: doc });
      else res.status(201).json({ msg: "marked TODOs not found." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  get_todo_incomplete: async (req, res) => {
    try {
      let doc = await TODOs.find({ isCompleted: false, user: req.user.id });
      if (!doc) res.status(200).json({ results: doc });
      else res.status(201).json({ msg: "Incomplete TODOs not found." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = toDoController;
