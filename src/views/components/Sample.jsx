import React from 'react';
import Navbar from '../common/Navbar.jsx';

class Sample extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: 
         [
            {
               "id":1,
               "name":"Foo",
               "age":"20"
            },
            {
               "id":2,
               "name":"Bar",
               "age":"30"
            },
            {
               "id":3,
               "name":"Baz",
               "age":"40"
            }
         ],
		 dataNumber: 0,
		 updateState: 'Initial State data...',
		 updateStateProps: 'Initial Props data...',
		 refdata:''
      }
	  this.setNewNumber = this.setNewNumber.bind(this);
	  this.updateState = this.updateState.bind(this);
	  this.updateStateProps = this.updateStateProps.bind(this);
	  this.updateRefState = this.updateRefState.bind(this);
	  this.clearInput = this.clearInput.bind(this);
   }
   
   setNewNumber() {
      this.setState({dataNumber: this.state.dataNumber + 1})
   }
   updateState(e) {
      this.setState({updateState: e.target.value});
   }
   updateStateProps(e) {
      this.setState({updateStateProps: e.target.value});
   }
   updateRefState(e) {
      this.setState({refdata: e.target.value});
   }
   clearInput() {
      this.setState({refdata: ''});
      ReactDOM.findDOMNode(this.refs.myInput).focus();
   }
   render() {
      return (
         <div>
			<Navbar/>
            <Header/>
			<h3>Array: {this.props.propArray}</h3>
            <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
            <h3>Func: {this.props.propFunc(3)}</h3>
            <h3>Number: {this.props.propNumber}</h3>
            <h3>String: {this.props.propString}</h3>
            <h3>Object: {this.props.propObject.objectName1}</h3>
            <h3>Object: {this.props.propObject.objectName2}</h3>
            <h3>Object: {this.props.propObject.objectName3}</h3>
			<div>
				<button onClick = {this.setNewNumber}>INCREMENT</button>
				<Content myNumber = {this.state.dataNumber} myDataProp = {this.state.updateStateProps} updateStateProp = {this.updateStateProps}></Content>
			</div>
			<div>
				<input type = "text" value = {this.state.updateState} onChange = {this.updateState} />
				<h4>{this.state.updateState}</h4>
			</div>
			<div>
				<input value = {this.state.refdata} onChange = {this.updateRefState} ref = "myInput"></input>
				<button onClick = {this.clearInput}>CLEAR</button>
				<h4>{this.state.refdata}</h4>
			 </div>
            <table>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
         </div>
      );
   }
}
{/*
Sample.propTypes = {
   propArray: React.PropTypes.array.isRequired,
   propBool: React.PropTypes.bool.isRequired,
   propFunc: React.PropTypes.func,
   propNumber: React.PropTypes.number,
   propString: React.PropTypes.string,
   propObject: React.PropTypes.object
}
*/}
Sample.defaultProps = {
   propArray: [1,2,3,4,5],
   propBool: true,
   propFunc: function(e){return e},
   propNumber: 1,
   propString: "String value...",
   
   propObject: {
      objectName1:"objectValue1",
      objectName2: "objectValue2",
      objectName3: "objectValue3"
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}
class TableRow extends React.Component {
   render() {
      return (
         <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
         </tr>
      );
   }
}
class Content extends React.Component {
   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }
   componentDidMount() {
      console.log('Component DID MOUNT!')
   }
   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }
   shouldComponentUpdate(newProps, newState) {
      return true;
   }
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }
   render() {
      return (
         <div>
            <h3>{this.props.myNumber}</h3>
			<div>
				<input type = "text" value = {this.props.myDataProp} onChange = {this.props.updateStateProp} />
				<h3>{this.props.myDataProp}</h3>
			</div>
         </div>
      );
   }
}
export default Sample;