import React from 'react';
import Navbar from '../common/Navbar.jsx';
import ModalDetails from '../common/ModalDetails.jsx';
import FilterableTable from 'react-filterable-table';
import axios from 'axios';

export default class Posts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[],
			rowData:[],
			modalOpen:false
		}
	  }
	componentDidMount() {	
	  var _self = this;
	  
	  var users_url = "https://jsonplaceholder.typicode.com/users";
		axios.get(users_url, {
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
	ViewUserDetails(rowData, e) {
		var _self = this;
		_self.setState({rowData: rowData,modalOpen:true});

	  }
	modalClose(){
		var _self = this;
		_self.setState({rowData: [],modalOpen:false});  
	}
	render() {
	   const {data, rowData, modalOpen} = this.state;
	   let actions = (props) => {
		  var rowData = props.record;

		  return (<div className="actionBtns">
			<span className="actions_pageview" onClick={this.ViewUserDetails.bind(this, rowData)}>
			  <i className="fa fa-info-circle" title="view_more"></i>
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
			name: 'name',
			displayName: "Name",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'username',
			displayName: "User Name",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'email',
			displayName: "Email",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'phone',
			displayName: "Phone",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'website',
			displayName: "Website",
			inputFilterable: true,
			exactFilterable: false,
			sortable: true
		  }, {
			name: 'Actions',
			displayName: "Actions",
			render: actions
		  }

		];
	
      return (
         <div className="users">
		 <Navbar/>
            {/*<h1>Users...</h1>*/}
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
			{modalOpen && <ModalDetails title ='User Details' data = {rowData} modalClose={this.modalClose.bind(this)}/>}
         </div>
      )
   }
}