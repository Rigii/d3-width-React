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
        const {
            height,
            width,
            x, g,
        } = this.context;

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const bisectDate = d3.bisector(function (d) { return d; }).left;
        const activePositions = this.props.activePositions;
        let lines = d3.selectAll('.line')
        /*
        let zoom = d3.zoom()
            .on("zoom", zoomFunction);

        let view = g.append("rect")
            .attr("class", "zoom")
            .attr("width", width)
            .call(zoom)
*/
        console.log(lines)
        
        /*
        function zoomFunction() {
            var new_xScale = d3.event.transform.rescaleX(x)
            // g.select(".area").attr("d", rawData.x(function(d) { return new_xScale(d.date); }));
            g.select(".axis--x").call(d3.axisBottom(x).scale(new_xScale).ticks(16).tickSize(-height))
            g.selectAll(".line").attr("d", line.x(function (d) { return new_xScale(parseTime(d.x)) }));
            g.select(".circle").attr("d", function (d) { return new_xScale(parseTime(d.x)) })

        }*/
        return null
    }
}

export default D3ZoomMove