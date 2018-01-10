import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.route('/admin', function() {
	this.render('admin', {
		data: {}
	});
});

Template.admin.onCreated(function() {
	$('.ui.modal')
	this.data.user = new ReactiveVar([]);
	Meteor.call('account', {
		method: 'dump',
		role: 'administrator'
	}, (err, res) => {
		this.data.user.set(res);
		if(!this.data.user.get()){
			if(Meteor.user()){
				window.location = "/users/" + Meteor.userId();
			}else{
				window.location = "/";
			}
		};
	});

});

Template.admin.onRendered(function() {
	$("#admin_submit").click(() => {
		Meteor.call('account', {
			method: 'create',
			params: {
				username: $('#admin_userName').val(),
				password: $('#admin_userPassword').val(),
				profile: {
					name: $('#admin_profileName').val()
				}
			},
			role: $('#admin_role').val().toString()
		}, (err, res) => {
			console.log(err);
			window.location = "/admin";
		});
	});
});

Template.admin.events({
	'click #admin_addUser': () => {
		$('#admin_modal').modal('show')
	}
});

Template.admin.helpers({
	user: () => {
		return Template.instance().data.user.get();
	}
});
