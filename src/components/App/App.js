import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as getData from '../../actions/PageActions.js'
import './app.css';
import D3Feld from '../d3/D3Feld';
import D3Lines from '../d3/D3Lines';

/*
@connect(
	({sheudleInfo}) => ({
	  data: sheudleInfo
	}), dispatch => ({
		getData: state => dispatch(getData(state))
	})
  )
*/


var rawData = [];
for (let i=0; i<=10; i++){
    rawData.push(
    { x: '2013-03-'+(12+i)+' 21:06', y: 0 },
    { x: '2013-03-'+(12+i)+' 21:06', y: 20 },
    { x: '2013-03-'+(12+i)+' 21:06', y: 40 },
    { x: '2013-03-'+(12+i)+' 21:06', y: 60 },
    { x: '2013-03-'+(12+i)+' 21:06', y: 80 },
    { x: '2013-03-'+(12+i)+' 21:06', y: 100},
    { x: '2013-03-'+(12+i)+' 22:06', y: 96 },
    { x: '2013-03-'+(12+i)+' 23:06', y: 90 },  
    { x: '2013-03-'+(12+i)+' 23:06', y: 82 },
    { x: '2013-03-'+(13+i)+' 00:06', y: 89 }, 
    { x: '2013-03-'+(13+i)+' 01:06', y: 46 },
    { x: '2013-03-'+(13+i)+' 02:06', y: 63 },
    )
}

class App extends Component {
	constructor(){
		super()
		this.state={
			url: ''
		}
this.onURLChange=this.onURLChange.bind(this);
this.getSheduleData=this.getSheduleData.bind(this);

	}
    onURLChange(e){
		this.setState=({url: e.target.value})
	}

	getSheduleData(){
		this.props.getData(this.state.url);
	}	

	render(){
        return (
			<div>
				<form onSubmit={this.getSheduleData} style={{display: 'inline-block'}}>
				<label> Введите URL: <input type="url" name="url" value={this.state.url}
                           onChange={this.onURLChange}/></label>
				<input type="submit" value="Submit" />
				</form><br/>
				<svg id="line-chart"></svg><br/>
				<D3Feld rawData={rawData}/>
				<D3Lines rawData={rawData}/>
			</div>
		)
    }
	}

	function mapStateToProps(state) {
		return {
			data: state.sheudleInfo
		}
	}
	
	function mapDispatchToProps(dispatch) {
		return {
			getData: state => dispatch(getData(state))
		}
	}
	
	export default connect(mapStateToProps, mapDispatchToProps)(App)


