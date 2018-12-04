import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as pageActions from '../../actions/PageActions.js'
import D3Lines from './D3Lines';
import D3ResponsiveElements from './D3ResponsiveElements'
import * as d3 from "d3";
import moment from 'moment';

class D3Feld extends React.Component {
    constructor() {
        super();
        this.returnLineComponent = this.returnLineComponent.bind(this)
    }

    returnLineComponent() {
        if (this.lineProps !== undefined) {
            return (
                <div>
                <D3Lines
                    formattedDate={this.lineProps.formattedDate}
                    rawData={this.lineProps.rawData}
                    width={this.lineProps.width}
                    height={this.lineProps.height}
                    parseTime={this.lineProps.parseTime}
                    svg={this.lineProps.svg}
                    formatter={this.lineProps.formatter}
                    x={this.lineProps.x}
                    y={this.lineProps.y}
                    g={this.lineProps.g}
                />
                    <D3ResponsiveElements
                    lineProps={this.lineProps}
                    />
        </div>
        )
        }
        return null
    }

    componentWillMount(){
        d3.selectAll("path.line").remove();
    }

    componentDidMount() {
        const rawData = this.props.rawData;
        const svgWidth = window.innerWidth- 100, svgHeight = 450;
        const margin = { right: 20, bottom: 20 };
        const width = svgWidth - margin.right;
        const height = svgHeight - margin.bottom;
        const formatter = d3.format(".0%");
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        let formattedDate = [];
        rawData.timeStamp.map(function (d) {
            const formatted = moment.unix(d).format("YYYY-MM-DD HH:mm");
            formattedDate.push(formatted)
        });

        let svg = d3.select('#line-chart')
            .attr("class", "gist")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        this.svg = svg;

        let x = d3.scaleTime()
            .domain(d3.extent(formattedDate.map(function (d) {
                return parseTime(d)
            })))
            .range([0, width]);

        let y = d3.scaleLinear()
            .range([height, 0]);

        let g = svg.append("g");

        let gX = g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .ticks(16)
                .tickSize(-height)
                .tickPadding(6))
            .select(".domain")
            .remove();

        let gY = g.append("g")
            .call(d3.axisLeft(y)
                .ticks(6)
                .tickSize(-svgWidth)
                .tickPadding(6)
                .tickFormat(formatter)
            )
            .attr("class", "axis axis--y")
            .select(".domain")
            .remove();

      this.props.changeLineProps({ formattedDate, width, parseTime, svg, formatter, x, y, g });
       this.lineProps = {rawData, formattedDate, height, width, parseTime, svg, formatter, x, y, g }
    }


    render() {
        return this.returnLineComponent()
    }
}

function mapStateToProps(state) {
    return {
        lineProps: state.chartsInfo.lineProps,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeLineProps: bindActionCreators(pageActions.changeLineProps, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(D3Feld)
