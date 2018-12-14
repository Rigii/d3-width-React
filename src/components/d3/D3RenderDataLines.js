import React, { Component } from 'react';
import D3Line from './D3Line';
import * as d3 from "d3";
import PropTypes from 'prop-types'

class D3RenderDataLines extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) return true
    }

    componentWillReceiveProps() {
        this.prevActiveLines = this.context.activePositions;
    }

    render() {

        const chartsData = this.context.chartsData;
        return Object.keys(chartsData).map((name) => {
            let isChartActive = this.context.activePositions.indexOf(name);
            let isChartDrawed = this.prevActiveLines !== undefined ? this.prevActiveLines.indexOf(name) : 0;
            if (isChartActive !== -1 && isChartDrawed === -1) {
                let key = null;
                for (let n = 0; n < name.length; n++) {
                    key = key + name.charCodeAt(n)
                }
                return (
                    <div key={key}>
                        <D3Line name={name} lineProps={this.props.childProps} chartsData={chartsData} />
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
        chartsData: PropTypes.instanceOf(Object),
        activePositions: PropTypes.instanceOf(Array)
    }
}


export default D3RenderDataLines