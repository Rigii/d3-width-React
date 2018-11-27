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

export default function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }