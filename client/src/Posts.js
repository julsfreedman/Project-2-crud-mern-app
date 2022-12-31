import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Nav from "./components/Nav.js"
import Footer from './components/Footer';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    task: "",
    dueby: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    console.log(id);

    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const updatePost = (id, task, dueby) => {
    setUpdatedPost((prev) => {
      return {
        ...prev,
        id: id,
        task: task,
        dueby: dueby,
      };
    });
    handleShow();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Nav />
      <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
        <h1 style={{ padding: "0.7em" }}>To Do List</h1>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update a task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              placeholder="task"
              name="task"
              value={updatedPost.task ? updatedPost.task : ""}
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <Form.Control
              placeholder="dueby"
              name="dueby"
              onChange={handleChange}
              value={updatedPost.dueby ? updatedPost.dueby : ""}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveUpdatedPost}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {posts ? (
          <>
            {posts.map((post) => {
              return (
                <div
                  style={{
                    marginBottom: "1rem",
                    border: "solid lightgray 1px",
                    borderRadius: "8px",
                  }}
                  key={post._id}
                >
                  <h4 style={{ marginTop: "1rem" }}>{post.task}</h4>
                  <p>{post.dueby}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",

                      padding: "1rem",
                    }}
                  >
                    <Button
                      variant="outline-info"
                      onClick={() =>
                        updatePost(post._id, post.task, post.dueby)
                      }
                      style={{ width: "100%", marginRight: "1rem" }}
                    >
                      UPDATE
                    </Button>
                    <Button
                      onClick={() => deletePost(post._id)}
                      variant="outline-danger"
                      style={{ width: "100%" }}
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
}

export default Posts;
