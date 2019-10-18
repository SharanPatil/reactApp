import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEmployee } from './actions/actions'
import Navbar from '../common/Navbar.jsx';

import AddEmp from './AddEmp.jsx';
import EmpList from './EmpList.jsx';

class EmployeeList extends Component {
   render() {
      const { dispatch, visibleEmps } = this.props
      
      return (
         <div>
		 <Navbar/>
			<div className="redux_example">
				<AddEmp onAddClick = {(empid,name,email) => dispatch(addEmployee(empid,name,email))} />
				<EmpList emps = {visibleEmps}/>
			</div>
         </div>
      )
   }
}
function select(state) {
   return {
      visibleEmps: state.emps
   }
}
export default connect(select)(EmployeeList);