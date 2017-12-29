import { Template } from 'meteor/templating';

Router.route('/courses', function() {
	this.render('courses');
});

Template.courses.onCreated(function() {

});

Template.courses.onRendered(function() {

});

Template.courses.events({});

Template.courses.helpers({});
