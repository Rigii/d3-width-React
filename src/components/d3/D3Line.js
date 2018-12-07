import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import getRandomColor from './../helpers/helpers.js'



class D3Line extends React.Component {

    render() {
        const {
            chartsData,
            formattedDate,
            xAxis, yAxis, g } = this.props.lineProps;

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const key = this.props.name;
        const line = d3.line()
            .x(function (d, i) { return xAxis(parseTime(formattedDate[i])) })
            .y(function (d) { return yAxis(d) });

        let elColor = getRandomColor();
        g.append("path")
            .attr("class", key)
            .datum(chartsData[key])
            .attr("fill", "none")
            .attr("stroke", elColor)
            .attr("stroke-width", 1.5)
            .attr("d", line);


        return null
    }
}



export default D3Line