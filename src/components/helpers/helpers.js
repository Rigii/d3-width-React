export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getDataFetch = (url) => {
    fetch(url)
        .then(function (response) {
        //    let data = JSON.parse(response);
            console.log(response);
            return response;
        })
        .catch(
            ((reject) => {
                console.log('fail to load ' + reject.status);
            })
        );
};

/*
function sortObj(obj) {
    let newArr = [];
    for (let i = 0; i < obj.timeStamp.length; i++) {
        let newObj = {};
        Object.keys(obj).map((key) => {
            if (obj[key][i] !== undefined) newObj[key] = obj[key][i]
        });
        newArr.push(newObj)
    }
    return newArr;
}

xport const requests = (setting, pathname) =>
  fetch(`${window.location.origin + pathname}`, {
    ...setting,
  })
      .then(checkStatus)
      .then(getJson)
      .then(json => {
          return Promise.resolve(json);
      })
      .catch(ex => {
          console.error('parsing failed', ex);
          return Promise.reject(ex);
      });


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
*/