import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';

const VoteLocation = ({location}) => {
	const checkboxStyles = bannerCheckboxStylesHook.useCheckbox();
  	const formControlLabelStyles = bannerCheckboxStylesHook.useFormControlLabel();
  	const subtitleStyles = bannerCheckboxStylesHook.useSubtitle();
	const [votes, setVotes] = React.useState(0);

	const handleChange = (event) => {
		if(event.target.checked)
			setVotes(votes+1);
    	else setVotes(votes-1);
	}

	return(
          <FormControlLabel
          key={location[1].venueName}
          name={location[1].venueName}
          onChange={handleChange}
          classes={formControlLabelStyles}
          control={<Checkbox color="primary" classes={checkboxStyles} />}
          label={
            <>
              <Typography component="span" classes={subtitleStyles}>
                {location[1].venueName} - {votes}
              </Typography>
            </>
          }/>
	);

}

export default VoteLocation;