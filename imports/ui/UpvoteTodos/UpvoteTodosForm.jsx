import React,{ Component } from 'react';

export default class UpvoteTodosForm extends Component{
	addTodos(event){
		event.preventDefault();
		text = this.refs.todosText.value;
		
		if(!text){
			return;
		}
		Meteor.call('addTodos',text);
		this.refs.upvoteForm.reset();
	}
	render(){
		return(
			<form ref="upvoteForm" onSubmit={this.addTodos.bind(this)}>
				<fieldset className="form-group">
					<input
					  type="text"
					  ref="todosText"
					   className="form-control"
					   maxLength="25"
					   placeholder="Enter your tasks!"/>
				</fieldset>
			</form>
		);
	}
}