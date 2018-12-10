import React from 'react';
import * as d3 from "d3";
import PropTypes from 'prop-types'

class D3Feld extends React.Component {
    constructor() {
        super()
        this.state = {
            isMount: false
        }
    }

    getChildContext() {
        return { svg: this.svg };
    }

    componentDidMount() {
        d3.selectAll("path.line").remove();

        const svgWidth = window.innerWidth - 100,
            svgHeight = window.innerHeight;
        this.svg = d3.select('#line-chart')
            .attr("class", "gist")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        this.setState({ isMount: true })
    }

    render() {
        if (this.state.isMount) return this.props.children;
        return null
    }

    static childContextTypes = {
        svg: PropTypes.instanceOf(Object)
    };
}

export default D3Feld
