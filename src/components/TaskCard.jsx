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
import ClearIcon from "@mui/icons-material/Clear";
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

const TaskCard = ({
  id,
  judul,
  deskripsi,
  tanggal,
  status,
  handleDeleteButton,
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
  };
  // const handleDeleteButton = async () => {
  //   await deleteDoc(doc(db, "taskCard", id));
  //   // setIsDeleted(true);
  // };
  const getData = async () => {
    await getDocs(collection(db, "taskCard"));
  };
  useEffect(() => {
    updateStatus();
  }, [changeStatus]);
  // useEffect(() => {
  //   getData();
  // }, [isDeleted]);
  return (
    <Card
      variant="outlined"
      style={{
        marginTop: 20,
        maxWidth: "500px",
        display: "flex",
        justifyContent: "space-between",
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
      <Box sx={{ fontSize: 14 }} color="text.secondary">
        <FormControl style={{ width: 150, margin: 20 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={changeStatus}
            onChange={handleChange}
          >
            <MenuItem value="">{status}</MenuItem>
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
          <ClearIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
