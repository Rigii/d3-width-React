import React from 'react';
import CheckBoxComponent from './CheckBoxComponent'

function CheckBoxContainer(props) {
    const { chartsInfo } = props;
    return Object.keys(chartsInfo).map((name) => {
        let key = null;
        for (let n = 0; n < name.length; n++) {
            key = key + name.charCodeAt(n)
        }
        if (name !== 'timeStamp') return <CheckBoxComponent value={name} key={key} />
    });

}

export default CheckBoxContainer