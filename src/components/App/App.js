import React, {Component} from 'react';
import Item from '../UsersList/UsersList.js';
import './App.css';
import {bindActionCreators} from 'redux'; //ф-ия привязки actions
import {connect} from 'react-redux'; // ф-ия привязки стейта из стора к компоненту в props
import * as pageActions from '../../actions/PageActions.js'// импорт actions из PageActions. Доступны как pageActions
import {CART_TYPE_BLOCK} from '../../constants/Const.js'
import {CART_TYPE_INLINE} from '../../constants/Const.js'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: CART_TYPE_BLOCK,
            windPos: 0,
            isLoad: false
        };

        this.updateData = this.updateData.bind(this);
        this.cardsView = this.cardsView.bind(this);
    }

    updateData() {
        if (window.pageYOffset + window.innerHeight > document.body.scrollHeight
            && !this.state.isLoad) {
            this.state.isLoad = true;
            this.props.pageActions.getUserData(10)
        }
    }

    cardsView() {
        if (this.state.cards === CART_TYPE_BLOCK) {
            this.setState({cards: CART_TYPE_INLINE, windPos: window.pageYOffset})
        }
        if (this.state.cards === CART_TYPE_INLINE) {
            this.setState({cards: CART_TYPE_BLOCK, windPos: window.pageYOffset})
        }
    }

    componentDidMount() {
        this.props.pageActions.getUserData(20);
        this.setState({windPos: document.body.scrollHeight});
        document.addEventListener('scroll', this.updateData)
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.updateData)
    }

    componentWillReceiveProps(props) {
        this.setState({isLoad: props.isLoad})
    }

    render() {
   // console.log(this.props.pageActions.deleteUser);
        const usersInfo = this.props.usersInfo;
        return (
            <div className="App" style={{display: 'inline-block'}}>
                <h1 className='App-header'>Test app</h1>
                <button className="changeFormatCards" onClick={this.cardsView}>Show cards</button>
                <br/>
                <div className= "cardsContainer">
                    {usersInfo !== undefined ?
                        usersInfo.map(function (item, i) {
                            let key = +(item.phone.split('').filter(function (number) {
                                return isNaN(+number) ? null : number
                            }).join('').replace(/\s/g, ''));
                            return <Item key={key} item={item} index={i} cards={this.state.cards} imageId={key}
                            delUser={this.props.pageActions.deleteUser}/>
                        }.bind(this)) : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersInfo: state.usersInfo.usersInfo,
        isLoad: state.usersInfo.isload
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

