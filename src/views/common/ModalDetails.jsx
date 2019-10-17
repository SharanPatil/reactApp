import React from 'react';

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

class ModalDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:this.props.data,
			title:this.props.title
		}
	  }
	  modalClose(){		
		ModalManager.close;		
		this.props.modalClose();
	  }
	  
   render() {
	   let rowData = this.state.data;
		let title = this.state.title;
	   console.log("rowData:::",rowData);
	   var dispDetails = Object.entries(rowData).map(([key,value])=>{
		  return (
			<Row key = {key}>
			  <Col s={3}>
				<b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b>
			  </Col>
			  <Col s={9}>
				{typeof value !== 'object' && value.toString()}
				{typeof value === 'object' && 
					Object.entries(value).map(([k,v])=>{
						return (
							<span key={k}><b> {k.charAt(0).toUpperCase() + k.slice(1)}: </b> 
							{typeof v !== 'object' && v.toString()} 
							{typeof v === 'object' && 
								Object.entries(v).map(([k1,v1])=>{
									return (
										<span key={k1}><b> {k1.charAt(0).toUpperCase() + k1.slice(1)}: </b>{v1.toString()} </span>
										)
								})
							},  										
							</span>
						)
					})
				}
			  </Col>
			</Row>
		  )
		 });
      return (
         <div className="modal-details">
		 ModalManager.open(<div className="detail-modal">
			  <Modal onRequestClose={this.modalClose.bind(this)} effect={Effect.ScaleUp} style={style}>
				<Row className="modal-header">
				  <Col s={10}>
					<h5>{title}</h5>
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
					  {dispDetails}				
					
				  </Col>
				</Row>
				</div>
				<Row className="modal-footer">
				  <Col s={12}>
					<span onClick={this.modalClose.bind(this)}><Button>Close</Button></span>
				  </Col>
				</Row>
			  </Modal>
			</div>
      );
	  </div>)
   }
}
export default ModalDetails;