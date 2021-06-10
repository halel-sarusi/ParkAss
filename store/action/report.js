export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOACATION = 'ADD_LOACATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';
import ENV from '../../env';
import Report from '../../models/report';
import report from '../reducers/report';
import {useSelector, useStore} from 'react-redux';


export const addImage = (imageUrl) =>{
    // const store = useStore;
    // console.log('store',store.getState  ); 
    // someAction();
    return { type: ADD_IMAGE, image:imageUrl };
}

// export function someAction() {
//     return (dispatch, getState) => {
//       const {items} = getState;
//       console.log(items);
//     }
// } 

export const addLocation = (location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);
        if(!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        if(!resData.results){
            throw new Error('Something went wrong!');
        }
        const address = resData.results[0].formatted_address
        console.log('action', address);
        dispatch({type: ADD_LOACATION, locationData:{location: location, address: address}})

    }
}

export const addReport = (text) => {
    return { type: ADD_REPORT, text:text };
}
