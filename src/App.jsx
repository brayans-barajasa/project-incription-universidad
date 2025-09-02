import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreinscripcionForm from "./PreinscripcionForm/PreinscripcionForm";
import TablaPreinscripciones from "./TablaPreinscripciones/TablaPreinscripciones";
import Home from "./Home/Home";
import "./app.css";
import Navbar from "./AppBar/AppBar";

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 fijo arriba */}
      <div style={{ marginTop: "80px" }}>
        {" "}
        {/* 👈 margen para que no tape */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preinscripcion" element={<PreinscripcionForm />} />
          <Route path="/listado" element={<TablaPreinscripciones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
