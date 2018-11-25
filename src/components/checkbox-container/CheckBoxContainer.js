import React, { Component } from 'react';
import CheckBoxComponent from './CheckBoxComponent'

function CheckBoxContainer(props) {
    const{otherRawData}= props;
    return Object.keys(otherRawData).map((name)=> {
        let key = null;
        for (let n = 0; n < name.length; n++) {
            key= key+ name.charCodeAt(n)
        }
        return  <CheckBoxComponent value={name} key={key} drawThisChart={props.drawThisChart}/>
    });

}

export default CheckBoxContainer