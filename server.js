require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    // console.log("Connected to mongodb");
  }
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
