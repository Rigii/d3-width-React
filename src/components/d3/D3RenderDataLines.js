import React, { Component } from 'react';
import { connect } from 'react-redux';
import D3Line from './D3Line';
import * as d3 from "d3";
import PropTypes from 'prop-types'

class D3RenderDataLines extends Component {

    componentWillReceiveProps() {
        this.prevActiveLines = this.props.activePositions;
    }

    render() {
        return Object.keys(this.context.chartsData).map((name) => {

            let isChartActive = this.props.activePositions.indexOf(name);
            let isChartDrawed = this.prevActiveLines !== undefined ? this.prevActiveLines.indexOf(name) : 0;
            if (isChartActive !== -1 && isChartDrawed === -1) {
                let key = null;
                for (let n = 0; n < name.length; n++) {
                    key = key + name.charCodeAt(n)
                }

                return (
                    <div key={key}>
                        <D3Line name={name} lineProps={this.context} xAxis={this.props.xAxis} />
                    </div>)
            }
            if (isChartActive === -1) {
                d3.select("path." + name).remove();
                d3.selectAll("circle." + name).remove();
                return null
            }
        })
    }

    static contextTypes = {
        svg: PropTypes.instanceOf(Object),
        maxArrName: PropTypes.string,
        chartsData: PropTypes.instanceOf(Object),
        g: PropTypes.instanceOf(Object),
        formattedDate: PropTypes.instanceOf(Array),
        yAxis: PropTypes.instanceOf(Object),
        xAxis: PropTypes.instanceOf(Object),
        lineAxisX: PropTypes.instanceOf(Object),
        height: PropTypes.number,
        new_xScale: PropTypes.instanceOf(Object)
    }
}

function mapStateToProps(state) {
    return {
        activePositions: state.chartsInfo.activePositions,
        xAxis: state.chartsInfo.xAxis
    }
}

export default connect(mapStateToProps)(D3RenderDataLines)