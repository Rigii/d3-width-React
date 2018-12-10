function sortObj(obj){
    let newArr = [];
        for (let i = 0; i < obj.timeStamp.length; i++){
            let newObj = {};
            Object.keys(obj).map((key) => {
                if (obj[key][i] !== undefined) newObj[key]= obj[key][i]
        });
            newArr.push(newObj)
    }
    return newArr;
}

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
            let data = JSON.parse(response);
            console.log( response.json());
            return data;
        })
        .catch(
            ((reject) => {
                console.log(reject);
                return ({})
            })
        );
};

/*
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