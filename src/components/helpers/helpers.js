export default function sortObj(obj){
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