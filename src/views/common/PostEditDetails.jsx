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

class PostEditDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:this.props.data
		}
	  }
	  modalClose(){
		var data = this.state.data;
		ModalManager.close;		
		this.props.modalClose(data);
	  }
	  editPost(e){
			//ModalManager.close();
			//e.preventDefault();
			var _self = this;
			var title = document.getElementById("titleEdit").value;
			var body = document.getElementById("bodyEdit").value;
			var id = document.getElementById("IdEdit").value;
			
			console.log("ID:",id,":Title:",title,":Body:",body);
			var data = {
				'id': id,
				'title':title,
				'body':body
			};
			/*
			var posts_url = "https://jsonplaceholder.typicode.com/posts/"+id;
			axios.patch(posts_url, 
			{
				data
			}
			,{
			  headers: {
				'Content-Type': 'application/*'
			  }
			}).then(function(response) {
				console.log('response:',response);
			});
			*/
			fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
				  "Content-type": "application/json; charset=UTF-8"
				}
			  })
			  .then(response => response.json())
			  .then(json => {console.log(json);
				this.props.modalClose(json);
			  })
				
		ModalManager.close;		
		
	  }
   render() {
	   let rowData = this.state.data; 
	   
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
							<textarea name="titleEdit" id="titleEdit" placeholder="Title " rows="5" defaultValue={rowData.title}></textarea>
                    
						  </Col>
						</Row>
						<Row>
						  <Col s={3}>
							<b>Body:</b>
						  </Col>
						  <Col s={9}>
							<textarea name="bodyEdit" id="bodyEdit" placeholder="Body " rows="5" defaultValue={rowData.body}></textarea>
                    
						  </Col>
						</Row>						
				  </Col>
				</Row>
				</div>
				<Row className="modal-footer">
				  <Col s={12}>
					<input type="hidden" id="IdEdit" name="IdEdit" value={rowData.id}/>
					<span><Button onClick={this.editPost.bind(this)}>Update</Button></span>
					<span onClick={this.modalClose.bind(this)}><Button>Close</Button></span>
				  </Col>
				</Row>
			  </Modal>
			</div>
      );
	  
         </div>)
   }
}
export default PostEditDetails;