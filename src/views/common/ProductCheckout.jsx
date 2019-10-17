import React from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  checkbox,
  Icon
} from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import "react-tabs/style/react-tabs.css";

class ProductCheckout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:this.props.data,
			cartItem:this.props.cartItem
		}
	  }
	displayContent(){
		var _self = this;
		var data = _self.state.data;
		var cartItem = _self.state.cartItem;
		console.log('Product:::',data);
		console.log('Selected cartItem:::',cartItem);
		var amount = 0;
		return(
			<div className="place_item">
				<Row className="checkout_header">
					<Col s={2}>
						<b>Image</b>
					</Col>
					<Col s={2}>
						<b>Item Name</b>
					</Col>
					<Col s={2}>
						<b>Color</b>
					</Col>
					<Col s={2}>
						<b>Amount per Item</b>
					</Col>
					<Col s={2}>
						<b>Quantity</b>
					</Col>
					<Col s={2}>
						<b>Total</b>
					</Col>
				</Row>
				{
					cartItem.map(function(placeditem){
						return(<div className="selected_item" key={placeditem.id}>
						{
							data.map(function(item){
								if(placeditem.id == item.id){
									var totalamount = item.amount * placeditem.quantity;
									amount = amount + totalamount;
									return(
										<Row key={item.id}>
											<Col s={2}>
												<img src={item.images[0]} alt="image_card" width="100px" height="100px"/>
											</Col>
											<Col s={2}>
												<p>{item.name}</p>
											</Col>
											<Col s={2}>
												<p>{placeditem.color}</p>
											</Col>
											<Col s={2}>
												${parseFloat(item.amount).toFixed(2)}
											</Col>
											<Col s={2}>
												<span className="actions_pageview" onClick={_self.editQuantity.bind(_self,placeditem.id,'remove')}>
												  <i className="fa fa-minus-circle" title="edit"></i>
												</span>
												<span className="placeditem_quantity">{placeditem.quantity}</span>
												<span className="actions_pageview" onClick={_self.editQuantity.bind(_self,placeditem.id,'add')}>
												  <i className="fa fa-plus-circle" title="edit"></i>
												</span>
											</Col>
											<Col s={2}>
												${parseFloat(totalamount).toFixed(2)}
											</Col>
										</Row>
									)
								}
							})
						}
						</div>)
					})	
				}
				<Row className="checkout_footer">
					<Col s={10}>
						<b>Total</b>
					</Col>
					<Col s={2}>
						${parseFloat(amount).toFixed(2)}
					</Col>
				</Row>
				<Row>
					<Col s={12}>
						<Button onClick={_self.Checkout.bind(_self)}>Place Item</Button>
					</Col>
				</Row>	
			
			</div>
		)
	}
	editQuantity(id,condition,e){
		var cartItem = this.state.cartItem;
		
		if(condition=='add'){
			for(var i = 0; i<cartItem.length; i++){
				if(cartItem[i]. id == id){
				   cartItem[i].quantity = cartItem[i].quantity + 1; 
				   //jsonArray.splice(i, 1);
				}
			}
		}else{
			for(var i = 0; i<cartItem.length; i++){
				if(cartItem[i]. id == id){
					if(cartItem[i].quantity == 1){
						cartItem.splice(i, 1);
					}else{
						cartItem[i].quantity = cartItem[i].quantity - 1; 				   
					}
				   
				}
			}
		}
		this.setState({cartItem:cartItem});
	}
	Checkout(){
		this.props.onClose();
	}
   render() {
	   const {data,cartItem} = this.state;
	   
      return (
			<div className="item-container-main-checkout">
				{this.displayContent()}
			</div>
		)
   }
}
export default ProductCheckout;