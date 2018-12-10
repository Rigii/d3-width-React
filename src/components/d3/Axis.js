import React from 'react'
import * as d3 from "d3";
import moment from 'moment';
import PropTypes from 'prop-types'

class Axis extends React.Component {

    getChildContext() {
        return {
            g: this.g,
            formattedDate: this.formattedDate,
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            height: this.height
        };
    }

    componentWillMount() {
        const {
            svg,
            maxArrName,
            chartsData
        } = this.context;
        const svgWidth = window.innerWidth - 100,
            svgHeight = window.innerHeight - 200;
        const margin = { right: 20, bottom: 20 };
        const width = svgWidth - margin.right;
        this.height = svgHeight - margin.bottom;
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const formattedDate = [];
        chartsData.timeStamp.map(function (d) {
            const formatted = moment.unix(d).format("YYYY-MM-DD HH:mm");
            formattedDate.push(formatted)
        });
        this.formattedDate = formattedDate;
        this.xAxis = d3.scaleTime()
            .domain(d3.extent(formattedDate.map(function (d) {
                return parseTime(d)
            })))
            .range([0, width]);

        this.yAxis = d3.scaleLinear()
            .domain(d3.extent(chartsData[maxArrName].map(function (d) {
                return d
            })))
            .range([this.height, 0]);

        if (svg !== undefined) {
            this.g = svg.append("g")
                .attr("transform", "translate(" + margin.right + ")")
            const lineAxisX = this.g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(this.xAxis)
                    .ticks(16)
                    .tickSize(3)
                    .tickPadding(6))
                .select(".domain")
                .remove();

            const lineAxisY = this.g.append("g")
                .call(d3.axisLeft(this.yAxis)
                    .ticks(6)
                    .tickSize(3)
                    .tickPadding(6)
                )
                .attr("class", "axis axis--y")
                .select(".domain")

            d3.selectAll("g.axis--x g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", - (this.height));


            d3.selectAll("g.axis--y g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", svgWidth)
                .attr("y2", 0);
        }
    }

    render() {
        return this.props.children
    }

    static contextTypes = {
        svg: PropTypes.instanceOf(Object),
        maxArrName: PropTypes.string,
        chartsData: PropTypes.instanceOf(Object),
    }
    static childContextTypes = {
        g: PropTypes.instanceOf(Object),
        formattedDate: PropTypes.instanceOf(Array),
        yAxis: PropTypes.instanceOf(Object),
        xAxis: PropTypes.instanceOf(Object),
        height: PropTypes.number
    }
}

export default Axis;