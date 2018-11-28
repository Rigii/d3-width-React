
import React, { Component } from 'react';
import { connect } from 'react-redux';
import D3Line from './D3Line';
import * as d3 from "d3";

class D3Lines extends Component {

    render() {
        return Object.keys(this.props.rawData).map((name) => {
            let key = null;
            for (let n = 0; n < name.length; n++) {
                key = key + name.charCodeAt(n)
            }
            let isChartActive = this.props.activePositons.indexOf(name)
            if (isChartActive != -1) {
                d3.select("path.line").remove()
                return <D3Line key={key} name={name} lineProps={this.props} />
            }
            return null
        })
    }
}

function mapStateToProps(state) {
    return {
        activePositons: state.chartsInfo.activePositons,
    }
}

export default connect(mapStateToProps)(D3Lines)