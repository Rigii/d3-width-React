import React from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import moment from 'moment';
import PropTypes from 'prop-types'

class D3ResponsiveElements extends React.Component {
    constructor(props) {
        super()
        this.replacePointerElements = this.replacePointerElements.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) return true
    }

    replacePointerElements() {
        const { formattedDate, height, yAxis, xAxis } = this.props.childProps;   
        const { svg, chartsData} = this.context
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M');
        const bisectDate = d3.bisector(function (d) { return d; }).left;
        const activePositions = this.props.activePositions;

        let containerSVG = document.getElementById('line-chart')
        const scaletime = moment(xAxis.invert(d3.mouse(containerSVG)[0])).format("X"),
            i = bisectDate(chartsData.timeStamp, scaletime, 1),
            d0 = i - 1,
            d1 = i,
            n = scaletime - chartsData.timeStamp[d0] > chartsData.timeStamp[d1] - scaletime ? d1 : d0;
        for (let i = 0; i < activePositions.length; i++) {
            const key = activePositions[i];

            d3.selectAll("circle." + key).remove();
            svg.selectAll("dot")
                .data([chartsData[key][n]])
                .enter().append("circle")
                .attr("transform", "translate(" + 20 + ")")
                .attr("r", 3)
                .attr("class", key)
                .attr("fill", "white")
                .attr("stroke", 'blue')
                .attr("cx", function (d, i) {
                    if (d !== null && d !== undefined) return xAxis(parseTime(formattedDate[n]));
                    return null
                })
                .attr("cy", function (d) {
                    if (d !== null && d !== undefined) return yAxis(d);
                });
        }
        if (activePositions.length != 0) {
            d3.selectAll("line.lineVertical").remove();
            svg.append("line")
                .attr("class", 'lineVertical')
                .attr("transform", "translate(" + 20 + ")")
                .attr("x1", xAxis(parseTime(formattedDate[n])))
                .attr("y1", 0)
                .attr("x2", xAxis(parseTime(formattedDate[n])))
                .attr("y2", height)
                .style("stroke-width", 0.5)
                .style("stroke", "black")
                .style("fill", "none");

            const modalContent = () => {
                let text = ""
                for (let i = 0; i < activePositions.length; i++) {
                    const key = activePositions[i];
                    text = '<p>' + text + key + " " + chartsData[key][n] + '</p>';
                    if (chartsData[key][n] == undefined) { d3.selectAll(".tooltip").remove() };
                }
                return text
            }

            d3.selectAll(".tooltip").remove();
            d3.select("body").append("div")
                .attr("class", "tooltip")
                .html(modalContent())
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY + 20) + "px");
        }
    }

    render() {
        let replacePointerElements = this.replacePointerElements
        this.context.svg.on("mousemove", replacePointerElements)
            .on("mouseout", function () {
                d3.selectAll("circle").remove();
                d3.selectAll("line.lineVertical").remove();
                d3.selectAll(".tooltip").remove();
            });

        return null
    }
    static contextTypes = {
        svg: PropTypes.instanceOf(Object),
        chartsData: PropTypes.instanceOf(Object),
    }
}

function mapStateToProps(state) {
    return {
        activePositions: state.chartsInfo.activePositions,
        xAxis: state.chartsInfo.xAxis
    }
}

export default connect(mapStateToProps)(D3ResponsiveElements)