// import React from 'react';
// import { Autocomplete } from '@react-google-maps/api';

// function AutoCompleteLocation(props) {
//     const [autocomplete, setAutocomplete] = React.useState(null);


// 	const onLoad = React.useCallback(function callback(autocomplete) {
// 		console.log('auto: ', autocomplete);
// 		setAutocomplete(autocomplete);
// 	}, [])
    
// 	const onPlaceChanged = React.useCallback(function callback(autocomplete) {
// 		if(autocomplete !== null){
// 			console.log(autocomplete.getPlace())
// 		} else {
// 			console.log('not loaded yet');
// 		}
// 	}, [])

//     return (
//           <Autocomplete
//             onLoad={onLoad}
//             onPlaceChanged={onPlaceChanged}
//           >
//             <input
//               type="text"
//               placeholder="Find your location"
//               style={{
//                 boxSizing: `border-box`,
//                 border: `1px solid transparent`,
//                 width: `240px`,
//                 height: `32px`,
//                 padding: `0 12px`,
//                 borderRadius: `3px`,
//                 boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//                 fontSize: `14px`,
//                 outline: `none`,
//                 textOverflow: `ellipses`,
//                 position: "absolute",
//                 left: "50%",
//                 marginLeft: "-120px"
//               }}
//             />
//           </Autocomplete>
//     )
// };

// export default React.memo(AutoCompleteLocation);
