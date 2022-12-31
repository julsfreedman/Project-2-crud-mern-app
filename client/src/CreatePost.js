import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav.js"
import Footer from './components/Footer';

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    task: "",
    dueby: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (event) => {
    event.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <>
      <Nav />
      <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
        <h1>Add Task</h1>
        <Form>
          <Form.Group>
            <Form.Control
              name="task"
              value={post.task}
              onChange={handleChange}
              style={{ marginBottom: "1rem" }}
              placeholder="task"
            />
            <Form.Control
              onChange={handleChange}
              name="dueby"
              value={post.dueby}
              style={{ marginBottom: "1rem" }}
              placeholder="due by"
            />
          </Form.Group>
          <Button
            onClick={createPost}
            variant="dark"
          >
            CREATE TASK
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default CreatePost;
