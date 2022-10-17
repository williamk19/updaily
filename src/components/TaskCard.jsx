import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Card,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

const TaskCard = ({
  id,
  judul,
  deskripsi,
  tanggal,
  status,
  handleDeleteButton,
  getData,
  color,
}) => {
  const [changeStatus, setChangeStatus] = useState(status);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleChange = async (e) => {
    e.preventDefault();
    setChangeStatus(e.target.value);
  };
  const updateStatus = async () => {
    const data = {
      status: changeStatus,
    };
    await updateDoc(doc(db, "taskCard", id), data);
    getData();
  };

  useEffect(() => {
    updateStatus();
  }, [changeStatus]);

  return (
    <Card
      className="TaskCard"
      variant="outlined"
      style={{
        marginTop: 20,
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 26,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {judul}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${tanggal}`}
        </Typography>
        <Typography variant="body2">{deskripsi}</Typography>
      </CardContent>
      <Box
        sx={{
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        color="text.secondary"
      >
        <FormControl style={{ width: 150, margin: 20 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={changeStatus}
            onChange={handleChange}
            sx={{ borderRadius: 20, backgroundColor: color }}
          >
            <MenuItem value={status}>{status}</MenuItem>
            <MenuItem value={"To do"}>To do</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Finish"}>Finish</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => {
            handleDeleteButton(db, id);
          }}
        >
          <DeleteIcon style={{ fontSize: 30, marginRight: 10 }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
