import Report from '../../models/report';
import { ADD_IMAGE } from '../action/report';
 
const initialState = {
    image:"",
    loacation:null,
    description:null,
    date:null,
};

console.log(initialState.image)

export default (state=initialState, action) =>{
    switch (action.type){
        case ADD_IMAGE:
            // console.log(action.image);
            console.log(typeof(action.image));
            return{
                image: action.image,
            }
        // case ADD_LOACATION:
        // case ADD_DESCRIPTION:
        // case ADD_REPORT:
        //     const newReport = new Report(

        //     )

        default:
            return state;

    }
}