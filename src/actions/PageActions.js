import {GET_USERS_SUCCESS} from '../constants/Const.js'

export function getUserData(usersInfo){
return (dispatch) => {
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results=10');
    xhr.onload=function(){
      let data=JSON.parse(xhr.response)
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: data.results
        })
    }
   xhr.onerror= function(){
    alert('Error')
    }
    xhr.send()
}
}
/*export var getUserData = (usersInfo) => (dispatch) => {
	//var usersInfo=usersInfo;
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results=10');
    xhr.onload=function(){
      let data=JSON.parse(xhr.response)
      	dispatch({
      		type: 'GET_USERS_SUCCESS',
      		payload: data
      	})
    }
    xhr.onerror= function(){
    alert('Error')
    }
    xhr.send()
}*/
