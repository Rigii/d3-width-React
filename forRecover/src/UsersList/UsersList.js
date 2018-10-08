import React, { Component } from 'react';
import './UsersList.css';
import FastAverageColor from 'fast-average-color/dist/index.js'

class Item extends React.Component{
	constructor(props){
		super(props)
		this.state={
			display: 'none',
			photo: props.item.picture.medium
		}
		this.moreInfo=this.moreInfo.bind(this)
	}
	moreInfo(){
		this.state.display==='none'?
		this.setState({display:'inline-block'}):
		this.setState({display:'none'})
	}

	componentWillReceiveProps(props){
		if(props.cards==='inline-block'){
			this.setState({display:'inline-block', photo: props.item.picture.large})
		}else{this.setState({display:'none', photo: props.item.picture.medium})}
	}
/*
	componentDidMount(){
		let fac=new FastAverageColor()
		let color=fac.getColor(this.props.item.picture.large)
		console.log(color)
	}
*/
	render(){

		return (
			<div className='item' style={{display:this.props.cards}}>
			<img src={this.state.photo} alt="lorem"/>
			<ul style={{display:this.state.display }}>
			<p>{this.props.item.name.first}</p>
			<p>{this.props.item.name.last}</p>
			<p>{this.props.item.email}</p>
			</ul><br/>
			<button onClick={this.moreInfo}>More information</button>
			</div>
			)}
	}
	export default Item
