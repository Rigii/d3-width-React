import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import D3Feld from './D3Feld';
import Axis from './Axis';

class D3Container extends React.Component {

    getChildContext() {
        return {
            chartsData: this.chartsData,
            maxArrName: this.maxArrName,
            activePositions: this.props.activePositions
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
        });

        this.maxArrName = maxName // определили мамый длинный объект, по нему будет размечатся ось У
    }

    render() {
        const childrenProps = Object.keys(this.chartsData).length === 0 ? null :
            <D3Feld>
                <Axis/>
            </D3Feld>;

        return childrenProps
    }

    static childContextTypes = {
        chartsData: PropTypes.instanceOf(Object),
        maxArrName: PropTypes.string,
        activePositions: PropTypes.instanceOf(Array)
    };
}

function mapStateToProps(state) {
    return {
        chartsInfo: state.chartsInfo.chartsInfo,
        activePositions: state.chartsInfo.activePositions,
    }
}

export default connect(mapStateToProps)(D3Container)