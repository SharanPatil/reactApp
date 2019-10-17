import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
	constructor(props) {
		super(props)

	 }
	handleClick(e) {
		const node = this.refs.input
		const text = node.value.trim()
		this.props.onAddClick(text)
		node.value = ''
	}
   
   render() {
      return (
         <div>
            <input type = 'text' ref = 'input' />
				
            <button onClick = {this.handleClick.bind(this)}>
               Add
            </button>
         </div>
      )
   }
   
}