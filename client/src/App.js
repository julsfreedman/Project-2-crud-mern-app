import "./App.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from './components/Nav';
import Footer from './components/Footer';
import myGif from './productivity-quotes-Bruce-Lee-final.gif'

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Nav />
      <>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: "800" }}>TCOB</h1>
      </>
      <img src={myGif} alt="my-gif" style={{ borderRadius: "20px" }} /><br />
      <Button
        variant="dark"
        size="lg"
        style={{ marginTop: "1rem" }}
        onClick={() => navigate("createPost")}
      >
        Get Started
      </Button>
      <Footer />
    </div >
  );
}

export default App;
