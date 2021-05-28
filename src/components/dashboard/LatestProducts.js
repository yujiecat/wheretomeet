import { v4 as uuid } from 'uuid';
import moment from 'moment';
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
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const products = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#b0b0b0",
      color: "white"
    },
    "&$selected:hover": {
      backgroundColor: "#d3d3d3",
      color: "white"
    },
    "&:hover": {
      backgroundColor: "#d3d3d3",
      color: "white"
    }
  },
  selected: {}
})(MuiListItem);

const LatestProducts = (props) => {

  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleChange = (i) => {
    console.log('hey');
    setSelectedIndex(i);

    // TODO: we'll need to populate actual group cards on the sidebar and store the each group id on the cards somewhere,
    // then we send the id here to grab the specific group details.
    const request = fetch('/group/id/' + "123456789")
    .then(response => {
        if(response.ok) {
          alert('retrieved group');
        }
        else {
          alert('error retrieving group... :(');
        }
    });
  };

  const hover = () => {
    console.log('a');
  }

  return (
    <Card {...props}>
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            selected={selectedIndex === i}
            onMouseEnter={hover}
            onClick={() => handleChange(i)}
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt.fromNow()}`}
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

export default LatestProducts;
