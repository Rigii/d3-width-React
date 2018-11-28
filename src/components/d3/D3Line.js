import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import getRandomColor from './../helpers/helpers.js'
import moment from 'moment'

class D3Lines extends React.Component {

    render() {
        const {
            rawData,
            parseTime,
            svg,
            formatter,
            formattedDate,
            activePositons,
            x, y, g } = this.props.lineProps;
        const key = this.props.name

        const line = d3.line()
            .x(function (d, i) { return x(parseTime(formattedDate[i])) })
            .y(function (d) { return y(d / 100) });

        svg.on("mousemove", function () {
            let scaleTime = moment(x.invert(d3.mouse(this)[0])).format("X")
            for (let i = 0; i < rawData.timeStamp.length; i++) {
                let arrTime = rawData.timeStamp[i]
                // console.log([scaleTime])
                if (scaleTime == arrTime) { console.log(arrTime) };
            }
            // console.log(scaleTime)
        });


        let elColor = getRandomColor()
        g.append("path")
            .attr("class", "line")
            .datum(rawData[key])
            .attr("fill", "none")
            .attr("stroke", elColor)
            .attr("stroke-width", 1.5)
            .attr("d", line);

        return null
    }
    componentWillUnmount(){
        d3.select("path.line").remove()
     }
}

function mapStateToProps(state) {
    return {
        activePositons: state.chartsInfo.activePositons,
    }
}


export default connect(mapStateToProps)(D3Lines)

/*
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






import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import getRandomColor from './../helpers/helpers.js'
import moment from 'moment'

class D3Lines extends React.Component {

    componentDidMount() {
        const {
            rawData,
            parseTime,
            svg,
            formatter,
            formattedDate,
            activePositons,
            x, y, g } = this.props;

            console.log(activePositons)

        const line = d3.line()
            .x(function (d, i) { return x(parseTime(formattedDate[i])) })
            .y(function (d) { return y(d / 100) });

        const div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svg.on("mousemove", function () {
            let scaleTime = moment(x.invert(d3.mouse(this)[0])).format("X")
            for (let i = 0; i < rawData.timeStamp.length; i++) {
                let arrTime = rawData.timeStamp[i]
               // console.log([scaleTime])
                if (scaleTime == arrTime) { console.log(arrTime) };
            }
           // console.log(scaleTime)
        });

        Object.keys(rawData).map((key) => {
            console.log(activePositons)
            let isChartActive = activePositons.indexOf(key)
            if (key != 'timeStamp' && isChartActive != -1) {
                let elColor = getRandomColor()
                g.append("path")
                    .attr("class", "line")
                    .datum(rawData[key])
                    .attr("fill", "none")
                    .attr("stroke", elColor)
                    .attr("stroke-width", 1.5)
                    .attr("d", line);
            }
        })
    }

    render() {
        return null
    }
}

function mapStateToProps(state) {
	return {
		activePositons: state.chartsInfo.activePositons,
	}
}

export default connect(mapStateToProps)(D3Lines)

*/