import React, { Component, PropTypes } from 'react'

export default class AddEmp extends Component {
	constructor(props) {
		super(props)

	 }
	handleClick(e) {
		const empid = this.refs.empid.value.trim();
		const name = this.refs.name.value.trim();
		const email = this.refs.email.value.trim();
		this.props.onAddClick(empid,name,email);
		this.refs.empid.value = '';
		this.refs.name.value = '';
		this.refs.email.value = '';
		
	}
   
   render() {
      return (
         <div>
            Employee ID: <input type = 'text' ref = 'empid' />
			Employee Name: <input type = 'text' ref = 'name' />
			Employee Email ID: <input type = 'email' ref = 'email' />
							
            <button className="btn" onClick = {this.handleClick.bind(this)}>
               Add
            </button>
         </div>
      )
   }
   
}