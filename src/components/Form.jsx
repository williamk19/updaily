import { Box, Button, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase';

const Form = ({ getData }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = async (e) => {
    e.preventDefault();

    const data = {
      date: date.toString() + ' +7',
      title: title,
      description: description,
      status: 'To do',
    };

    await addDoc(collection(db, 'taskCard'), data);
    getData();

    setDate(new Date())
    setTitle('');
    setDescription('');
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        maxWidth: 300,
        minWidth: 300,
      }}>
      <p style={{ fontSize: 30, fontWeight: 'bold' }}>Updaily</p>
      <form onSubmit={addTodo}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 20,
          }}>
          <TextField
            InputProps={{
              sx: {
                borderRadius: 2,
                boxShadow: 2,
              },
            }}
            className='input-rounded'
            id='outlined-basic'
            label='Rencana Hari ini'
            variant='outlined'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              minDate={new Date()}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  boxShadow: 2,
                },
              }}
              className='input-rounded'
              label='Tanggal dan Waktu'
              value={date}
              onChange={(e) => {
                setDate(dayjs(e).utc());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            className='input-rounded'
            InputProps={{
              sx: {
                borderRadius: 2,
                boxShadow: 2,
              },
            }}
            id='outlined-basic'
            label='Deskripsi'
            variant='outlined'
            value={description}
            multiline
            rows={5}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', marginTop: 3 }}>
          <Button
            sx={{ borderRadius: 26, boxShadow: 2 }}
            variant='outlined'
            type='submit'>
            Tambahkan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
