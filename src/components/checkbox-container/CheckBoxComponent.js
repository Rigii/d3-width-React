import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/PageActions.js'

class CheckBoxComponent extends Component {
    constructor() {
        super();
        this.setChartsData = this.setChartsData.bind(this);
    }

    setChartsData(e) {
        this.props.chooseItems(e.target.value)
    }
    render() {
        return (
            <p>{this.props.value + ' '}
                <input type='checkbox' value={this.props.value} onChange={this.setChartsData} />
            </p>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseItems: bindActionCreators(actionCreators.chooseItems, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CheckBoxComponent);