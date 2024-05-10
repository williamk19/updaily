import {
  Box,
  Button,
  Card,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import useAuthStore from 'store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Auth = () => {
  const navigate = useNavigate();
  const { authTabIndex, pageTitle, pageSubtitle, setAuthTabIndex, signInUser } =
    useAuthStore((state) => state);

  const handleChange = (event, newValue) => {
    setAuthTabIndex(newValue);
  };

  const handleSignInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      signInUser(credential.accessToken, result.user);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: '0.75rem',
          width: '32rem',
          padding: '2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: '500',
            }}>
            Updaily {pageTitle}
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              color: grey[600],
            }}>
            {pageSubtitle}
          </Typography>
        </Box>
        <Box>
          <Tabs
            centered
            value={authTabIndex}
            onChange={handleChange}
            aria-label='basic tabs example'>
            <Tab
              label='Sign In'
              {...a11yProps(0)}
            />
            <Tab
              label='Register'
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel
          value={authTabIndex}
          index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel
          value={authTabIndex}
          index={1}>
          <Register />
        </CustomTabPanel>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
          <Divider>
            <Typography
              variant='subtitle2'
              sx={{
                color: grey[500],
              }}>
              or
            </Typography>
          </Divider>
          <Button
            onClick={handleSignInWithGoogle}
            startIcon={
              <GoogleIcon
                sx={{
                  width: '16px',
                  height: '16px',
                }}
              />
            }
            variant='contained'
            fullWidth>
            Sign In With Google
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Auth;
