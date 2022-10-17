import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TaskCard from "../components/TaskCard";
import { db } from "../firebase";
import "../App.css";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Home = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(dayjs("").toString());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  dayjs.extend(utc);
  const addTodo = async (e) => {
    e.preventDefault();

    console.log(`mau ${title}, pada ${date}, ${description}`);
    const data = {
      date: date.toString(),
      title: title,
      description: description,
      status: "To do",
    };

    await addDoc(collection(db, "taskCard"), data);
    getData();
  };
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "taskCard"));

    setData(querySnapshot.docs);
  };

  const handleDeleteButton = async (db, id) => {
    await deleteDoc(doc(db, "taskCard", id));
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Home">
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 30, fontWeight: "bold" }}>Todo-List Keren</p>

          <form onSubmit={addTodo}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                className="input-rounded"
                id="outlined-basic"
                label="Rencana Hari ini"
                variant="outlined"
                value={title}
                sx={{ marginBottom: 2 }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="input-rounded"
                  label="Date&Time picker"
                  value={date}
                  onChange={(e) => {
                    setDate(dayjs(e).utc());
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ borderRadius: 26 }}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              fullWidth
              className="input-rounded"
              style={{ marginBottom: 20, marginTop: 20, borderRadius: 26 }}
              id="outlined-basic"
              label="Deskripsi"
              variant="outlined"
              value={description}
              multiline
              rows={5}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Box sx={{ display: "flex" }}>
              <Button
                style={{ borderRadius: 26 }}
                variant="outlined"
                type="submit"
              >
                Tambahkan
              </Button>
            </Box>
          </form>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 30,
            marginLeft: 20,
          }}
        >
          <Box
            sx={{
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                border: "2px solid #1C588E",
                width: 300,
                backgroundColor: "#4D9EE8",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 4.5,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
              }}
            >
              To Do
            </Typography>
            {data
              .filter((e) => {
                return e.data().status === "To do";
              })
              .sort((a, b) => {
                return new Date(a.data().date) - new Date(b.data().date);
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    judul={d.data().title}
                    deskripsi={d.data().description}
                    tanggal={d.data().date}
                    status={d.data().status}
                    handleDeleteButton={handleDeleteButton}
                    getData={getData}
                    color="#D4EBFF"
                  />
                );
              })}
          </Box>
          <Box
            sx={{
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                border: "2px solid #CBC42B",
                width: 300,
                backgroundColor: "#FAF357",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 4.5,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
              }}
            >
              In Progress
            </Typography>
            {data
              .filter((e) => {
                return e.data().status === "In Progress";
              })
              .sort((a, b) => {
                return new Date(a.data().date) - new Date(b.data().date);
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    judul={d.data().title}
                    deskripsi={d.data().description}
                    tanggal={d.data().date}
                    status={d.data().status}
                    handleDeleteButton={handleDeleteButton}
                    getData={getData}
                    color="#FFFCE3"
                  />
                );
              })}
          </Box>
          <Box
            sx={{
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                border: "2px solid #31A515",
                width: 300,
                backgroundColor: "#6AF048",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 4.5,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
              }}
            >
              Finish
            </Typography>
            {data
              .filter((e) => {
                return e.data().status === "Finish";
              })
              .sort((a, b) => {
                return new Date(a.data().date) - new Date(b.data().date);
              })
              .map((d, index) => {
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    judul={d.data().title}
                    deskripsi={d.data().description}
                    tanggal={d.data().date}
                    status={d.data().status}
                    handleDeleteButton={handleDeleteButton}
                    getData={getData}
                    color="#E3FFE9"
                  />
                );
              })}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
