import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import TaskCard from 'components/TaskCard';
import { db } from 'config/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
} from 'firebase/firestore';
import Form from 'components/Form';
import useAuthStore from 'store/useAuthStore';
import { grey } from '@mui/material/colors';
import { Navigate } from 'react-router-dom';
import Navbar from 'components/Navbar';

const Home = () => {
  const { user } = useAuthStore((state) => state);
  const [data, setData] = useState([]);
  dayjs.extend(utc);

  const getData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'taskCard'), where('userId', '==', user.uid)),
    );
    setData(querySnapshot.docs);
  };

  const handleDeleteButton = async (db, id) => {
    await deleteDoc(doc(db, 'taskCard', id));
    getData();
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, []);

  if (!user) {
    return (
      <Navigate
        to='/auth'
        replace
      />
    );
  }

  return (
    <div className='Home'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Navbar />
        <Box
          sx={{
            gap: {
              xs: 0,
              md: 4,
            },
            maxWidth: '72rem',
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            paddingBottom: 5,
          }}>
          <Form getData={getData} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              width: {
                xs: '100%',
                md: '70%'
              },
              gap: 3,
              alignItems: {
                xs: 'center',
                md: 'normal',
              },
            }}>
            <Box
              sx={{
                width: {
                  xs: '85vw',
                  sm: '80vw',
                  md: '33.3%',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}>
              <Box
                sx={{
                  border: '2px solid #1C588E',
                  backgroundColor: '#b0d5f8',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 2,
                }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}>
                  To Do
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  p: '1rem',
                  height: '75vh',
                  overflowY: 'scroll',
                  pr: 1,
                  background: grey[100],
                }}>
                {data
                  .filter((e) => {
                    return e.data().status === 'To do';
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
                        color='#e4f2ff'
                      />
                    );
                  })}
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '85vw',
                  sm: '80vw',
                  md: '33.3%',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}>
              <Box
                sx={{
                  border: '2px solid #CBC42B',
                  backgroundColor: '#fffcd2',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 2,
                }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}>
                  In Progress
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  p: '1rem',
                  height: '75vh',
                  overflowY: 'scroll',
                  pr: 1,
                  background: grey[100],
                }}>
                {data
                  .filter((e) => {
                    return e.data().status === 'In Progress';
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
                        color='#fffde9'
                      />
                    );
                  })}
              </Box>
            </Box>
            <Box
              sx={{
                width: {
                  xs: '85vw',
                  sm: '80vw',
                  md: '33.3%',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}>
              <Box
                sx={{
                  border: '2px solid #31A515',
                  backgroundColor: '#cff8c5',
                  padding: 1.5,
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 2,
                }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}>
                  Done
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  p: '1rem',
                  height: '75vh',
                  overflowY: 'scroll',
                  pr: 1,
                  background: grey[100],
                }}>
                {data
                  .filter((e) => {
                    return e.data().status === 'Finish';
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
                        color='#eafdee'
                      />
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
