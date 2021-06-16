import {
  Card,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiListItem from '@material-ui/core/ListItem';
import { ChevronRight } from 'react-feather';
import React from 'react';
import axios from 'axios';
import getInitials from 'src/utils/getInitials';
import { useNavigate, generatePath } from 'react-router-dom';

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "b0b0b0",
      color: "white"
    },
    "&$selected:hover": {
      backgroundColor: "black",
      color: "white"
    },
    "&:hover": {
      backgroundColor: "black",
      color: "white"
    }
  },
  selected: {}
})(MuiListItem);

const GroupsList = ({ groups }) => {
  let navigate = useNavigate();

  const handleClick = (gid) => {
    axios.get('/group/id/' + gid)
    .then(response => {
      if(response.status === 200) {
        return response.data;
      }
    })
    .then(data => {
      alert('retrieved group ' + data.groupName + ' ' + data.groupId);

      const groupPath = generatePath(
        '/app/group/:groupId', 
        { groupId: gid }
      );

      navigate(groupPath);
    })
    .catch(error => {
      alert('error retrieving group..' + error);
    });
  };

  return (
    <Card>
      <Divider />
      <List>
        {groups.map((group, i) => (
          <ListItem
            onClick={() => handleClick(group.groupId)}
            divider={i < groups.length - 1}
            key={group.groupId}
          >
            <ListItemAvatar>
              <img
                src = '/static/images/products/product_5.png'
                alt={getInitials(group.groupName)}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={group.groupName}
              secondary={group.groupId}
            />
            <IconButton
              edge="end"
              size="small"
            />
            <ChevronRight />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Card>
  );
};

export default GroupsList;
