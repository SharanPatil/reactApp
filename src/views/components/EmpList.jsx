import React, { Component, PropTypes } from 'react'
import Emp from './Emp.jsx'

export default class EmpList extends Component {
   render() {
      return (
	  	 <table id="employee" className="table table-striped table-bordered" style={{"width":"100%"}}>
			<thead>
				<tr>
					<th>Employee ID</th>
					<th>Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody>
				{this.props.emps.map(emp =>
				   <Emp
					  key = {emp.empid}
					  {...emp}
				   />
				)}
			</tbody>
		</table>
      )
   }
}