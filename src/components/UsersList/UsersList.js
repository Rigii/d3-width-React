import React, { Component } from 'react';
import './UsersList.css';
import {CART_TYPE_INLINE} from "../../constants/Const.js";
import {CART_TYPE_BLOCK} from "../../constants/Const.js";
import ImagePalette from 'react-image-palette'

const SomeComponent = ({props, state, moreInfo, deleteUser, crossOrigin, image}) => (
    <ImagePalette image={image} crossOrigin={crossOrigin}>
        {({ backgroundColor}) => (
                <div  className="innerItem" style={{ backgroundColor }}>
                    <div>
                        <img id={props.imageId} src={state.photo} alt="lorem"/>
                        <ul className='listDisplay'>
                            <p>{props.item.name.first}</p>
                            <p>{props.item.name.last}</p>
                            <p>{props.item.email}</p>
                        </ul><br/>
                    </div>
                    <div className="butCont">
                        <button onClick={moreInfo}>More information</button><br/>
                        <button onClick={deleteUser}>Delete</button>
                    </div>
                </div>
        )}
    </ImagePalette>
);

class Item extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cardsState: null,
			display: 'none',
			photo: props.item.picture.medium,
			cardsClass: 'item'
		};
		this.moreInfo=this.moreInfo.bind(this);
		this.deleteUser=this.deleteUser.bind(this)
	}
	moreInfo(){
		this.state.cardsClass==='item'?
		this.setState({cardsClass:'item_cards'}):
		this.setState({cardsClass:'item'})
    }
		changeStateCards(props){
            if(props.cards===CART_TYPE_INLINE){
                this.setState({cardsClass: 'item_cards', photo: props.item.picture.large})
            }
            if(props.cards===CART_TYPE_BLOCK){this.setState({cardsClass: 'item', photo: props.item.picture.medium})}
    }
    deleteUser(){
        this.props.delUser(this.props.index)

	}
    componentWillReceiveProps(props){
        this.changeStateCards(props)

	}
	componentDidMount(props){
		let firstProps=this.props;
		this.changeStateCards(firstProps);
	}
	render(){
		return (
		    <div className={this.state.cardsClass}>
                <SomeComponent image={this.props.item.picture.large} props={this.props} state={this.state}
				moreInfo={this.moreInfo} deleteUser={this.deleteUser} crossOrigin={false}/>
            </div>

			)}
	}
	export default Item
