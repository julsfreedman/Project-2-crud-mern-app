import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
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
    <div style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1>Create post page</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="title"
          />
          <Form.Control
            onChange={handleChange}
            name="description"
            value={post.description}
            style={{ marginBottom: "1rem" }}
            placeholder="description"
          />
        </Form.Group>
        <Button
          onClick={createPost}
          variant="outline-success"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE POST
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-success"
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        ALL POSTS
      </Button>
      <Button
        onClick={() => navigate("/")}
        variant="outline-success"
        style={{ width: "100%" }}
      >
        HOME PAGE
      </Button>
    </div>
  );
}

export default CreatePost;
