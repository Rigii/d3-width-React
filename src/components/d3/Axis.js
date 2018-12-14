import React from 'react'
import * as d3 from "d3";
import moment from 'moment';
import PropTypes from 'prop-types';
import D3ResponsiveElements from './D3ResponsiveElements'
import D3RenderDataLines from './D3RenderDataLines'

class Axis extends React.Component {

    constructor() {
        super();
        this.zoomFunction = this.zoomFunction.bind(this)
        this.state = {
            xAxis: {}
        }
    }

    zoomFunction() {
        d3.selectAll("circle").remove();
        d3.selectAll("line.lineVertical").remove();
        d3.selectAll(".tooltip").remove();

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const { formattedDate, yAxis } = this
        const xAxis = this.state.xAxis
        let new_xScale = d3.event.transform.rescaleX(xAxis);
        new_xScale.range([0, this.width]);

        let newLine = d3.line()
            .defined(function (d, i) { return formattedDate[i] !== 0; })
            .x(function (d, i) { return new_xScale(parseTime(formattedDate[i])) })
            .y(function (d) { return yAxis(d) });
        this.g.selectAll(".line").attr("d", newLine).attr("clip-path", "url(#clip)")

        this.g.select(".axis--x")
            .call(d3.axisBottom(xAxis)
                .scale(new_xScale).ticks(16)
                .tickSize(-this.height)
                .tickPadding(6))
        this.xAxis = new_xScale
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

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const formattedDate = [];

        chartsData.timeStamp.map(function (d) {
            const formatted = moment.unix(d).format("YYYY-MM-DD HH:mm");
            formattedDate.push(formatted)
        });

        const xAxis = d3.scaleTime()
            .domain(d3.extent(formattedDate.map(function (d) {
                return parseTime(d)
            })))
            .range([0, width]);

        this.formattedDate = formattedDate;
        this.width = width;
        this.height = svgHeight - margin.bottom;
        this.xAxis = xAxis;
        this.yAxis = d3.scaleLinear()
            .domain(d3.extent(chartsData[maxArrName].map(function (d) {
                return d
            })))
            .range([this.height, 0]);
        
        this.setState({ xAxis: xAxis })
        
        if (svg !== undefined) {
            this.g = svg.append("g")
                .attr("class", "parent")
                .attr("width", svgWidth)
                .attr("transform", "translate(" + margin.right + ")")

            svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", this.height);

            const lineAxisX = this.g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(this.xAxis)
                    .ticks(16)
                    .tickSize(-this.height)
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

            d3.selectAll("g.axis--y g.tick")
                .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", svgWidth)
                .attr("y2", 0);

         //   d3.select('.path').on("load", this.zoomFunction)
            const zoomFunction = this.zoomFunction;
            const zoom = d3.zoom()
                .scaleExtent([0.75, 1000])
                .on("zoom", zoomFunction);
            svg.call(zoom);
        }
    }

    render() {
        return (
            <div>
                <D3RenderDataLines childProps={this} />
                <D3ResponsiveElements childProps={this} />
            </div>
        )
    }

    static contextTypes = {
        svg: PropTypes.instanceOf(Object),
        maxArrName: PropTypes.string,
        chartsData: PropTypes.instanceOf(Object),
    }
}


export default Axis;