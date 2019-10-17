import React from 'react';
import Navbar from '../common/Navbar.jsx';
export default class Home extends React.Component {
	constructor(props) {
		super(props)

	  }
   render() {
      return (
         <div className="home-container">
			<Navbar/>
            <h6>Assignment</h6>
			<p>
			1. Refer this site theme with HTML to use in your React JS development.<br/>

			<a href="https://demo.kaliumtheme.com/shop/shop/?shop-catalog-mode=yes" target="_blank">https://demo.kaliumtheme.com/shop/shop/?shop-catalog-mode=yes</a><br/>

			Use above HTML markup and along with provided css, create React JS reusable components and also break all those into components.<br/>

			2. Each product click should go to product detail page with all the details shown in the page.<br/>

			e.g <a href="https://demo.kaliumtheme.com/shop/product/analog-clock/" target="_blank">https://demo.kaliumtheme.com/shop/product/analog-clock/</a><br/>


			3. Make sure to any public API data to call and integrate with HTML to render on any other Dummy Link you provide on top menu<br/>
   
			a. List of users data [ <a href="https://reqres.in/" target="_blank">https://reqres.in/</a> ] <br/>
				<a href="https://reqres.in/api/users?page=2" target="_blank">https://reqres.in/api/users?page=2</a> <br/>

			b.   <a href="https://jsonplaceholder.typicode.com/" target="_blank">https://jsonplaceholder.typicode.com/</a> <br/>
			API data of post content to use: <a href="https://jsonplaceholder.typicode.com/posts" target="_blank">https://jsonplaceholder.typicode.com/posts</a> <br/>



			Note: You need to use above sample demo kaliutheme HTML content and show list of products of your own [ Not from any of the API ] <br/>
					You need to one more menu link in last to another page where you will call sample Post content API and User content API to render the data.


			</p>
         </div>
      )
   }
}