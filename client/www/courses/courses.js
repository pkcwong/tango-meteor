import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.route('/courses', function() {
	this.render('courses', {
		data: {}
	});
});

Template.courses.onCreated(function() {
	this.data['course_db'] = new ReactiveVar([]);
	this.data['filtered'] = new ReactiveVar([]);
});

Template.courses.onRendered(function() {

});

Template.courses.events({});

Template.courses.helpers({});
