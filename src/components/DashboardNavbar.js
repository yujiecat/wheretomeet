// import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { useAuth } from 'src/helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {

  const { currentUser, logout } = useAuth();
  let navigate = useNavigate();

  const handleClick = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      console.log('failed to log out')
    }
  }

  return(<AppBar
    elevation={0}
    {...rest}
  >
    <Toolbar>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden lgDown>
        <IconButton color="inherit"  onClick={handleClick}>
          <InputIcon/>
        </IconButton>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>);
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
