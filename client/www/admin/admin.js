import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.route('/admin', function() {
	this.render('admin', {
		data: {}
	});
});

Template.admin.onCreated(function() {
	this.data.user = new ReactiveVar([]);
	Meteor.call('account', {
		method: 'dump',
		role: 'administrator'
	}, (err, res) => {
		this.data.user.set(res);
	});
});

Template.admin.onRendered(function() {

});

Template.admin.events({

});

Template.admin.helpers({
	user: () => {
		return Template.instance().data.user.get();
	}
});
