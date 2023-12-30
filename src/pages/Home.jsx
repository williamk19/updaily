import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import TaskCard from "../components/TaskCard";
import { db } from "../firebase";
import "../App.css";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Form from "../components/Form";

const Home = () => {
  const [data, setData] = useState([]);
  dayjs.extend(utc);

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
    <div className='Home'>
      <Box
        sx={{
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
            marginLeft: 3,
            alignItems: {
              xs: 'center',
              md: 'normal',
            },
          }}>
          <Box
            sx={{
              maxWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography
              sx={{
                border: '2px solid #1C588E',
                width: 300,
                backgroundColor: '#b0d5f8',
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 3,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
                fontWeight: 600,
              }}>
              To Do
            </Typography>
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
              maxWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography
              sx={{
                border: '2px solid #CBC42B',
                width: 300,
                backgroundColor: '#fffcd2',
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 3,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
                fontWeight: 600,
              }}>
              In Progress
            </Typography>
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
              maxWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography
              sx={{
                border: '2px solid #31A515',
                width: 300,
                backgroundColor: '#cff8c5',
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 1.5,
                borderRadius: 3,
                marginRight: 10,
                marginLeft: 10,
                marginY: 2,
                fontWeight: 600,
              }}>
              Finish
            </Typography>
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
