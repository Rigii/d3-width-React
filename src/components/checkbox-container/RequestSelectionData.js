import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/PageActions.js'
import CheckBoxContainer from './CheckBoxContainer.js'


class RequestSelectionData extends Component {
    constructor() {
        super();
        this.state = {
            url: ''
        };
        this.onURLChange = this.onURLChange.bind(this);
        this.getChartsData = this.getChartsData.bind(this);
    }

    onURLChange(event) {
        this.setState({ url: event.target.value });
    }

    getChartsData() {
        this.props.getData(this.state.url);
    }

    render() {
        return (
            <div className={'mainDiv'}>
                <div style={{ display: 'inline-block' }}>
                    <label> Введите URL: <input type="text" name="url"
                        onChange={this.onURLChange} /></label>
                </div><br />
                <div className={'checkBoxContainer'}>
                    <CheckBoxContainer className={'checkBoxContainer'} chartsInfo={this.props.chartsInfo} />
                </div>
                <p className='button' onClick={this.getChartsData}>ВЫПОЛНИТЬ</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        chartsInfo: state.chartsInfo.chartsInfo,
        activePositons: state.chartsInfo.activePositons,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: bindActionCreators(actions.getData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSelectionData)
