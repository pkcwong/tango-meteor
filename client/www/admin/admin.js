import { Template } from 'meteor/templating';

Router.route('/admin', function() {
	this.render('admin', {
		data: {}
	});
});

Template.admin.onCreated(function() {

});

Template.admin.onRendered(function() {

});

Template.admin.events({});

Template.admin.helpers({});
