import React from 'react';
import {Link} from 'react-router-dom';

class App extends React.Component {
	selectedLi(lidata,e){
		console.log("setData::",lidata);
		window.localStorage.setItem('selectedLi', lidata);
	}
   render() {
	   var selectedLi = window.localStorage.getItem('selectedLi');
	   console.log("getData::",selectedLi);
      return (
        <div className="top-nav">
			
			<nav className = "navbar" role = "navigation">
				 <div className = "navbar-header">
					<button type = "button" className = "navbar-toggle" 
					   data-toggle = "collapse" data-target = "#navbar-collapse">
					   <span className = "sr-only">Toggle navigation</span>
					   <span className = "icon-bar"></span>
					   <span className = "icon-bar"></span>
					   <span className = "icon-bar"></span>
					</button>
					<a className = "navbar-brand" href = "#">LOGO</a>					
				 </div>
				 <div className = "collapse navbar-collapse" id = "navbar-collapse">
					<ul className = "nav navbar-nav">
					   <li className={selectedLi=='Home'?'active':''}>
						  <Link to="/home" onClick={this.selectedLi.bind(this,'Home')}><span>Home  </span></Link>
						</li>
						<li className={selectedLi=='About'?'active':''}>
						  <Link to="/about" onClick={this.selectedLi.bind(this,'About')}><span>About  </span></Link>
						</li>
						<li className={selectedLi=='Contact'?'active':''}>
						  <Link to="/contact" onClick={this.selectedLi.bind(this,'Contact')}><span>Contact  </span></Link>
						</li>
						<li className={selectedLi=='Sample'?'active':''}>
						  <Link to="/sample" onClick={this.selectedLi.bind(this,'Sample')}><span>Sample  </span></Link>
						</li>
						<li className={selectedLi=='ReduxExample'?'active':''}>
						  <Link to="/ReduxExample" onClick={this.selectedLi.bind(this,'ReduxExample')}><span>ReduxExample  </span></Link>
						</li>
						<li className={selectedLi=='Posts'?'active':''}>
						  <Link to="/Posts" onClick={this.selectedLi.bind(this,'Posts')}><span>Posts  </span></Link>
						</li>
						<li className={selectedLi=='Users'?'active':''}>
						  <Link to="/Users" onClick={this.selectedLi.bind(this,'Users')}><span>Users  </span></Link>
						</li>
					</ul>
				</div>
			</nav>
            {this.props.children}
         </div>
      )
   }
}
export default App;