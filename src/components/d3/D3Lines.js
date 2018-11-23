import React, { Component } from 'react';
import * as d3 from "d3";

class D3Lines extends React.Component {

    componentDidMount() {
        var x = d3.scaleTime()                                                //созд. линию коорд. х, задаём размеры
            .domain(d3.extent(this.props.rawData, function (d) { return parseTime(d.x) })) // распред. шкалу в завис. от крайних знач. линии
            .range([0, width])                                                //задаём ширину оси

        var y = d3.scaleLinear()                                              //созд. линию коорд. y, задаём размеры
            .range([height, 0]);                                              // .domain() автомат. в %

        var line = d3.line()
            .x(function (d) { return x(parseTime(d.x)) })
            .y(function (d) { return y(d.y / 100) });

        g.append("path")
            .attr("class", "line")
            .datum(this.props.rawData)
            .attr("fill", "none")
            .attr("stroke", "#66c7be")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }

    render() {
        return null
    }
}

export default D3Lines