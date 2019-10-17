import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './actions/actions'
import Navbar from '../common/Navbar.jsx';

import AddTodo from './AddTodo.jsx';
import TodoList from './TodoList.jsx';

class ReduxExample extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props
      
      return (
         <div>
		 <Navbar/>
			<div className="redux_example">
				<AddTodo onAddClick = {text =>dispatch(addTodo(text))} />
				<TodoList todos = {visibleTodos}/>
			</div>
         </div>
      )
   }
}
function select(state) {
   return {
      visibleTodos: state.todos
   }
}
export default connect(select)(ReduxExample);