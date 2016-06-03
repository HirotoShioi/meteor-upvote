import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const UpvoteTodos = new Mongo.Collection('upvotetodo');

if(Meteor.isServer){
	Meteor.publish('test',function tasksPublication(){
		return UpvoteTodos.find({owner:this.userId});
	});
}
Meteor.methods({
	'addTodos'(text){
		check(text,String);

		UpvoteTodos.insert({
			text,
			createdAt: new Date(),
			upvotes:0,
			completed:false,
			owner:Meteor.userId(),
			username:Meteor.user().username
		});
	},
	'upvoteTodo'(todo){
		check(todo,Object);

		UpvoteTodos.update(todo._id,{
			$inc:{upvotes:1}
		});
	},
	'deleteTodo'(todo){
		check(todo,Object);

		UpvoteTodos.remove(todo._id);
	},
	'updateTodo'(todo){
		check(todo,Object);

		UpvoteTodos.update(todo._id,{
			$set:{completed:!todo.completed,completedAt: new Date()}
		});
	}
});