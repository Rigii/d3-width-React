import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import moment from 'moment';
import PropTypes from 'prop-types'

class D3ZoomMove extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) return true
    }

    render() {
        const { formattedDate,
            height,
            width,
            xAxis,
            yAxis,
            g,
            svg,
            lineAxisX
        } = this.context;

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const bisectDate = d3.bisector(function (d) { return d; }).left;

        let zoom = d3.zoom()
            .scaleExtent([0.75, 15000])
            .on("zoom", zoomFunction);

        svg.call(zoom);

        function zoomFunction() {

            let new_xScale = d3.event.transform.rescaleX(xAxis)
            
            let newLine = d3.line()
                .defined(function (d, i) { return formattedDate[i] != 0; })
                .x(function (d, i) { return new_xScale(parseTime(formattedDate[i])) })
                .y(function (d) { return yAxis(d) });

            g.select(".axis--x").call(d3.axisBottom(xAxis).scale(new_xScale).ticks(16).tickSize(-height).tickPadding(6))
            g.selectAll(".line").attr("d", newLine)

        }
        return null
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
        height: PropTypes.number
    }
}

export default D3ZoomMove