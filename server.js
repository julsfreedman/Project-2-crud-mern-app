const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//connect to mongodb
mongoose
  .connect("mongodb+srv://julsfreedman:Fr1sc0D1es3l@cycle-30-cluster.4picfrb.mongodb.net/Project-2-crud-mern-app?retryWrites=true&w=majority")
  .catch((err) => console.log(err));

//data schema
const postSchema = mongoose.Schema({
  title: String,
  description: String,
});

//data model
const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
  res.send("express is here");
});

//create route
app.post("/create", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
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
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Express app running on port ${PORT}`)
});
