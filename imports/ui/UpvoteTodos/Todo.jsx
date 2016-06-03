import React,{ Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';
//import '/todo.css';
export default class Todo extends Component{
	constructor(){
		super();
	}
	upvoteTodo(){
		Meteor.call('upvoteTodo',this.props.todo);
	}
	deleteTodo(){
		Meteor.call('deleteTodo',this.props.todo);
	}
	updateTodo(){
		Meteor.call('updateTodo',this.props.todo,(err,data)=>{
			let style = (window.innerWidth < 1000) ? 'fixed-top':'growl-bottom-right';
			if(!err && !this.props.todo.completed){
				Bert.alert({
				  title: 'Task Completed',
				  message: `${this.props.todo.text} を完了しました`,
				  type: 'success',
				  style,
				  icon: 'fa-check'
				});
			}
		});
	}
	handleClick(){
		this.props.handleFocus(this.props.todo);
	}
	render(){
		let options = (this.props.todo._id === this.props.focused) ? 
		(<div>
			<div className="todo-select todoDelete" onClick={this.deleteTodo.bind(this)}>
				<span className="todoIcon"><i className="fa fa-times fa-2x" aria-hidden="true"/></span>
			</div>
			<div className="todo-select todoUpvote" onClick={this.upvoteTodo.bind(this)}>
				<span className="todoIcon"><i className="fa fa-arrow-up fa-2x" aria-hidden="true"/></span>
			</div>
		</div>): '';
		return(
			<ListGroupItem className="todo">
				<div className="todo-main" onClick={this.handleClick.bind(this)}>
					<span className="todo-text">{this.props.todo.text}</span>
				</div>
				<div className="todo-select todoCheck" onClick={this.updateTodo.bind(this)}>
					<span className="todoIcon text-center">
						<i className="fa fa-check fa-2x" aria-hidden="true"/>
						<p className="upvoteText">{this.props.todo.upvotes}</p>
					</span>
				</div>
				{options}
			</ListGroupItem>
		);
	}
}