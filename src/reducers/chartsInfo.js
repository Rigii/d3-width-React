
import { GET_DATA_SUCCESS } from '../constants/Const.js';
import { GET_DATA_ERROR } from '../constants/Const.js'
import { DELETE_DATA } from '../constants/Const.js'
import { CHOOSE_ITEM } from '../constants/Const.js'
import { CHANGE_LINE_PROPS } from '../constants/Const.js'

const initialState = {
  chartsInfo: {
    bananas: [8, 20, 56, 34, 45, 37, 95, 74, 80, 100],
    apples: [17, 45, 94, 30, 87, 34, 24, 86],
    oranges: [67, 34, 58, 58, 34, 2, 69, 97, 77],
    timeStamp: ["1541085000", "1541171400", "1541257800", "1541344200", "1541430600", "1541517000", "1541603400",
      "1541689800", "1541776200", "1541862600"]
  },
  activePositons: [],
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
    let index = prevInfo.activePositons.indexOf(action.payload);
    if (index == -1) {
      return { ...state, activePositons: prevInfo.activePositons.concat(action.payload) }
    }
    if (index != -1) {
      const newState = [...prevInfo.activePositons.slice(0, index), ...prevInfo.activePositons.slice(index + 1)]
      return { ...state, activePositons: newState }
    }
  }

  if (action.type === CHANGE_LINE_PROPS) {
    return { ...state, lineProps: action.payload};
  }
  return state;
}


