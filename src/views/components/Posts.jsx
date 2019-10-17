import React from 'react';
import Navbar from '../common/Navbar.jsx';
import ModalDetails from '../common/ModalDetails.jsx';
import PostEditDetails from '../common/PostEditDetails.jsx';
import PostAddDetails from '../common/PostAddDetails.jsx';
import FilterableTable from 'react-filterable-table';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';

export default class Posts extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			data:[],
			rowData:[],
			modalOpen:false,
			editModalOpen:false,
			show:false,
			errorMessege: false,
			statusMessage: "Response from server is none entered deta",
			successRedirect: false,
			statusMessageClass: "",
			statusMessageClassImg: "",
			addPost:false
		}
	  }

	componentDidMount() {	
	  var _self = this;
	  
	  var posts_url = "https://jsonplaceholder.typicode.com/posts";
		axios.get(posts_url, {
		  headers: {
			'Content-Type': 'application/*'
		  }
		}).then(function(response) {
		  var result = response.data;

		  _self.setState({data: result});

		});
	
	}
	componentDidUpdate(prevProps, prevState) {
		var _self = this;
		if (document.querySelector(".table") != null) {
			document.getElementsByClassName('filter-input')[0].placeholder = 'Search';
			document.querySelector(".table").setAttribute("id", "table");
		}
	}
	ViewPostDetails(rowData, e) {
		var _self = this;
		_self.setState({rowData: rowData,modalOpen:true, editModalOpen:false, successRedirect: false, errorMessege:false});

	  }
	  EditPostDetails(rowData, e) {
		var _self = this;
		_self.setState({rowData: rowData, modalOpen:false, editModalOpen:true, successRedirect: false, errorMessege:false});
		console.log('AAAAAAAAAAA');
	  }
	modalClose(){
		var _self = this;
		/*
		var posts_url = "https://jsonplaceholder.typicode.com/posts";
		axios.get(posts_url, {
		  headers: {
			'Content-Type': 'application/*'
		  }
		}).then(function(response) {
		  var result = response.data;
		  _self.setState({data:result,rowData: [],modalOpen:false, editModalOpen:false});
		});
		  */
		_self.setState({rowData: [],modalOpen:false, editModalOpen:false});
	}
	editModalClose(data){
		var _self = this;
		console.log('DATA:',data);
		
		var posts_url = "https://jsonplaceholder.typicode.com/posts";
		axios.get(posts_url, {
		  headers: {
			'Content-Type': 'application/*'
		  }
		}).then(function(response) {
		  var result = _self.state.data;
		  
		  if(response.status == 200){
			  
			for(var i = 0; i<result.length; i++){
				if(result[i]. id == data.id){
				   result[i].title = data.title;
				   result[i].body = data.body;
				}
			}
			_self.setState({data:result,rowData: [],modalOpen:false, editModalOpen:false,successRedirect: true, statusMessageClass: "success-status-messege__container", statusMessageClassImg: "success-icon", statusMessage: "Successfully edited post."});  
		  }	  
		  
		});
		  
	}
	deletePost(id){
		var _self = this;
		var postId = id;
		console.log('postId:',postId);
		var jsonArray = _self.state.data;
		/*
		var posts_url = "https://jsonplaceholder.typicode.com/posts/"+postId;
		axios.delete(posts_url, {
		  headers: {
			'Content-Type': 'application/*'
		  }
		}).then(function(response) {
			console.log('response:',response);
		  if(response.status == 200){
			for(var i = 0; i<jsonArray.length; i++){
				if(jsonArray[i]. id == postId){
				   jsonArray.splice(i, 1);
				}
			}
			_self.setState({data:jsonArray});  
		  }
		});
		*/
		fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
		  method: 'DELETE'
		}).then(response => {console.log(response);
		if(response.status == 200){
			for(var i = 0; i<jsonArray.length; i++){
				if(jsonArray[i]. id == postId){
				   jsonArray.splice(i, 1);
				}
			}
			_self.setState({data:jsonArray,successRedirect: true, statusMessageClass: "success-status-messege__container", statusMessageClassImg: "success-icon", statusMessage: "Successfully deleted post."});  
		  }
		})
	}
	AddPostDetails(){
		var _self = this;
		_self.setState({addPost:true});
		
	}
	addModalClose(data){
		var _self = this;
		var jsonArray = _self.state.data;
		if(data){
			/*	
		var posts_url = "https://jsonplaceholder.typicode.com/posts";
			axios.post(posts_url, 
			data
			,{
			  headers: {
				'Content-Type': 'application/*'
			  }
			}).then(function(response) {
				console.log('response:',response);
			});	
			*/
			fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
				  "Content-type": "application/json; charset=UTF-8"
				}
			  })
			  .then(response => response.json())
			  .then(json => {console.log(json);
				jsonArray.push(json);
				
				_self.setState({addPost:false,data:jsonArray,successRedirect: true, statusMessageClass: "success-status-messege__container", statusMessageClassImg: "success-icon", statusMessage: "Successfully added item."});
			  })
		}else{
			_self.setState({addPost:false});
			  
		}
	}
	displayStatusMessege() {

    return (<div className={this.state.statusMessageClass}>
      <span className={this.state.statusMessageClassImg}></span>&nbsp;&nbsp;<span>{this.state.statusMessage}</span>
    </div>)

  }
	render() {
	   const {data, rowData, modalOpen, editModalOpen,errorMessege, successRedirect,addPost} = this.state;
	   let actions = (props) => {
		  var rowData = props.record;

		  return (<div className="actionBtns">
			
			<span className="actions_pageview" onClick={this.ViewPostDetails.bind(this, rowData)}>
			  <i className="fa fa-info-circle" title="view_more"></i>
			</span>
			<span className="actions_mode_edit" onClick={this.EditPostDetails.bind(this, rowData)}>
			  <i className="fa fa-pencil" title="edit"></i>
			</span>
			<span className="actions_delete" onClick={() => {
            this.setState({show: true, rowData: rowData,successRedirect: false, errorMessege:false})
          }}>
			  <i className="fa fa-trash-o" title="delete"></i>
			</span>
		  </div>);
		};
	   let fields = [
		  {
			name: 'id',
			displayName: "ID",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'title',
			displayName: "Title",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'body',
			displayName: "Description",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'Actions',
			displayName: "Actions",
			render: actions
		  }

		];
	var msg="Do you want to delete Post: "+this.state.rowData.title+" from record?";
      return (
         <div className="posts">
		 <Navbar/>
		 <SweetAlert 
			show={this.state.show} 
			title="" text={msg} 
			showCancelButton={true} 
			onConfirm={() => {
				this.deletePost(this.state.rowData.id);
				this.setState({show: false});
			}} 
			onCancel={() => {
				this.setState({show: false});
			}} 
			onEscapeKey={() => this.setState({show: false})} 
			onOutsideClick={() => this.setState({show: false})}
			/>
            {/*<h1>Posts...</h1>*/}
			{errorMessege && !this.state.successRedirect && this.displayStatusMessege()}
			{this.state.successRedirect && this.displayStatusMessege()}
			
			<div className="add_post"><button className='btn' onClick={this.AddPostDetails.bind(this)}>Add</button></div>
			<FilterableTable
			  namespace="Data"
			  initialSort="id"
			  data={data}
			  fields={fields}
			  pageSize={10}
			  pageSizes={[10, 20, 30, 50, 100, 200]}
			  bottomPagerVisible={true}
			  topPagerVisible={false}
			  roRecordsMessage="There are no Data to display"
			  noFilteredRecordsMessage="No Data match your filters!"
			/>
			{modalOpen && <ModalDetails title ='Post Details' data = {rowData} modalClose={this.modalClose.bind(this)}/>}
			{editModalOpen && <PostEditDetails title ='Post Edit Details' data = {rowData} modalClose={this.editModalClose.bind(this)}/>}
				{addPost && <PostAddDetails title ='Post Add Details' modalAddClose={this.addModalClose.bind(this)}/>}
         </div>
      )
   }
}