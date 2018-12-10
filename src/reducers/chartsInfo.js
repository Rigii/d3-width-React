
import { handleActions } from 'redux-actions';
import moment from 'moment'

function setData() {
  let dtRng = [];
  let chartsInfo = {
    bananas: [],
    apples: [],
    oranges: [],
    timeStamp: []
  };

  const startYear = 2015, startMonth = 3,
    endYear = 2019, endMonth = 9;

  for (let year = startYear; year <= endYear; year++) {
    let currStartMonth = 1, currEndMonth = 12;

    if (year === startYear) currStartMonth = startMonth;

    if (year === endYear) currEndMonth = endMonth;

    for (let month = currStartMonth - 1; month < currEndMonth; month++)
      dtRng.push(moment(new Date(Date.UTC(year, month, 1, 0, 0, 0))).format('X'));
  }


  let banan = [8, 20, 56, 34, 45, 37, 95, 74, 80, 100];
  let app = [17, 45, 94, 30, 87, 34, 24, 86, 90, 34];
  let orange = [67, 34, 58, 58, 34, 2, 69, 97, 77, 90];

  for (let i = 0; i < dtRng.length; i++) {
    chartsInfo.timeStamp.push(dtRng[i])
  }

  for (let i = 0; i < 6; i++) {
    for (let n = 0; n < 9; n++) {
      chartsInfo.bananas.push(banan[n]);
      chartsInfo.apples.push(app[n]);
      chartsInfo.oranges.push(orange[n])
    }
  }

  console.log(dtRng);
  // 500> 50039 11132
  //50> 6453 5555
  return chartsInfo
}



const initialState = {
  chartsInfo: setData(),
  activePositions: [],
  lineProps: {}
};

export default handleActions(
  {
    GET_DATA: (state, action) => ({
      ...state,
      chartsInfo: state.chartsInfo.concat(action.payload),
    }),
      GET_DATA_ERROR: (state, action) => ({
          ...state
      }),
    CHOOSE_ITEM: (state, action) => {
      let index = state.activePositions.indexOf(action.payload);
      if (index == -1) {
        return { ...state, activePositions: state.activePositions.concat(action.payload) }
      }
      if (index != -1) {
        const newState = [...state.activePositions.slice(0, index), ...state.activePositions.slice(index + 1)];
        return { ...state, activePositions: newState }
      }
    },
  },
  initialState
);
