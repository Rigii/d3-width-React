import React, { Component } from 'react';
import './app.css';
import RequestSelectionData from './../checkbox-container/RequestSelectionData.js'
import D3Container from '../d3/D3Container'

class App extends Component {

	render() {
		return (
			<div className={'mainDiv'}>
				<RequestSelectionData />
				<svg id="line-chart" /><br />
				<D3Container />
			</div>
		)
	}
}

export default App
