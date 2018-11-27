import React, { Component } from 'react';
import * as d3 from "d3";
import getRandomColor from './../helpers/helpers.js'

class D3Lines extends React.Component {

    componentDidMount() {
        const {
            rawData,
            parseTime,
            svg,
            formatter,
            x, y, g } = this.props;

        const line = d3.line()
            .x(function (d, i) { return x(parseTime(rawData.timeStamp[i])) })
            .y(function (d) { return y(d / 100) });

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        Object.keys(rawData).map((key) => {
            if (key != 'timeStamp') {
                let elColor = getRandomColor()
                g.append("path")
                    .attr("class", "line")
                    .datum(rawData[key])
                    .attr("fill", "none")
                    .attr("stroke", elColor)
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

            // Точки и функция отображ.
            svg.selectAll("dot")
                .data(rawData[key])
                .enter().append("circle")
                .attr("r", 4)
                .attr("class", 'circle')
                .attr("stroke", elColor)
                .attr("cx", function (d, i) { return x(parseTime(rawData.timeStamp[i])) })
                .attr("cy", function (d) { return y(d / 100) })
                .on("mouseover", function (d, i) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(key + "<br/>" + formatter(d / 100) + "<br/>" + (rawData.timeStamp[i]).substring(11))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            }
        })
    }

    render() {
        return null
    }
}

export default D3Lines