export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_LOACATION = 'ADD_LOACATION';
export const ADD_DESCRIPTION = 'ADD_DESCRIPTION';
export const ADD_REPORT = 'ADD_REPORT';

export const addImage = (imageUrl) =>{
    console.log('action', imageUrl);
    return { type: ADD_IMAGE, image:imageUrl };
}

export const addLocation = (location) =>{
    console.log('action', imageUrl);
    return { type: ADD_LOACATION, location:location };
}
