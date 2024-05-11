import React from 'react';
import { CardContent, Typography, Box, Card } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'config/firebase';

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
  const formattedDate = new Date(tanggal).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const updateStatus = async (status) => {
    const data = {
      status,
    };
    await updateDoc(doc(db, 'taskCard', id), data);
    getData();
  };

  const handleChange = async (e) => {
    e.preventDefault();
    updateStatus(e.target.value);
  };

  return (
    <Card
      className='TaskCard'
      variant='outlined'
      sx={{
        width: '100%',
        marginBottom: 2,
        boxShadow: 2,
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}>
      <CardContent>
        <Typography
          sx={{
            fontWeight: 600,
          }}
          component='div'>
          {judul}
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: 13, fontWeight: 500 }}
          color='text.secondary'>
          {`${formattedDate}`}
        </Typography>
        <Typography variant='body2'>{deskripsi}</Typography>
      </CardContent>
      <Box
        sx={{
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        color='text.secondary'>
        <FormControl style={{ width: 150, margin: 20 }}>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={status}
            onChange={handleChange}
            style={{ height: 40 }}
            sx={{ borderRadius: 3, backgroundColor: color, boxShadow: 2 }}>
            <MenuItem value={'To do'}>To do</MenuItem>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Finish'}>Finish</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          aria-label='delete'
          color='error'
          sx={{
            mr: 1,
          }}
          onClick={() => {
            handleDeleteButton(db, id);
          }}>
          <DeleteIcon style={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
