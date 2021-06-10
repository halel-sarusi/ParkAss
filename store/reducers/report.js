import Report from '../../models/report';
import { ADD_IMAGE, ADD_LOACATION, ADD_DESCRIPTION,ADD_REPORT } from '../action/report';
 
const initialState = {
    reportsArr:[],
    image:null,
    address:null,
    lat:null,
    lng:null,
    description:null,
    date:null,
};

// console.log(initialState.image)

export default (state=initialState, action) =>{
    switch (action.type){
        case ADD_IMAGE:
            return{
                image: action.image,
                reportsArr: [],
            }
        case ADD_LOACATION:
            return{
                lat: action.locationData.location.lat,
                lng: action.locationData.location.lng,
                address: action.locationData.address,
                ...state
            }
        // case ADD_DESCRIPTION:
        //     return{
        //         description: action.desc,
        //     }
        case ADD_REPORT:
            console.log(state.reportsArr);

            const newReport = new Report(
                1,
                1,
                new Date(),
                state.image,
                state.lat,
                state.lng,
                state.address,
                action.text
            );

            return {
                // ...state,
                reportsArr: state.reportsArr.concat(newReport)
            };
        default:
            return state;

    }
}