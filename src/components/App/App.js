import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as getData from '../../actions/PageActions.js'
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
				<div style={{ display: 'inline-block' }}>
					<label> Введите URL: <input type="url" name="url" value={this.state.url}
						onChange={this.onURLChange} /></label>
				</div><br />
				<div className={'checkBoxContainer'}>
					<CheckBoxContainer className={'checkBoxContainer'} chartsInfo={this.props.chartsInfo} />
				</div>
				<p className='button' onSubmit={this.getChartsData}>ВЫПОЛНИТЬ</p>
				<svg id="line-chart" /><br />
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
		getData: bindActionCreators(getData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)