import React, { Component, PropTypes } from 'react'

export default class Emp extends Component {
   render() {
      return (
	  	 <tr>
			<td>{this.props.empid}</td>
			<td>{this.props.name}</td>
			<td>{this.props.email}</td>
		</tr>
      )
   }
}