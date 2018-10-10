import {GET_USERS_SUCCESS} from '../constants/Const.js'
import {GET_USERS_ERROR} from '../constants/Const.js'
import {DELETE_USER} from '../constants/Const.js'

export function getUserData(num){
return (dispatch) => {
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results='+num);
    xhr.onload=function(){
      let data=JSON.parse(xhr.response);
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: data.results
        })
    };
   xhr.onerror= function(){
    alert('Error');
       dispatch({
           type: GET_USERS_ERROR,
           payload: []
       })
    };
    xhr.send()
}
}

export function deleteUser(item)
{
    return {
        type: DELETE_USER,
        item: item
    }
}