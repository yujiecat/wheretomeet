/* eslint-disable import/no-anonymous-default-export */
// /* eslint-disable import/no-anonymous-default-export */
// import React from 'react';
// import AutocompleteComponent, { usePlacesWidget } from "react-google-autocomplete";
// import { Input, TextField } from "@material-ui/core";

// export default () => {
//   const { ref: materialRef } = usePlacesWidget({
//     apiKey: 'AIzaSyA5N_RMyoxca6XTwqQt6QBRFSXO91t_jgw',
//     onPlaceSelected: (place) => {
//       console.log(place);
//     },
//     options: {
//       componentRestrictions: { country: "ru" },
//     },
//   });

//   return (<div className="App">
//       <header className="App-header">
//         <div style={{ width: "250px" }}>
//           <span style={{ color: "black" }}>Material UI</span>
//           <Input
//             fullWidth
//             color="secondary"
//             inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
//               <AutocompleteComponent
//                 apiKey={process.env.REACT_APP_GOOGLE}
//                 {...props}
//                 onPlaceSelected={(selected) => console.log(selected)}
//               />
//             )}
//           />
//         </div>
//         <div style={{ width: "250px", marginTop: "20px" }}>
//           <span style={{ color: "black" }}>Material UI</span>
//           <TextField
//             fullWidth
//             color="secondary"
//             variant="outlined"
//             inputRef={materialRef}
//           />
//         </div>
//       </header>
//     </div>
//   );

// };

// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import parse from 'autosuggest-highlight/parse';
// import throttle from 'lodash/throttle';

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }

//   const script = document.createElement('script');
//   script.setAttribute('async', '');
//   script.setAttribute('id', id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     color: theme.palette.text.secondary,
//     marginRight: theme.spacing(2),
//   },
// }));

// export default function GoogleMaps() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(null);
//   const [inputValue, setInputValue] = React.useState('');
//   const [options, setOptions] = React.useState([]);
//   const loaded = React.useRef(false);

//   if (typeof window !== 'undefined' && !loaded.current) {
//     if (!document.querySelector('#google-maps')) {
//       loadScript(
//         'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5N_RMyoxca6XTwqQt6QBRFSXO91t_jgw&libraries=places',
//         document.querySelector('head'),
//         'google-maps',
//       );
//     }

//     loaded.current = true;
//   }

//   const fetch = React.useMemo(
//     () =>
//       throttle((request, callback) => {
//         autocompleteService.current.getPlacePredictions(request, callback);
//       }, 200),
//     [],
//   );

//   React.useEffect(() => {
//     let active = true;

//     if (!autocompleteService.current && window.google) {
//       autocompleteService.current = new window.google.maps.places.AutocompleteService();
//     }
//     if (!autocompleteService.current) {
//       return undefined;
//     }

//     if (inputValue === '') {
//       setOptions(value ? [value] : []);
//       return undefined;
//     }

//     fetch({ input: inputValue }, (results) => {
//       if (active) {
//         let newOptions = [];

//         if (value) {
//           newOptions = [value];
//         }

//         if (results) {
//           newOptions = [...newOptions, ...results];
//         }

//         setOptions(newOptions);
//       }
//     });

//     return () => {
//       active = false;
//     };
//   }, [value, inputValue, fetch]);

//   return (
//     <Autocomplete
//       id="google-map-demo"
//       style={{ width: 300 }}
//       getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
//       filterOptions={(x) => x}
//       options={options}
//       autoComplete
//       includeInputInList
//       filterSelectedOptions
//       value={value}
//       onChange={(event, newValue) => {
//         setOptions(newValue ? [newValue, ...options] : options);
//         setValue(newValue);
//       }}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField {...params} label="Add a location" variant="outlined" fullWidth />
//       )}
//       renderOption={(option) => {
//         const matches = option.structured_formatting.main_text_matched_substrings;
//         const parts = parse(
//           option.structured_formatting.main_text,
//           matches.map((match) => [match.offset, match.offset + match.length]),
//         );

//         return (
//           <Grid container alignItems="center">
//             <Grid item>
//               <LocationOnIcon className={classes.icon} />
//             </Grid>
//             <Grid item xs>
//               {parts.map((part, index) => (
//                 <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
//                   {part.text}
//                 </span>
//               ))}

//               <Typography variant="body2" color="textSecondary">
//                 {option.structured_formatting.secondary_text}
//               </Typography>
//             </Grid>
//           </Grid>
//         );
//       }}
//     />
//   );
// }