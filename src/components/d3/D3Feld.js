import React, { Component } from 'react';
import D3Lines from './D3Lines';
import * as d3 from "d3";
import moment from 'moment';

class D3Feld extends React.Component {
    constructor() {
        super();
        this.state = {
            lineComponent: null
        }
    }

    returnLineComponent(props) {  
        this.setState({
            lineComponent: <D3Lines
                formattedDate={props.formattedDate}
                rawData={this.props.rawData}
                width={props.width}
                parseTime={props.parseTime}
                svg={props.svg}
                formatter={props.formatter}
                x={props.x}
                y={props.y}
                g={props.g}
                drawingLines= {this.props.drawingLines}
            />
        });
    }

    componentDidMount() {
        console.log(this.props.drawingLines)
        const rawData = this.props.rawData;
        const svgWidth = 1250, svgHeight = 450;
        const margin = { right: 20, bottom: 20 };
        const width = svgWidth - margin.right;
        const height = svgHeight - margin.bottom;
        const formatter = d3.format(".0%");
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        let formattedDate = []
        rawData.timeStamp.map(function (d) {
            const formatted = moment.unix(d).format("YYYY-MM-DD HH:mm");
            console.log(formatted)
            formattedDate.push(formatted)
        })


        let svg = d3.select('#line-chart')
            .attr("class", "gist")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

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

        this.returnLineComponent({ formattedDate, width, parseTime, svg, formatter, x, y, g });
    }


    render() {
        return this.state.lineComponent
    }
}

export default D3Feld
