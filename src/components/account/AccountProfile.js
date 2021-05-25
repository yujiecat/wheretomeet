import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

// modify this for the profile
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  username: 'KatSmith#1234',
  name: 'Katarina Smith',
};

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 128,
            width: 128
          }}
        />
        <Typography
          color="textPrimary"
          variant="h2"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h3"
        >
          {user.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${user.city}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions
      sx={{
        p: 2
      }}
    >
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;
