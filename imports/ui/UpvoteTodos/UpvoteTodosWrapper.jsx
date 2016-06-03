import React,{Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {UpvoteTodos} from '../../api/upvotetodo';
import { Grid,Row,Col,ListGroup,ListGroupItem } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
//components
import UpvoteTodosForm from './UpvoteTodosForm.jsx';
import Todo from './Todo.jsx';

export default class UpvoteTodosWrapper extends Component{
	constructor(){
		super();
		this.state={
			focused:"none"
		}
	}
	handleFocus(todo){
		//if same todo was clicked, clear focus
		if(todo._id == this.state.focused){
			this.setState({focused:"none"});
		}else{
			//if not set the focus
			this.setState({focused:todo._id});
		}
	}
	renderIncompleteTodo(){
		return this.props.upvotetodo.map((todo) =>{
			if(!todo.completed) return <Todo key={todo._id} todo={todo} handleFocus={this.handleFocus.bind(this)} focused={this.state.focused}/>
		});
	}
	renderCompletedTodo(){
		return _.sortBy(this.props.upvotetodo,'completedAt').map((todo) =>{
			if(todo.completed) return <Todo key={todo._id} todo={todo} handleFocus={this.handleFocus.bind(this)} focused={this.state.focused}/>
		});
	}
	render(){
		return(
			<div className="">
					<div className="text-center todo-title">
						<h2 className="todo-title-text">
							{(this.props.currentUser) ?	`Upvote Todos:${this.props.completed}` :'Welcome To Upvote-Todos'}
						</h2>
					</div>
				{(this.props.currentUser) ?
					<Grid>
						<Row>
							<Col md={6}>
								<ListGroup className="todo-group">
									<ListGroupItem>
										<UpvoteTodosForm />
									</ListGroupItem>
									<ReactCSSTransitionGroup
										transitionName="task"
										transitionEnterTimeout={400}
										transitionLeaveTimeout={400}
									>
									{this.renderIncompleteTodo()}
									</ReactCSSTransitionGroup>
								</ListGroup>
							</Col>
							<Col md={6}>
								<ListGroup className="todo-group">
									<ListGroupItem className="text-center">
										<h4 className="completed-todo-title">Completed</h4>
									</ListGroupItem>	
									{this.renderCompletedTodo()}
								</ListGroup>							
							</Col>
						</Row>
					</Grid>
				: ''}
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('test');
	return{
		upvotetodo:UpvoteTodos.find({},{sort:{createdAt:-1,completedAt:-1}}).fetch(),
		completed:UpvoteTodos.find({completed:true}).count(),
		currentUser: Meteor.user(),
	};
},UpvoteTodosWrapper);