import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as getData from '../../actions/PageActions.js'
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
	timeStamp: ["1541085000", "1541171400", "1541257800", "1541344200", "1541430600", "1541517000", "1541603400",
		"1541689800", "1541776200", "1541862600"]
};



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
		//console.log(this.state.drawingLines);
		return (
			<div>
				<form onSubmit={this.getChartsData} style={{ display: 'inline-block' }}>
					<label> Введите URL: <input type="url" name="url" value={this.state.url}
						onChange={this.onURLChange} /></label>
					<input type="submit" value="Submit" />
				</form><br />
				<CheckBoxContainer otherRawData={otherRawData} drawThisChart={this.drawThisChart} />
				<svg id="line-chart" /><br/>
				<D3Feld rawData={otherRawData} drawingLines={this.state.drawingLines} />
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


