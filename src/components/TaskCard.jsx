import React from "react";
import { 
  CardContent, 
  CardActions, 
  Button, 
  Typography, 
  Box, 
  Card 
} from '@mui/material';

const TaskCard = ({judul, deskripsi, tanggal}) => {
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <Card variant="outlined" style={{ marginTop: 20, maxWidth: '500px' }}>
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            {judul}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`${tanggal.toDate()}`}
          </Typography>
          <Typography variant="body2">
            {deskripsi}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    </Card>
  );
};

export default TaskCard;