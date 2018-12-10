import { GET_DATA } from '../constants/Const.js'
import { GET_DATA_ERROR } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import {getDataFetch} from '../components/helpers/helpers.js'

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

export const chooseItems = (item) => {
    return {
        type: CHOOSE_ITEM,
        payload: item
    }
};