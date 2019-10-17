import React from 'react';
import axios from 'axios';
import {Modal, ModalManager, Effect} from 'react-dynamic-modal';
import {
  Row,
  Col,
  Button,
  Input,
  checkbox,
  Icon,
  CollapsibleItem,
  Collapsible,
  SideNav,
  SideNavItem
} from 'react-materialize';

const style = {
  content: {
    position: 'relative',
    margin: '10% auto',
		maxWidth: '75%',
		minWidth: '49rem',
		width: '75%',
		maxHeight: 'max-content',
		height: 'auto',
		fontSize: '14px',
		fontFamily: 'Open Sans',
		border: '0',
		borderRadius: '0',
		padding: '0',
		top: '0',
		right: '0',
		left: '0',
		bottom: '0'
  }
}

class PostAddDetails extends React.Component {
	constructor(props) {
		super(props)
		
	  }
	  modalClose(){
		ModalManager.close;	
		var json = {};		
		this.props.modalAddClose(json);
	  }
	  addPost(e){
			//ModalManager.close();
			//e.preventDefault();
			var _self = this;
			var title = document.getElementById("title").value;
			var body = document.getElementById("body").value;
			var userid = document.getElementById("id").value;
			
			console.log("userid:",userid,":Title:",title,":Body:",body);
			var data = {
				'userid': userid,
				'title':title,
				'body':body
			};
			this.props.modalAddClose(data);
		ModalManager.close;		
		
	  }
   render() {
	  
      return (
         <div className="modal-details">
		 ModalManager.open(<div className="detail-modal">
			  <Modal onRequestClose={this.modalClose.bind(this)} effect={Effect.ScaleUp} style={style}>
				<Row className="modal-header">
				  <Col s={10}>
					<h5>Post Details</h5>
				  </Col>
				  <Col s={2}>
					<div onClick={this.modalClose.bind(this)} className="modal-close">
					  <Icon>close</Icon>
					</div>
				  </Col>
				</Row>
				<div className="modal-body">
				<Row>
				  <Col s={12}>
					  <Row>
						  <Col s={3}>
							<b>Title:</b>
						  </Col>
						  <Col s={9}>
							<textarea name="title" id="title" placeholder="Title " rows="5"></textarea>
                    
						  </Col>
						</Row>
						<Row>
						  <Col s={3}>
							<b>Body:</b>
						  </Col>
						  <Col s={9}>
							<textarea name="body" id="body" placeholder="Body " rows="5"></textarea>
                    
						  </Col>
						</Row>						
				  </Col>
				</Row>
				</div>
				<Row className="modal-footer">
				  <Col s={12}>
					<input type="hidden" id="id" name="id" value='1'/>
					<span><Button onClick={this.addPost.bind(this)}>Add</Button></span>
					<span onClick={this.modalClose.bind(this)}><Button>Close</Button></span>
				  </Col>
				</Row>
			  </Modal>
			</div>
      );
	  
         </div>)
   }
}
export default PostAddDetails;