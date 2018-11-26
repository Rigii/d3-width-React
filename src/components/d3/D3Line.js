import React, { Component } from 'react';
import * as d3 from "d3";

class D3Line extends React.Component {

    componentDidMount() {
        const{rawData,
            width,
            parseTime,
            svg,
            formatter,
            x, y, g} = this.props;
        const line = d3.line()
            .x(function (d) { return x(parseTime(d.x)) })
            .y(function (d) { return y(d.y / 100) });

        g.append("path")
            .attr("class", "line")
            .datum(rawData)
            .attr("fill", "none")
            .attr("stroke", "#66c7be")
            .attr("stroke-width", 1.5)
            .attr("d", line);

        //Модальное окно, точки и функция отображ.
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
//...

        // Точки и функция отображ.
        svg.selectAll("dot")
            .data(rawData)
            .enter().append("circle")
            .attr("r", 4)
            .attr("class", 'circle')
            .attr("cx", function(d) {return x(parseTime(d.x))})
            .attr("cy", function(d) { return y(d.y/100)})
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(formatter(d.y/100) + "<br/>"  + (d.x).substring(11))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }

    render() {
        return null
    }
}

export default D3Line