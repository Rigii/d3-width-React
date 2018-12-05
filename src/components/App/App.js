import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as getData from '../../actions/PageActions.js'
import './app.css';
import CheckBoxContainer from './../checkbox-container/CheckBoxContainer.js'
import D3Feld from '../d3/D3Feld';

class App extends Component {
	constructor() {
		super();
		this.state = {
			url: '',
		};

		this.onURLChange = this.onURLChange.bind(this);
		this.getChartsData = this.getChartsData.bind(this);
	}

	onURLChange(e) {
		this.setState = ({ url: e.target.value })
	}

	getChartsData() {
		this.props.getData(this.state.url);
	}

	render() {
		return (
			<div className={'mainDiv'}>
				<form onSubmit={this.getChartsData} style={{ display: 'inline-block' }}>
					<label> Введите URL: <input type="url" name="url" value={this.state.url}
						onChange={this.onURLChange} /></label>
					<input type="submit" value="Submit" />
				</form><br />
				<div className={'checkBoxContainer'}>
					<CheckBoxContainer className={'checkBoxContainer'} chartsInfo={this.props.chartsInfo} />
				</div>
				<svg id="line-chart" /><br />
				<D3Feld rawData={this.props.chartsInfo} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		chartsInfo: state.chartsInfo.chartsInfo,
		activePositons: state.chartsInfo.activePositons,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getData: bindActionCreators(getData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

/*
@connect(
	({sheudleInfo}) => ({
	  data: sheudleInfo
	}), dispatch => ({
		getData: state => dispatch(getData(state))
	})
  )
*/


