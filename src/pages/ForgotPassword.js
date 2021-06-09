import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import axios from 'axios';
import { useAuth } from 'src/helpers/AuthContext.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
		Wheretomeet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] =useState(false);
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');

  // There's an issue when the email is valid but does not exist in firebase
  // It throws a 400 error in the console - might need to adjust some stuff to fix this.
  const handleSubmit = async function(event) {
		event.preventDefault();

		setMessage('');
		setLoading(true);
		resetPassword(email)
		.then((data) => {
			setMessage('Password reset request sent. Check your email inbox for further instructions.')
			setLoading(false);
		})
		.catch((error) => {
			setMessage('There was an error resetting your password. Please check to see if you\'ve entered your email properly.');
			setLoading(false);
		})


    // axios.get('user/email/' + email)
    // .then(response => {
    //   if(response.status === 200) {
    //     return response.data;
    //   }
    //   else {
    //     alert('network error sadge :(' + response.status);
    //   }
    // })
    // .then(data => {
    //   if(data.email === email && data.password === password) {
    //     localStorage.setItem('user', JSON.stringify(data));
    //     navigate('/app/dashboard');
    //   }
    //   else {
    //     alert("yikes, wrong email/pass?"); 
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

	
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
		<Typography align={'center'} mt={2} component="p" variant="h6">
			{message}
		</Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onInput = {e => setEmail(
              e.target.value
            )}
            value = {email}
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
			disabled={loading}
            className={classes.submit}
          >
            Send password reset request
          </Button>
        </form>
      </div>
      <Box mt={3}>
		<Copyright />
      </Box>
    </Container>
  );
}
