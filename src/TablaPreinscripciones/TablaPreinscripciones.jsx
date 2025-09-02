import React, { useEffect, useState } from "react";
import { db } from "../db/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const TablaPreinscripciones = () => {
  const [rows, setRows] = useState([]);

  // Cargar datos desde Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "preinscripciones"));
        const data = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id, // Necesario para DataGrid
            ...d,
            creadoEn: d.creadoEn?.toDate().toLocaleString() ?? "",
            estado: d.estado ?? "Pendiente",
          };
        });
        setRows(data);
      } catch (error) {
        console.error("Error obteniendo datos de Firestore:", error);
      }
    };

    fetchData();
  }, []);

  // Función para actualizar estado en Firestore
  const handleEstado = async (id, nuevoEstado) => {
    try {
      const ref = doc(db, "preinscripciones", id);
      await updateDoc(ref, { estado: nuevoEstado });

      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, estado: nuevoEstado } : row
        )
      );
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  // Definición de columnas para DataGrid
  const columns = [
    { field: "nombres", headerName: "Nombres", flex: 1 },
    { field: "apellidos", headerName: "Apellidos", flex: 1 },
    { field: "email", headerName: "Correo", flex: 1.5 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "ciudad", headerName: "Ciudad", flex: 1 },
    { field: "pais", headerName: "País", flex: 1 },
    { field: "colegio", headerName: "Colegio", flex: 1 },
    { field: "anioGraduacion", headerName: "Año Graduación", flex: 1 },
    { field: "promedio", headerName: "Promedio", flex: 1 },
    { field: "carreraDeseada", headerName: "Carrera", flex: 1 },
    { field: "modalidad", headerName: "Modalidad", flex: 1 },
    { field: "comentarios", headerName: "Comentarios", flex: 1.5 },
    { field: "creadoEn", headerName: "Fecha Envío", flex: 1.2 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Aprobado"
              ? "success"
              : params.value === "Rechazado"
              ? "error"
              : "warning"
          }
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Aprobar">
            <IconButton
              color="success"
              onClick={() => handleEstado(params.row.id, "Aprobado")}
            >
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Rechazar">
            <IconButton
              color="error"
              onClick={() => handleEstado(params.row.id, "Rechazado")}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Inscritos
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
        }}
      />
    </Box>
  );
};

export default TablaPreinscripciones;
