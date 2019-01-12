import { createAction } from 'redux-actions';
import { GET_DATA } from '../constants/Const.js'
import { GET_DATA_ERROR } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import { getDataFetch } from '../components/helpers/helpers.js'

export const getData = (url) => {
    return function (dispatch) {
        return getDataFetch(url).then(function (data) {
            dispatch ({
                type: GET_DATA,
                payload: data
            })})
            .catch(
                ((reject) => {
                    console.log('fail to load ' + reject);
                    dispatch ({
                        type: GET_DATA_ERROR
                    })
                })
            );
    }
};

export const chooseItems = createAction(
    CHOOSE_ITEM,
    item => item
);

/*
return function (dispatch) {
        return getDataFetch(url).then(function (data) {
                dispatch ({
                    type: GET_DATA,
                    payload: data
                })})
            .catch(
                ((reject) => {
                    console.log('fail to load ' + reject);
                    dispatch ({
                        type: GET_DATA_ERROR
                    })
                })
            );
    }
*/






//const addChartsData = createAction('GET_DATA', info => info);
//const getDataError = createAction('GET_DATA_ERROR');
/*
export = (url) => dispatch => 
getDataFetch(url).then(data => {
    dispatch(addChartsData(data));
  })
  .catch(
            ((reject) => {
            dispatch (getDataError())
                console.log('fail to load ' + reject.status);
            })
        );
*/
/*
const addUserDataToStore = createAction('ADD_USER_DATA_TO_STORE', info => info);

export const fetchUserData = () => dispatch =>
  requestFetch({ pathname: '/api/userInfo' }).then(user => {
    dispatch(addUserDataToStore(user));
  });


  
*/