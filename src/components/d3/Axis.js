import React from 'react'
import * as d3 from "d3";
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/PageActions.js'

class Axis extends React.Component {

    constructor() {
        super()
        this.state = {
            xAxis: {}
        }
        this.zoomFunction = this.zoomFunction.bind(this)
    }

    getChildContext() {
        return {
            g: this.g,
            formattedDate: this.formattedDate,
            yAxis: this.yAxis,
            height: this.height,
            lineAxisX: this.lineAxisX,
            new_xScale: this.new_xScale
        };
    }

    zoomFunction() {
        d3.selectAll("circle").remove();
        d3.selectAll("line.lineVertical").remove();
        d3.selectAll(".tooltip").remove();

        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const { formattedDate, yAxis } = this
        let new_xScale = d3.event.transform.rescaleX(this.xAxis);
        new_xScale.range([0, this.width]);

        this.setState({ xAxis: new_xScale })
        this.props.xAxisFunc(new_xScale)

        let newLine = d3.line()
            .defined(function (d, i) { return formattedDate[i] !== 0; })
            .x(function (d, i) { return new_xScale(parseTime(formattedDate[i])) })
            .y(function (d) { return yAxis(d) });

        this.g.select(".axis--x")
                .call(d3.axisBottom(this.xAxis)
                .scale(new_xScale).ticks(16)
                .tickSize(-this.height)
                .tickPadding(6))
        this.g.selectAll(".line").attr("d", newLine).attr("clip-path", "url(#clip)")

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
        this.width = width;
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

        this.setState({ xAxis: this.xAxis })
        this.props.xAxisFunc(this.xAxis)

        this.yAxis = d3.scaleLinear()
            .domain(d3.extent(chartsData[maxArrName].map(function (d) {
                return d
            })))
            .range([this.height, 0]);

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


            d3.select('.path').on("load", this.zoomFunction)
            const zoomFunction = this.zoomFunction;
            const zoom = d3.zoom()
                .scaleExtent([0.75, 1000])
                .on("zoom", zoomFunction);
            svg.call(zoom);
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
        height: PropTypes.number,
        lineAxisX: PropTypes.instanceOf(Object),
        new_xScale: PropTypes.instanceOf(Object)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        xAxisFunc: bindActionCreators(actionCreators.xAxisFunc, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Axis);