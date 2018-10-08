import {combineReducers} from 'redux';
import {GET_USERS_SUCCESS} from '../constants/Const.js'

const initialState={
	usersInfo:[],
	isload: false
}

export default function userstate(state = initialState, action) {
let prevInfo= state.usersInfo;
    if (action.type==GET_USERS_SUCCESS) return { ...state, usersInfo: prevInfo.concat(action.payload), isload: false}
    //if(action.type=='UPDATE_DATA'&& !isload ) {{...state, isload: true} return { ...state, usersInfo: prevInfo.concat(action.payload), isload: false}
      return state;
    }
 

