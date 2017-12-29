import { Meteor } from 'meteor/meteor';
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
	Meteor.call('course', {
		method: 'filter',
		params: {
			query: {},
			projection: {
				_id: 1,
				trim: 1
			}
		}
	}, (err, res) => {
		this.data['course_db'].set(res);
		this.data['filtered'].set(this.data['course_db'].get());
	});
});

Template.courses.onRendered(function() {

});

Template.courses.events({});

Template.courses.helpers({});
