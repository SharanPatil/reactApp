import React from 'react';
import Navbar from '../common/Navbar.jsx';
import ProductList from '../../assets/json/products.json';
import ProductAddToCart from '../common/ProductAddToCart.jsx';
import ProductCheckout from '../common/ProductCheckout.jsx';

import {
  Row,
  Col,
  Button,
  Input,
  checkbox,
  Icon
} from 'react-materialize';
import {Modal, ModalManager, Effect} from 'react-dynamic-modal';
var style = {
  content: {
		position: 'absolute',
		margin: 'auto',
		maxWidth: '55%',
		minWidth: '275px',
		width: '55%',
		maxHeight: 'max-content',
		height: 'auto',
		fontSize: '14px',
		fontFamily: 'Open Sans',
		border: '0',
		borderRadius: '0',
		padding: '0',
		top: '100px',
		right: '0',
		left: '0',
		bottom: '0'
  }
}

class Product extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      product_list: ProductList.data,
      show: false,
	  addToCart:false,
	  selectedProduct:{},
	  cartItem:[],
	  Checkout:false,
	  errorMessege: false,
      statusMessage: "Response from server is none entered deta",
      successRedirect: false,
	  statusMessageClass: "",
      statusMessageClassImg: "",
	  CheckoutBtn:false
    }
  }
	componentDidMount() {
		var _self = this;
		
	}
	displayProductContent() {
    var _self = this;

    return (<div>
        <div className="container-main">
          <Row>
            {
              this.state.product_list.map(function(item, key) {
                return (<Col s={2} className="product_card" key={item.id}>
                  <img src={item.images[0]} alt="image_card"/>
                  <div className="content_padding">
                    <p><b>{item.name}</b></p>
					<p>Category: {item.category}</p>
					<p>${parseFloat(item.amount).toFixed(2)}</p>
                    <p className="product_description">{item.description}</p><br/>
						<button type="button" className="read_more" onClick={_self.openModal.bind(_self, item)}>Read more..</button>
                    <Button onClick={_self.AddItem.bind(_self, item)}>Add</Button>
					
                  </div>
                </Col>)
              })
            }
          </Row>
        </div>
    </div>)
  }
  openModal(item, e) {
	ModalManager.open(<div>
      <Modal onRequestClose={ModalManager.close} effect={Effect.ScaleUp} style={style}>
        <Row className="modal-header">
          <Col s={10}>
            <h5>{item.name}</h5>
          </Col>
          <Col s={2}>
            <div onClick={ModalManager.close} className="modal-close">
              <Icon>close</Icon>
            </div>
          </Col>
        </Row>
        <div className="modal-body">
        <Row>
          <Col s={12}>
            {item.description}
          </Col>
        </Row>
        </div>
  		    <Row className="modal-footer">
            <Col s={12}>
  			       <span onClick={ModalManager.close}><Button>Close</Button></span>
            </Col>
          </Row>
      </Modal>
    </div>)
  }
  AddItem(item,e){
	  var _self = this;
		_self.setState({selectedProduct: item,addToCart:true,successRedirect: false,errorMessege: false});
		console.log("Add Item::",item);	  
  }
  onClose(item){
	  var _self = this;
	  var cartItem = _self.state.cartItem;
	  var count = 0;
	  for(var i = 0; i<cartItem.length; i++){
			if(cartItem[i]. id == item.id && cartItem[i]. color == item.color){
			   count = 1;
			   cartItem[i].quantity = parseInt(item.quantity);
			}
		}
	  if(count==0){
		cartItem.push({
			'id':parseInt(item.id),
			'color':item.color,
			'quantity':parseInt(item.quantity)
		});  
	  }else{
		cartItem = cartItem;  
	  }
	  console.log("cartItem::",cartItem);
	  _self.setState({CheckoutBtn:true,cartItem:cartItem,addToCart:false,successRedirect: true, statusMessageClass: "success-status-messege__container", statusMessageClassImg: "success-icon", statusMessage: "Successfully added new item."});

  }
  displayStatusMessege() {

    return (<div className={this.state.statusMessageClass}>
      <span className={this.state.statusMessageClassImg}></span>&nbsp;&nbsp;<span>{this.state.statusMessage}</span>
		  {
			  this.state.statusMessageClassImg=="success-icon" && this.state.CheckoutBtn &&
			  <Button onClick={this.Checkout.bind(this)}>Checkout</Button>
		  }
    </div>)

  }
  Checkout(){
	var _self = this;  
	_self.setState({Checkout:true,successRedirect: false,errorMessege: false});  
  }
  onCloseCheckout(data){
	  var _self = this;
	  if(data.length>0){
	  console.log("Placed Items from cart:",data);
	  _self.setState({cartItem:[],addToCart:false,CheckoutBtn:false,Checkout:false,successRedirect: true, statusMessageClass: "success-status-messege__container", statusMessageClassImg: "success-icon", statusMessage: "Successfully placed item."});
	  }else{
		_self.setState({cartItem:[],addToCart:false,CheckoutBtn:false,Checkout:false});  
	  }
  }
   render() {
	   const {addToCart,selectedProduct,product_list,cartItem,errorMessege, successRedirect,Checkout} = this.state;
	   return (
         <div className="product">
			<Navbar/>
            {/*<h1>Product...</h1>*/}
			{errorMessege && !this.state.successRedirect && this.displayStatusMessege()}
			{this.state.successRedirect && this.displayStatusMessege()}
			
			{!addToCart && !Checkout && this.displayProductContent()}
			{addToCart && !Checkout && <ProductAddToCart data={selectedProduct} cartItem={cartItem} onClose={this.onClose.bind(this)}/>}
			{!addToCart && Checkout && <ProductCheckout data={product_list} cartItem={cartItem} onClose={this.onCloseCheckout.bind(this)}/>}
         </div>
      )
   }
}
export default Product;