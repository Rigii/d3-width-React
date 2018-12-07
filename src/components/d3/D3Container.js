import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class D3Container extends React.Component {

    getChildContext() {
        return {
            chartsData: this.chartsData,
            maxArrName: this.maxArrName
        };
    }

    componentWillMount() {
        this.chartsData = this.props.chartsInfo;
        let maxNum = null;
        let maxName = '';
        Object.keys(this.chartsData).map((name) => {
            if (name !== 'timeStamp') {
                let maxInEachArr = Math.max.apply(null, this.chartsData[name]);
                if (maxNum < maxInEachArr) {
                    maxNum = maxInEachArr;
                    maxName = name
                }
            }
        })
        this.maxArrName = maxName
    }

    render() {
        return this.props.children
    }
    static childContextTypes = {
        chartsData: PropTypes.instanceOf(Object),
        maxArrName: PropTypes.string
    };
}

function mapStateToProps(state) {
    return {
        chartsInfo: state.chartsInfo.chartsInfo,
        activePositons: state.chartsInfo.activePositons,
    }
}
export default connect(mapStateToProps)(D3Container)