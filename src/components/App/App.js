import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/PageActions.js'
import './app.css';
import CheckBoxContainer from './../checkbox-container/CheckBoxContainer.js'
import D3Feld from '../d3/D3Feld';
import Axis from '../d3/Axis';
import D3RenderDataLines from '../d3/D3RenderDataLines'
import D3ResponsiveElements from '../d3/D3ResponsiveElements'
import D3Container from '../d3/D3Container'

class App extends Component {
	constructor() {
		super();
		this.state = {
			url: ''
		};

		this.onURLChange = this.onURLChange.bind(this);
		this.getChartsData = this.getChartsData.bind(this);
	}

	onURLChange(event) {
		this.setState ({ url: event.target.value });
	}

	getChartsData() {
		this.props.getData(this.state.url);
	}

	render() {
		return (
			<div className={'mainDiv'}>
				<form style={{ display: 'inline-block' }}>
					<label> Введите URL: <input type="text" name="url" //value={this.state.url}
						onChange={this.onURLChange} /></label>
				</form><br />
				<div className={'checkBoxContainer'}>
					<CheckBoxContainer className={'checkBoxContainer'} chartsInfo={this.props.chartsInfo} />
				</div>
				<p className='button' onClick={this.getChartsData}>ВЫПОЛНИТЬ</p>
				<svg id="line-chart" /><br/>
				<D3Container >
					<D3Feld >
						<Axis>
							<D3RenderDataLines />
							<D3ResponsiveElements />
						</Axis>
					</D3Feld>
				</D3Container >
				
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
        getData: bindActionCreators(actions.getData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

/*
@connect(
    ({ state }) => ({
        chartsInfo: state.chartsInfo.chartsInfo,
        activePositons: state.chartsInfo.activePositons,
    }),
    dispatch => ({
        getData: () => dispatch(actions.getData()),
    }),
)
*/