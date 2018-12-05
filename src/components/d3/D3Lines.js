
import React, { Component } from 'react';
import { connect } from 'react-redux';
import D3Line from './D3Line';
import * as d3 from "d3";

class D3Lines extends Component {

    componentWillReceiveProps() {
        this.prevActiveLines = this.props.activePositions;
    }

    render() {
        return Object.keys(this.props.rawData).map((name) => {
            let isChartActive = this.props.activePositions.indexOf(name);
            let isChartDrawed = this.prevActiveLines !== undefined ? this.prevActiveLines.indexOf(name) : 0;
            if (isChartActive !== -1 && isChartDrawed === -1) {
                let key = null;
                for (let n = 0; n < name.length; n++) {
                    key = key + name.charCodeAt(n)
                }
                return <D3Line key={key} name={name} lineProps={this.props} />
            }
            if (isChartActive == -1) {
                d3.select("path." + name).remove();
                d3.selectAll("circle." + name).remove();
                return null
            }
        })
    }
}

function mapStateToProps(state) {
    return {
        activePositions: state.chartsInfo.activePositions,
    }
}

export default connect(mapStateToProps)(D3Lines)