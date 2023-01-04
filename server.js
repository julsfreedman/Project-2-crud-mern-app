const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Always require and configure near the top
require('dotenv').config()
const path = require('path');

//config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//connect to mongodb
mongoose
  .connect(process.env.DATABASE_URL)
  .catch((err) => console.log(err));

//data schema
const postSchema = mongoose.Schema({
  task: String,
  dueby: String,
});

//data model
const Post = mongoose.model("Post", postSchema);


//create route
app.post("/create", (req, res) => {
  const newPost = new Post({
    task: req.body.task,
    dueby: req.body.dueby,
  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//read route
app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

//delete route
app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

//update route
app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      task: req.body.task,
      dueby: req.body.dueby,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`)
});
