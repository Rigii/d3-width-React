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

 const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
export default getRandomColor

export const getData = (url) => {
    fetch(url)
        .then(function (response) {
            console.log(response.status); 
            let data = JSON.parse(response);
            return data;
        })
        .catch(alert('request error'));
}