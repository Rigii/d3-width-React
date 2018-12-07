import { GET_DATA_SUCCESS } from '../constants/Const.js'
import { GET_DATA_ERROR } from '../constants/Const.js'
import { DELETE_DATA } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import { CHANGE_LINE_PROPS } from '../constants/Const.js'

export const getData = (url) => {
    return (dispatch) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            let data = JSON.parse(xhr.response);
            dispatch({
                type: GET_DATA_SUCCESS,
                payload: data.results
            })
        };
        xhr.onerror = function () {
            alert('Error');
            dispatch({
                type: GET_DATA_ERROR,
                payload: []
            })
        };
        xhr.send()
    }
}

export const deleteData = (item) => {
    return {
        type: DELETE_DATA,
        payload: item
    }
}

export const chooseItems = (item) => {
    return {
        type: CHOOSE_ITEM,
        payload: item
    }
}

export const changeLineProps = (item) => {
    return {
        type: CHANGE_LINE_PROPS,
        payload: item
    }
}