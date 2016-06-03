import React,{ Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/todo.css';

//components
import NavBarLayout from './NavBarLayout.jsx';

export const MainLayout = ({content}) => (
	<div className="main-layout">
		<NavBarLayout />
			<div className="content-wrapper">
				{content}
			</div>
	</div>
)