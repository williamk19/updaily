import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/useAuthStore';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const signOutUser = useAuthStore((state) => state.signOutUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        signOutUser();
        navigate('/auth');
        handleClose();
      })
      .catch((error) => {
      });
  };

  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: '72rem',
        display: 'flex',
        justifyContent: 'end',
        padding: '1rem 0',
      }}>
      <Avatar
        src={user.photoURL}
        id='menu-button'
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
        }}
      />
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id='user-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}>
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
