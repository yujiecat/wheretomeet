import React from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';
import FormGroup from '@material-ui/core/FormGroup';

const Voting = ({suggestions}) => {
  // grab data for voting from suggestions here
  // map each formcontrollabel to one suggestion
  // button to display results
  const checkboxStyles = bannerCheckboxStylesHook.useCheckbox();
  const formControlLabelStyles = bannerCheckboxStylesHook.useFormControlLabel();
  const subtitleStyles = bannerCheckboxStylesHook.useSubtitle();

  let votesCocoru = 0;

  const handleChange = (event) => {
    console.log('event checked? ', event.target.checked);
    if(event.target.checked)
      votesCocoru++;
    else votesCocoru--;
    console.log(votesCocoru);
  }

  return (
    <Box display="grid">
      <Typography component="span" classes={subtitleStyles}>
        Vote for which suggested places you'd like to go to!
      </Typography>
      <FormGroup>
      {suggestions.map((suggestion) => {
        console.log('what', suggestion);
        return(
          <FormControlLabel
          key={suggestion.info.name}
          name={suggestion.info.name}
          onChange={handleChange}
          classes={formControlLabelStyles}
          control={<Checkbox color="primary" classes={checkboxStyles} />}
          label={
            <>
              <Typography component="span" classes={subtitleStyles}>
                {suggestion.info.name}
              </Typography>
            </>
          }/>
        )})}
        </FormGroup>
    </Box>
  );
};

export default Voting;