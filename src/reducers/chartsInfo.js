
import {GET_DATA_SUCCESS} from '../constants/Const.js';
import {GET_DATA_ERROR} from '../constants/Const.js'
import {DELETE_DATA} from '../constants/Const.js'

const initialState={
	chartsInfo:[],
	isload: false
};

export default function userstate(state = initialState, action) {
let prevInfo= state.chartsInfo;
    if (action.type===GET_DATA_SUCCESS) return { ...state, chartsInfo: prevInfo.concat(action.payload), isload: false};
    if(action.type===GET_DATA_ERROR) return { ...state, chartsInfo: prevInfo.concat(action.payload), isload: false};
    if(action.type===DELETE_DATA) {
        const newState=[...state.chartsInfo];
        newState.splice(action.item, 1);
        return{...state, chartsInfo: newState}
    }

      return state;
    }
 

