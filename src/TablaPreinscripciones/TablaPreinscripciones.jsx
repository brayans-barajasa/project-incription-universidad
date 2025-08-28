import React, { useEffect, useState } from "react";
import { db } from "../db/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { AgGridReact } from "ag-grid-react";
import "./TablaPreinscripciones.css";

const TablaPreinscripciones = () => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "nombres", filter: true },
    { field: "apellidos", filter: true },
    { field: "email", filter: true },
    { field: "telefono", filter: true },
    { field: "ciudad", filter: true },
    { field: "pais", filter: true },
    { field: "colegio", filter: true },
    { field: "anioGraduacion", headerName: "Año Graduación", filter: true },
    { field: "promedio", filter: true },
    { field: "carreraDeseada", headerName: "Carrera", filter: true },
    { field: "modalidad", filter: true },
    { field: "comentarios", filter: true },
    { field: "creadoEn", headerName: "Fecha Envío", filter: true },
  ]);

  // Cargar datos desde Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "preinscripciones"));
        const data = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            ...d,
            creadoEn: d.creadoEn?.toDate().toLocaleString() ?? "",
          };
        });
        setRowData(data);
      } catch (error) {
        console.error("Error obteniendo datos de Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="ag-theme-alpine table-container"
      style={{ height: "600px", width: "100%" }}
    >
      <h2>Listado de Preinscripciones</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
      />
    </div>
  );
};

export default TablaPreinscripciones;
