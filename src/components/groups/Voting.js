import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import VoteLocation from './VoteLocation.js';
import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';

const Voting = ({suggestions}) => {
  // grab data for voting from suggestions here
  // map each formcontrollabel to one suggestion
  // button to display results
  const subtitleStyles = bannerCheckboxStylesHook.useSubtitle();
  const markers = Array.from(suggestions);
  const hasSuggestions = (markers.length > 0);

  return (
    <Box display="grid">
      <Typography component="span" classes={subtitleStyles}>
        Vote for which suggested places you'd like to go to!
      </Typography>
      <FormGroup>
      {hasSuggestions ? markers.map((suggestion) => {
          console.log('suggestion: ', suggestion);

        return(<VoteLocation location={suggestion}/>
        )}) : <></>}
        </FormGroup>
    </Box>
  );
};

export default Voting;