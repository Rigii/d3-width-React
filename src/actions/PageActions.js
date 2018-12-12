import { createAction } from 'redux-actions';
import { GET_DATA } from '../constants/Const.js'
import { GET_DATA_ERROR } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import { XAXIS_FUNC } from '../constants/Const.js'
import { getDataFetch } from '../components/helpers/helpers.js'

//const addChartsData = createAction('GET_DATA', info => info);
//const getDataError = createAction('GET_DATA_ERROR');


export const getData = (url) => {
    if (getDataFetch(url) !== undefined) {
        return {
            type: GET_DATA,
            payload: getDataFetch('../components/helpers/JSONChartsData.json')
        }
    }
    return {
        type: GET_DATA_ERROR
    }
};

export const chooseItems = createAction(
    CHOOSE_ITEM,
    item => item
)

export const xAxisFunc = createAction(
    XAXIS_FUNC,
    item => item
)


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