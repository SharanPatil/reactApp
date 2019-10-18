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

class ProductAddToCart extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[],
			cartItem:[],
			quantity: 1,
			color:""
		}
	  }
		componentWillMount(){
			var _self = this;
			var cartItem = this.props.cartItem;
			var data = this.props.data;
			var quantity = 1;
			var color = "";
			for(var i=0;i<cartItem.length;i++){
				if(cartItem[i].id==data.id){
					quantity = cartItem[i].quantity;
					color = cartItem[i].color;
				}
			}
			_self.setState({data:data,cartItem:cartItem,quantity:quantity,color:color});
		}
	  
	  AddItem(){
		  var _self = this;
		  var id = document.getElementById('id').value;
		  var quantity = document.getElementById('quantity').value;
		  var color = document.getElementById('color').value;
		  if(color=='color'){
			  color = '';
		  }else{
			  color = color;
		  }
		  
		  var data = {
			  'id': id,
			  'color': color,
			  'quantity': quantity
		  };
		  
		  console.log('Added ITEM::',data);
		  _self.props.onClose(data);
	  }
	  image_slider(){
		  var _self = this;
		  var images = _self.state.data.images;
		  return(
			<div id="myCarousel" className="carousel slide" data-ride="carousel">
			  <ol className="carousel-indicators">
				{
				  images.map(function(item,key){
					  if(key==0){
						return(
						<li data-target="#myCarousel" data-slide-to={key} className="active" key={key}></li>
					  )  
					  }else{
						return(
						<li data-target="#myCarousel" data-slide-to={key} key={key}></li>
						) 
					  }
					  
				  })
				}
			  </ol>

			  <div className="carousel-inner">
			  {
				  images.map(function(item,key){
					  if(key==0){
						return(
						<div className="item active" key={key}>
						  <img src={item} alt="image_card"/>
						</div>
					  )  
					  }else{
						return(
						<div className="item" key={key}>
						  <img src={item} alt="image_card"/>
						</div>
						) 
					  }
					  
				  })
			  }
			</div>
			  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
				<span className="glyphicon glyphicon-chevron-left"></span>
				<span className="sr-only">Previous</span>
			  </a>
			  <a className="right carousel-control" href="#myCarousel" data-slide="next">
				<span className="glyphicon glyphicon-chevron-right"></span>
				<span className="sr-only">Next</span>
			  </a>
			</div>
		  )
	  }
	  shouldComponentUpdate(nextProps, nextState) {
		if(this.state.data.length !== 0) {
			return (this.state.data !== nextState.data);
		}
		else
		{
			return true
		}
	  }
   render() {
	   const {data,cartItem,quantity,color} = this.state;
	   
      return (
			<div className="item-container-main">
			 	<Row>
					<Col s={6}>
						{/*<img src={data.images[0]} alt="image_card"/>*/}
							{this.image_slider()}
					</Col>
					<Col s={6}>
						<div className="title"><b>{data.name}</b></div>
						<div className="details">{data.details}</div>
						<div className="category"><b>Category: {data.category}</b></div>
						<div className="amount"><b>${parseFloat(data.amount).toFixed(2)}</b></div>
						
						{data.color.length>0 &&
						<div className="color">
							<Row>
								<Col s={6}>
									<b>Color:</b>
								</Col>
								<Col s={6}>
								<select name="color" id="color" required defaultValue={color}>
									<option value="">Select Color</option>
									{
										data.color.map(function(item){
											return(
												<option key={item} value={item}>{item}</option>
											)
										})
										
									}
								</select>
								</Col>
							</Row>
						</div>		
						}
						{data.color.length==0 && <input type="hidden" className="color" id="color" name="color" value="color"/>}
						<div className="quantity_block">
							<Row>
								<Col s={6}>
									<select name="quantity" id="quantity" required defaultValue={quantity}>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</Col>
								<Col s={6}>
									<input type="hidden" className="id" id="id" name="id" value={data.id}/>
									<Button onClick={this.AddItem.bind(this)}>Add to cart</Button>
								</Col>
							</Row>
						</div>
						
					</Col>
				</Row>
				<Row>
					<Col s={12}>
						<Tabs>
							<TabList>
							  <Tab>Description</Tab>
							  <Tab>Additional information</Tab>
							  <Tab>Reviews({data.reviews.user_reviews.length})</Tab>
							</TabList>
						 
							<TabPanel>
							  <p>{data.description}</p>
							</TabPanel>
							<TabPanel>
								{data.additional_information.color && <p>Color: {data.additional_information.color}</p>}
								{data.additional_information.dimensions && <p>Dimensions: {data.additional_information.dimensions}</p>}
								{data.additional_information.materials && <p>Materials: {data.additional_information.materials}</p>}
								{data.additional_information.pages && <p>Pages: {data.additional_information.pages}</p>}
							</TabPanel>
							<TabPanel>
							  	{data.reviews.user_reviews.length==0 && 
									<div>
										<p><h6>Reviews</h6></p>
										<p>{data.reviews.no_reviews}</p>
									</div>
								}
								{data.reviews.user_reviews.length>0 &&
									<div>
										<p><h6>{data.reviews.user_reviews.length} {data.reviews.user_reviews.length>1?'reviews':'review'} for {data.name}</h6></p>
									{
										data.reviews.user_reviews.map(function(item,key){
										return(
											<div className="reviews" key={key}>
												<p><b>{item.user}</b></p>
												<p>{item.date}</p>
												<p>{item.data}</p>
												<hr/>
											</div>
											)
										})
									}
									</div>
								}
							</TabPanel>
						</Tabs>	
						
					</Col>
				</Row>
			</div>
		)
   }
}
export default ProductAddToCart;