import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav.js"
import Footer from './components/Footer';
import image from './document-152679_1280.png'

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

    navigate("/create/posts");
  };

  return (
    <>
      <Nav />
      <div style={{ textAlign: "center", width: "30%", margin: "auto auto", fontFamily: "sans-serif", fontWeight: "800" }}>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800" }}>Add Task</h1>
        <Form>
          <Form.Group>
            <Form.Control
              name="task"
              value={post.task}
              onChange={handleChange}
              style={{ marginBottom: "1rem", backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", fontFamily: "cursive" }}
              as="textarea" rows={16}
              size="lg" type="text"
            />
            <Form.Control
              onChange={handleChange}
              name="dueby"
              value={post.dueby}
              style={{ marginBottom: "1rem" }}
              placeholder="due by"
              type="datetime-local"
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
