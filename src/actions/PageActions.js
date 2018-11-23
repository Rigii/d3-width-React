import {GET_DATA_SUCCESS} from '../constants/Const.js'
import {GET_DATA_ERROR} from '../constants/Const.js'
import {DELETE_DATA} from '../constants/Const.js'

export function getData(url){
return (dispatch) => {
    let xhr= new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload=function(){
      let data=JSON.parse(xhr.response);
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: data.results
        })
    };
   xhr.onerror= function(){
    alert('Error');
       dispatch({
           type: GET_DATA_ERROR,
           payload: []
       })
    };
    xhr.send()
}
}

export function deleteData(item)
{
    return {
        type: DELETE_DATA,
        item: item
    }
}