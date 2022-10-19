import { Box, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Form = ({ getData }) => {
  const [date, setDate] = useState(dayjs("").toString());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  useEffect(() => {
    getData();
  }, []);
  return (
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
          <Button style={{ borderRadius: 26 }} variant="outlined" type="submit">
            Tambahkan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
