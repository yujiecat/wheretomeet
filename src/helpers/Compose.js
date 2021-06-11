import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10rem',
      height: '8ch'
    },
  },
}));

export default function Compose({message}) {
    const compose = useStyles();
    const [text, setText] = React.useState('')

    const handleInput = (event) => {
      setText(event.target.value);
    }

    const handleSubmit = (event) => {
      if(event.code === "Enter"){
        message(text);
      }
    }

    return (
      <div className={compose.root}>
      <TextField id="outlined-basic" variant="outlined" placeholder={'Send a message'} onInput={handleInput} onKeyPress={handleSubmit}/>
      </div>
    );
}