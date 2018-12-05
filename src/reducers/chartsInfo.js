
import { GET_DATA_SUCCESS } from '../constants/Const.js';
import { GET_DATA_ERROR } from '../constants/Const.js'
import { DELETE_DATA } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import { CHANGE_LINE_PROPS } from '../constants/Const.js'
import moment from 'moment'

let dtRng = []

const startYear = 2015, startMonth = 3,
      endYear = 2039,   endMonth = 9;

// Loop through the years.
for(var year = startYear; year <= endYear; year++) {
    var currStartMonth = 1, currEndMonth = 12;

    if (year === startYear) currStartMonth = startMonth;

    if (year === endYear)     currEndMonth = endMonth;

    for (var month = currStartMonth - 1; month < currEndMonth; month++) 
        dtRng.push(moment(new Date(Date.UTC(year, month, 1, 0, 0, 0))).format('X'));
}

console.log(dtRng)
// 50039 11132

let chartsInfo = {
  bananas: [],
  apples: [],
  oranges: [],
  timeStamp: []
};
let banan = [8, 20, 56, 34, 45, 37, 95, 74, 80, 100]
let app = [17, 45, 94, 30, 87, 34, 24, 86, 90, 34]
let orange = [67, 34, 58, 58, 34, 2, 69, 97, 77, 90]

for (let i = 0; i < dtRng.length; i++) {
  chartsInfo.timeStamp.push(dtRng[i])
}

for (let i = 0; i < 32; i++) { 
  for (let n = 0; n < 9; n++){
    chartsInfo.bananas.push(banan[n])
    chartsInfo.apples.push(app[n])
    chartsInfo.oranges.push(orange[n])
  }
}




const initialState = {
  chartsInfo: chartsInfo,
  activePositions: [],
  lineProps: {}
};

export default function userstate(state = initialState, action) {
  let prevInfo = state;
  if (action.type === GET_DATA_SUCCESS) return { ...state, chartsInfo: prevInfo.chartsInfo.concat(action.payload) };
  if (action.type === GET_DATA_ERROR) return { ...state, chartsInfo: prevInfo.chartsInfo.concat(action.payload) };
  if (action.type === DELETE_DATA) {
    const newState = [...state.chartsInfo];
    newState.splice(action.payload, 1);
    return { ...state, chartsInfo: newState }
  }

  if (action.type === CHOOSE_ITEM) {
    let index = prevInfo.activePositions.indexOf(action.payload);
    if (index == -1) {
      return { ...state, activePositions: prevInfo.activePositions.concat(action.payload) }
    }
    if (index != -1) {
      const newState = [...prevInfo.activePositions.slice(0, index), ...prevInfo.activePositions.slice(index + 1)]
      return { ...state, activePositions: newState }
    }
  }

  if (action.type === CHANGE_LINE_PROPS) {
    return { ...state, lineProps: action.payload };
  }
  return state;
}


