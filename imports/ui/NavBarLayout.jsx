import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import React,{Component} from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NavbarLayout extends Component{
	render(){
		return(
		  <Navbar inverse>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">Upvote-Todos</a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} href="#"><AccountsUIWrapper /></NavItem>
		        <NavItem eventKey={2} href="#">Link</NavItem>
		      </Nav>
		      <Nav pullRight>
		        <NavItem eventKey={2} href="#">About</NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		);
	}
} 
