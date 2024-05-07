import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const Form = ({ getData }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (isAlertOpen === false) {
      setTimeout(() => {
        setAlertMessage('');
      }, 3000)
    }
  }, [isAlertOpen]);

  const addTodo = async (e) => {
    e.preventDefault();

    if (title.length < 3 || description < 3) {
      setIsAlertOpen(true);
      setAlertMessage('Judul rencana dan deskripsi minimal 2 karakter');
      return;
    }

    const data = {
      date: date.toString() + ' +7',
      title: title,
      description: description,
      status: 'To do',
    };

    await addDoc(collection(db, 'taskCard'), data);
    getData();

    setDate(new Date());
    setTitle('');
    setDescription('');
  };

  const closeIsAlertOpen = () => {
    setIsAlertOpen(false);
  };

  return (
    <Box
      sx={{
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 300,
        minWidth: 300,
      }}>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={5000}
        onClose={closeIsAlertOpen}
        message='Note archived'>
        <Alert
          onClose={closeIsAlertOpen}
          severity='error'>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 'bold',
            textShadow: '1px 1px 1px rgba(0,0,0,0.25);',
          }}>
          UpDaily.
        </Typography>
        <Typography fontSize={12}>
          Simplify tasks in a Kanban-style interface, effortlessly organizing
          to-do lists for enhanced daily productivity and efficiency.
        </Typography>
      </Box>
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
            sx={{ borderRadius: 2, boxShadow: 2 }}
            variant='contained'
            type='submit'>
            Tambahkan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
