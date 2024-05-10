import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import TaskCard from 'components/TaskCard';
import { db } from 'config/firebase';
import { collection, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
import Form from 'components/Form';
import useAuthStore from 'store/useAuthStore';

const Home = () => {
  const { user } = useAuthStore((state) => state);
  const [data, setData] = useState([]);
  dayjs.extend(utc);

  const getData = async () => {
    const querySnapshot = await getDocs(
      collection(db, 'taskCard'),
      where('userId', '==', user.uid),
    );
    setData(querySnapshot.docs);
  };

  const handleDeleteButton = async (db, id) => {
    await deleteDoc(doc(db, 'taskCard', id));
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='Home'>
      <Box
        sx={{
          gap: 5,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: { xs: 'center', md: 'normal' },
          justifyContent: 'center',
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
            gap: 3,
            alignItems: {
              xs: 'center',
              md: 'normal',
            },
            paddingTop: 5,
          }}>
          <Box
            sx={{
              width: 250,
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
              }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}>
                To Do
              </Typography>
            </Box>
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
          <Box
            sx={{
              width: 250,
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
              }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}>
                In Progress
              </Typography>
            </Box>
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
          <Box
            sx={{
              width: 250,
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
              }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}>
                Done
              </Typography>
            </Box>
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
    </div>
  );
};

export default Home;
