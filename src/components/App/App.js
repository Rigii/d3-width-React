import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as getData from '../../actions/PageActions.js'
import sortObj from './../helpers/helpers.js'
import './app.css';
import CheckBoxContainer from './../checkbox-container/CheckBoxContainer.js'
import D3Feld from '../d3/D3Feld';

/*
@connect(
	({sheudleInfo}) => ({
	  data: sheudleInfo
	}), dispatch => ({
		getData: state => dispatch(getData(state))
	})
  )
*/

const otherRawData = {
	bananas: [8, 20, 56, 34, 45, 37, 95, 74, 80, 100],
	apples: [17, 45, 94, 30, 87, 34, 24, 86],
	oranges: [67, 34, 58, 58, 34, 2, 69, 97, 77],
	timeStamp: ['2013-03-12 21:06', '2013-03-13 21:06', '2013-03-14 21:06', '2013-03-15 21:06', '2013-03-16 21:06',
		'2013-03-17 21:06', '2013-03-18 21:06', '2013-03-19 21:06', '2013-03-20 21:06', '2013-03-21 21:06']
};
let newArr = sortObj(otherRawData); //в диспатч


const rawData = [];
for (let i = 0; i <= 10; i++) {
	rawData.push(
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 0 },
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 20 },
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 40 },
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 60 },
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 80 },
		{ x: '2013-03-' + (12 + i) + ' 21:06', y: 100 },
		{ x: '2013-03-' + (12 + i) + ' 22:06', y: 96 },
		{ x: '2013-03-' + (12 + i) + ' 23:06', y: 90 },
		{ x: '2013-03-' + (12 + i) + ' 23:06', y: 82 },
		{ x: '2013-03-' + (13 + i) + ' 00:06', y: 89 },
		{ x: '2013-03-' + (13 + i) + ' 01:06', y: 46 },
		{ x: '2013-03-' + (13 + i) + ' 02:06', y: 63 },
	)
}




class App extends Component {
	constructor() {
		super();
		this.state = {
			url: '',
			drawingLines: []
		};

		this.onURLChange = this.onURLChange.bind(this);
		this.getChartsData = this.getChartsData.bind(this);
		this.drawThisChart = this.drawThisChart.bind(this);
	}

	drawThisChart(name) {
		let index = this.state.drawingLines.indexOf(name);
		if (index == -1) {
			this.setState(prevState => ({
				drawingLines: [...prevState.drawingLines, name]
			}))
		}
		if (index != -1) {
			this.setState((prevState) => ({
				drawingLines: [...prevState.drawingLines.slice(0, index), ...prevState.drawingLines.slice(index + 1)]
			}))
		}
	}

	onURLChange(e) {
		this.setState = ({ url: e.target.value })
	}

	getChartsData() {
		this.props.getData(this.state.url);
	}

	render() {
		console.log(this.state.drawingLines);
		return (
			<div>
				<form onSubmit={this.getChartsData} style={{ display: 'inline-block' }}>
					<label> Введите URL: <input type="url" name="url" value={this.state.url}
						onChange={this.onURLChange} /></label>
					<input type="submit" value="Submit" />
				</form><br />
				<CheckBoxContainer otherRawData={otherRawData} drawThisChart={this.drawThisChart} />
				<svg id="line-chart" /><br />
				<D3Feld rawData={rawData} />
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


