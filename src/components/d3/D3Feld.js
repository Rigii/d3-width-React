import React, { Component } from 'react';
import PropTypes from "prop-types";
import * as d3 from "d3";

class D3Feld extends React.Component {

    componentDidMount() {
        var svgWidth = 1250, svgHeight = 450;
        var margin = { right: 20, bottom: 20};
        var width = svgWidth  - margin.right;
        var height = svgHeight - margin.bottom;
        var formatter = d3.format(".0%")                                     
        var parseTime = d3.timeParse('%Y-%m-%d %H:%M');                      

        let svg = d3.select('#line-chart')
            .attr("class", "gist")                                           
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            //.call(zoom);

        let x = d3.scaleTime()                                                
            .domain(d3.extent(this.props.rawData, function (d) { return parseTime(d.x) }))
            .range([0, width])                                                

        let y = d3.scaleLinear()                                              
            .range([height, 0]);                                              

        let g = svg.append("g")                                              
        
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
    }

    render() {
        return null
    }
}

export default D3Feld
