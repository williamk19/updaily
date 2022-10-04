import { Box, TextField } from "@mui/material";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TaskCard from '../components/TaskCard';

const data = [
  {
    id: 1,
    judul: "Ini task pertama",
    deskripsi: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellat blanditiis hic a enim consectetur soluta ad doloribus, error commodi voluptates molestias facilis odit vitae sunt molestiae rem. Earum, in!",
    tanggal: dayjs("2014-08-18T21:11:54")
  },
  {
    id: 2,
    judul: "Ini task kedua",
    deskripsi: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellat blanditiis hic a enim consectetur soluta ad doloribus, error commodi voluptates molestias facilis odit vitae sunt molestiae rem. Earum, in!",
    tanggal: dayjs("2014-08-18T21:11:54")
  },
];

const Home = () => {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
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
          <Box>
            <TextField
              id="outlined-basic"
              label="Rencana Hari ini"
              variant="outlined"
              style={{ marginRight: 20 }}
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
          <TextField id="outlined-basic" label="Deskripsi" variant="outlined" />
          <Box style={{ display: "flex" }}>
            <Button variant="outlined">Tambahkan</Button>
          </Box>
          <Box sx={{ minWidth: 275 }}>
            {data.map((d) => (
              <TaskCard key={d.id} judul={d.judul} deskripsi={d.deskripsi} tanggal={d.tanggal} />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
