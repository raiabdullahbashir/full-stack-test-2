const TODOs = require("../models/toDoTask");

const toDoController = {
  createToDo: async (req, res) => {
    try {
      //   const { content } = req.body;
      //   console.log("content: " + content);
      //   if (!content)
      //     return res.status(400).json({ msg: "Please provide content of todo." });

      const newToDo = new TODOs({
        content: "gbhnjW cfvgbjhn",
      });
      await newToDo.save();
      console.log("newToDo" + newToDo);

      res.json({ msg: "New todo has been created!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = toDoController;
