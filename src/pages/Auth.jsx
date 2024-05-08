import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import GoogleIcon from "@mui/icons-material/Google";

const Auth = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={3}
        sx={{
          borderRadius: "0.75rem",
          width: "32rem",
          padding: "2rem 2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "500",
          }}
        >
          Updaily Signin
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: grey[600],
          }}
        >
          Sign in using your registered email and password
        </Typography>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button variant="outlined" fullWidth>
            Sign In
          </Button>
          <Divider>
            <Typography
              variant="subtitle2"
              sx={{
                color: grey[500],
              }}
            >
              or
            </Typography>
          </Divider>
          <Button
            startIcon={
              <GoogleIcon
                sx={{
                  width: "16px",
                  height: "16px",
                }}
              />
            }
            variant="contained"
            fullWidth
          >
            Sign In With Google
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Auth;
