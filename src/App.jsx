import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PreinscripcionForm from "./PreinscripcionForm/PreinscripcionForm";
import TablaPreinscripciones from "./TablaPreinscripciones/TablaPreinscripciones";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link style={styles.link} to="/">Inicio</Link>
        <Link style={styles.link} to="/preinscripcion">Formulario</Link>
        <Link style={styles.link} to="/listado">Listado</Link>
      </nav>

      <Routes>
        <Route path="/preinscripcion" element={<PreinscripcionForm />} />
        <Route path="/listado" element={<TablaPreinscripciones />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#f0f0f0",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
};

export default App;
