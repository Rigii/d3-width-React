import React, { Component } from 'react';
import './app.css';
import RequestSelectionData from './../checkbox-container/RequestSelectionData.js'
import D3Components from '../d3/D3Components'

class App extends Component {

	render() {
		return (
			<div className={'mainDiv'}>
				<RequestSelectionData />
				<svg id="line-chart" /><br />
				<D3Components />
			</div>
		)
	}
}

export default App

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