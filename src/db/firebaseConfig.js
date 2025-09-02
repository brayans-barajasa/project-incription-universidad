// Importa Firebase core + Firestore + Auth
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwi72hCizg8mBDlbefNOX5_GNpPVrbu8Y",
  authDomain: "inscripcionunversidad.firebaseapp.com",
  projectId: "inscripcionunversidad",
  storageBucket: "inscripcionunversidad.firebasestorage.app",
  messagingSenderId: "576058214151",
  appId: "1:576058214151:web:10cf2d320a18ec519be7a2",
  measurementId: "G-7PHC7YYKQL",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Auth
const auth = getAuth(app);

// Exporta para usar en otros archivos
export { db, auth };
