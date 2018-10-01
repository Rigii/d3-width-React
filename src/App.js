import React, { Component } from 'react';
import Item from './UsersList/UsersList.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      usersInfo:[],
      cards: 'block',
      windPos: 0
    }
    this.getUserData=this.getUserData.bind(this);
    this.updateData=this.updateData.bind(this);
    this.cardsView=this.cardsView.bind(this);
  }

  getUserData(props){
    var usersInfo=this.state.usersInfo;
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results='+props);
    xhr.onload=function(){
      let data=JSON.parse(xhr.response)
      usersInfo=usersInfo.concat(data.results)
      this.setState({usersInfo, windPos:window.pageYOffset})
    }.bind(this)
    xhr.send()
  }
  updateData(){
   if (this.state.windPos+200<window.pageYOffset){
    console.log('123123123123123')
     this.getUserData(10)
   }else{
    return false
   }
 }

 cardsView(){
  this.state.cards=='block'? this.setState({cards:'inline-block', windPos:window.pageYOffset}) :
  this.setState({cards:'block', windPos:window.pageYOffset})
}
componentDidMount(){
  this.getUserData(10);
  document.addEventListener('scroll', this.updateData)
}

componentWillUnmount(){
  document.removeEventListener('scroll', this.updateData)
}

render() {
    console.log(this.state.windPos)
    console.log(window.pageYOffset)
    return (
      <div className="App" style={{display:'inline-block'}}>
      <h1 className='App-header'>Их разыскивает милиция</h1>
      <button className="cards" onClick={this.cardsView}>Show cards</button><br/>
      <div className='users'>
      {this.state.usersInfo!==undefined? 
        this.state.usersInfo.map(function(item){
          let key=+(item.phone.split('').filter(function(number){return isNaN(+number)? null: number}).join('').replace(/\s/g, ''));
          return <Item key={key} item={item} cards={this.state.cards}/>
        }.bind(this)) : null} 
        </div>
        </div>
        );

  }
}

export default App;
