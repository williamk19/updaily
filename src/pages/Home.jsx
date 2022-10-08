import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TaskCard from "../components/TaskCard";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const data = [
  {
    id: 1,
    judul: "Ini task pertama",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellat blanditiis hic a enim consectetur soluta ad doloribus, error commodi voluptates molestias facilis odit vitae sunt molestiae rem. Earum, in!",
    tanggal: dayjs("2014-08-18T21:11:54"),
  },
  {
    id: 2,
    judul: "Ini task kedua",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellat blanditiis hic a enim consectetur soluta ad doloribus, error commodi voluptates molestias facilis odit vitae sunt molestiae rem. Earum, in!",
    tanggal: dayjs("2014-08-18T21:11:54"),
  },
];

const Home = () => {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const addTodo = async (e) => {
    e.preventDefault();
    console.log(`mau ${title}, pada ${value}, ${description}`);

    await setDoc(doc(db, "taskCard", "valueCard"), {
      date: "value",
      title: "title",
      description: "description",
      inProgress: false,
    });

    // const docRef = await addDoc(collection(db, "taskCard"), {
    //   date: value,
    //   description: description,
    //   isProgress: false,
    //   title: title,
    // });
    // console.log("Document written with ID: ", docRef.id);
  };
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
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{}}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={value}
                  onChange={handleChange}
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
            {data.map((d) => (
              <TaskCard
                key={d.id}
                judul={d.judul}
                deskripsi={d.deskripsi}
                tanggal={d.tanggal}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
