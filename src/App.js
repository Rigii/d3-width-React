import React, { Component } from 'react';
import Item from './UsersList/UsersList.js';
import './App.css';
import {bindActionCreators} from 'redux'; //ф-ия привязки actions
import {connect} from 'react-redux'; // ф-ия привязки стейта из стора к компоненту в props
import * as pageActions from './actions/PageActions'// импорт actions из PageActions. Доступны как pageActions


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      cards: 'block',
      windPos: 0,
      isLoad: false
    }

    this.updateData=this.updateData.bind(this);
    this.cardsView=this.cardsView.bind(this);
  }
  updateData(){
   if (window.pageYOffset+window.innerHeight>document.body.scrollHeight
   && !this.state.isLoad){
     this.state.isLoad = true
     this.props.pageActions.getUserData()
   }
 }

 cardsView(){
  this.state.cards=='block'? this.setState({cards:'inline-block', windPos:window.pageYOffset}) :
  this.setState({cards:'block', windPos:window.pageYOffset})
}

componentDidMount(){
this.props.pageActions.getUserData();
this.setState({windPos: document.body.scrollHeight});
document.addEventListener('scroll', this.updateData)
}

componentWillUnmount(){
document.remooveEventListener('scroll', this.updateData)
}

componentWillReceiveProps(props){
  this.setState({isLoad:props.isLoad})
}

render() {
	const usersInfo= this.props.usersInfo;
    return (
      <div className="App" style={{display:'inline-block'}}>
      <h1 className='App-header'>Test app</h1>
      <button className="cards" onClick={this.cardsView}>Show cards</button><br/>
      <div className='users'>
      {usersInfo!==undefined? 
        usersInfo.map(function(item){
          let key=+(item.phone.split('').filter(function(number){return isNaN(+number)? null: number}).join('').replace(/\s/g, ''));
          return <Item key={key} item={item} cards={this.state.cards}/>
        }.bind(this)) : null} 
        </div>
        </div>
        );
  }
}

function mapStateToProps(state){
	return {
		usersInfo: state.usersInfo.usersInfo,
    isLoad: state.usersInfo.isload
	}
}

function mapDispatchToProps(dispatch){
return{
	pageActions: bindActionCreators(pageActions, dispatch)
}
}
export default connect (mapStateToProps, mapDispatchToProps)(App)

