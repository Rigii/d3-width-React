import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import moment from 'moment';

class D3ResponsiveElements extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps !== this.props) return true
    }

    render() {
        const { formattedDate,
            rawData,
            width,
            height,
            parseTime,
            svg,
            formatter,
            x,
            y,
            g } = this.props.lineProps;
        let bisectDate = d3.bisector(function (d) { return d; }).left;
        let activePositions = this.props.activePositions;


        svg.on("mousemove", mousemove)
            .on("mouseout", function () {
                d3.selectAll("circle").remove();
                d3.selectAll("line.lineVertical").remove();
                d3.selectAll(".tooltip").remove();
            });

        function mousemove() {
            let scaleTime = moment(x.invert(d3.mouse(this)[0])).format("X"),
                i = bisectDate(rawData.timeStamp, scaleTime, 1),
                d0 = i - 1,
                d1 = i,
                n = scaleTime - rawData.timeStamp[d0] > rawData.timeStamp[d1] - scaleTime ? d1 : d0;
            for (let i = 0; i < activePositions.length; i++) {
                let key = activePositions[i];

                d3.selectAll("circle." + key).remove();
                svg.selectAll("dot")
                    .data([rawData[key][n]])
                    .enter().append("circle")
                    .attr("r", 3)
                    .attr("class", key)
                    .attr("fill", "white")
                    .attr("stroke", 'blue')
                    .attr("cx", function (d, i) {
                        if (d !== null && d !== undefined) return x(parseTime(formattedDate[n]));
                        return null
                    })
                    .attr("cy", function (d) {
                        if (d !== null && d !== undefined) return y(d / 100);
                    });
            }
            if (activePositions.length != 0) {
                d3.selectAll("line.lineVertical").remove();
                svg.append("line")
                    .attr("class", 'lineVertical')
                    .attr("x1", x(parseTime(formattedDate[n])))
                    .attr("y1", 0)
                    .attr("x2", x(parseTime(formattedDate[n])))
                    .attr("y2", height)
                    .style("stroke-width", 0.5)
                    .style("stroke", "black")
                    .style("fill", "none");

                let modalContent = () => {
                    let text = ""
                    for (let i = 0; i < activePositions.length; i++) {
                        let key = activePositions[i];
                        text = '<p>' + text + key + " " + rawData[key][n] + '</p>';

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
        return null
    }
}

function mapStateToProps(state) {
    return {
        activePositions: state.chartsInfo.activePositions,
    }
}

export default connect(mapStateToProps)(D3ResponsiveElements)