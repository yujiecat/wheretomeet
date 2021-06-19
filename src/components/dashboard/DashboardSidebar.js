import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Drawer,
  Typography,
} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Users as FriendsIcon,
  MessageSquare as GroupsIcon
} from 'react-feather';
import NavItem from 'src/components/NavItem';
import GroupsList from 'src/components/dashboard/GroupsList';
import CreateGroupFab from 'src/components/dashboard/CreateGroupFab.js';
import React, { useState } from 'react';
import axios from 'axios';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: GroupsIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: FriendsIcon,
    title: 'Friends'
  },
  {
    href: '/app/group',
    icon: UserIcon,
    title: 'Profile'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [rerender, setRerender] = useState(false);
  const [groups, setGroups] = useState([]);

  const loggedInUser = sessionStorage.getItem('encodedUserId');

  const updateGroups = () => {
    setRerender(!rerender);
    retrieveUsersGroupsData();
  }

    const retrieveUsersGroupsData = async() => {
    if(loggedInUser != null) {
      await axios.get('/groupsList/' + loggedInUser)
      .then(response => {
          if(response.status === 200) {
            return response.data;
          }
          else {
            alert('Error retrieving group data :(');
          }
      })
      .then(data => {
         setGroups(data.groups);
      })
      .catch(error => {
        console.log(error);
      });
    }
    else {
      alert('unable to locate userId');
    }
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    retrieveUsersGroupsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 1.75
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
            margin: 1,
          }}
          to="/app/account"
        />
        <Typography
          sx={{
            margin: 0.5
          }}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          p: 1
        }}
      >
        {items.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            icon={item.icon}
          />
        ))}
      </Box>
      <Box sx={{}}>
        <GroupsList groups={groups}/>
        <CreateGroupFab onCreate={() => updateGroups()}/>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 270
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 270,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
