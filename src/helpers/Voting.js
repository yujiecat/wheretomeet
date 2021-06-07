import React from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';

const Voting = () => {
  const checkboxStyles = bannerCheckboxStylesHook.useCheckbox();
  const formControlLabelStyles = bannerCheckboxStylesHook.useFormControlLabel();
  const subtitleStyles = bannerCheckboxStylesHook.useSubtitle();
  return (
    <Box display="grid">
      <FormControlLabel
        classes={formControlLabelStyles}
        control={<Checkbox color="primary" classes={checkboxStyles} />}
        label={
          <>
            Auto start
            <Typography component="span" classes={subtitleStyles}>
              Starting with your OS
            </Typography>
          </>
        }
      />
    </Box>
  );
};

export default Voting;