import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Router.route('/users/:_id', function() {
	this.render('users$_id', {
		data: {
			_id: this.params['_id']
		}
	});
});

Template.users$_id.onCreated(function() {
	$('.ui.modal')
	$('.button')
	this.targetUser = new ReactiveVar(null);
	if (Meteor.userId() != this.data['_id']) {
		Meteor.call('account', {
			method: 'query',
			params: {
				_id: this.data['_id']
			},
			role: 'administrator'
		}, (err, res) => {
			if (res) {
				this.targetUser.set(res);
			} else {
				window.location = "/users/" + Meteor.userId();
			}
		});
	}
});

Template.users$_id.onRendered(function() {
	Accounts.onLogin(() => {
		if (!this.targetUser.get()) {
			this.targetUser.set(Meteor.user());
		}
	});
	$("#user_submit").click(() => {
		if (Meteor.userId() == this.data['_id']) {
			Accounts.changePassword($('#user_oldPassword').val(), $('#user_newPassword').val());
		} else {
			Meteor.call('account', {
				method: 'setPassword',
				params: {
					_id: this.data['_id'],
					password: $('#user_newPassword').val()
				},
				role: 'administrator'
			}, (err, res) => {
				console.log(err);
				window.location = "/users/" + this.data['_id'];
			});
		}
	});

});

Template.users$_id.onDestroyed(function() {

});

Template.users$_id.events({
	'click #user_changePassword': () => {
		$('#user_modal').modal('show')
	},
	'click #user_delete': () => {
		const instance = Template.instance();
		Meteor.call('account', {
			method: 'remove',
			params: {
				_id: instance.data['_id']
			},
			role: 'administrator'
		}, (err, res) => {
			window.location = "/admin";
		});
	}
});

Template.users$_id.helpers({
	targetUser: () => {
		return Template.instance().targetUser.get();
	},
	hide: () => {
		if (Meteor.userId() == Template.instance().data['_id']) {
			return true;
		} else {
			return false;
		}
	}
});
