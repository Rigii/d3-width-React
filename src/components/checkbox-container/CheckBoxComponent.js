import React, { Component } from 'react';

class CheckBoxComponent extends Component{
    constructor(){
        super();
        this.setChartsData = this.setChartsData.bind(this);
    }

    setChartsData(e){
        this.props.drawThisChart(e.target.value)
    }
    render(){
        return(
            <p>{this.props.value+ ' '}
              <input type='checkbox' value={this.props.value} onChange={this.setChartsData}/>
            </p>
        )
    }
}

export default CheckBoxComponent;