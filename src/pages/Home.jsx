import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TaskCard from "../components/TaskCard";
import { db } from "../firebase";
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
    // const docRef = await addDoc(collection(db, "taskCard"), {
    //   date: value,
    //   description: description,
    //   isProgress: false,
    //   title: title,
    // });
    // console.log("Document written with ID: ", docRef.id);
  };
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "taskCard"));
    // console.log(querySnapshot.docs);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          <p style={{ fontSize: 50, fontWeight: "bold" }}>Todo-List Keren</p>

          <form onSubmit={addTodo}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="outlined-basic"
                label="Rencana Hari ini"
                variant="outlined"
                value={title}
                style={{ marginRight: 20 }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={date}
                  onChange={(e) => {
                    setDate(dayjs(e).utc());
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              fullWidth
              style={{ marginBottom: 20, marginTop: 20 }}
              id="outlined-basic"
              label="Deskripsi"
              variant="outlined"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Box style={{ display: "flex" }}>
              <Button variant="outlined" type="submit">
                Tambahkan
              </Button>
            </Box>
          </form>

          <Box sx={{ minWidth: 275 }}>
            {data
              .sort((a, b) => {
                return new Date(a.data().date) - new Date(b.data().date);
              })
              .map((d, index) => {
                // console.log(d.data());
                // console.log(new Date(d.data().date));
                // d.sort(function (a, b) {
                //   // Turn your strings into dates, and then subtract them
                //   // to get a value that is either negative, positive, or zero.
                //   return new Date(b.data().date) - new Date(a.data().date);
                // });
                return (
                  <TaskCard
                    key={index}
                    id={d.id}
                    judul={d.data().title}
                    deskripsi={d.data().description}
                    tanggal={d.data().date}
                    status={d.data().status}
                    handleDeleteButton={handleDeleteButton}
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
