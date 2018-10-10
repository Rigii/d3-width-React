
import {GET_USERS_SUCCESS} from '../constants/Const.js';
import {GET_USERS_ERROR} from '../constants/Const.js'
import {DELETE_USER} from '../constants/Const.js'

const initialState={
	usersInfo:[],
	isload: false
};

export default function userstate(state = initialState, action) {
let prevInfo= state.usersInfo;
    if (action.type===GET_USERS_SUCCESS) return { ...state, usersInfo: prevInfo.concat(action.payload), isload: false};
    if(action.type===GET_USERS_ERROR) return { ...state, usersInfo: prevInfo.concat(action.payload), isload: false};
    if(action.type===DELETE_USER) {
        const newState=[...state.usersInfo];
        newState.splice(action.item, 1);
        return{...state, usersInfo: newState}
    }

      return state;
    }
 

