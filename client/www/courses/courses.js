import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

const lunr = require('lunr');

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
				programmeTitle: 1,
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

Template.courses.events({

	'input #id_courses_input_keyword': () => {
		const instance = Template.instance();
		if ($("#id_courses_input_keyword").val() !== "") {
			let cache = {};
			let buffer = [];
			let indexer = lunr(function() {
				this.ref('_id');
				this.field('trim');
				instance.data['course_db'].get().forEach((item) => {
					this.add(item);
					cache[item['_id']] = item;
				});
			});
			let result = indexer.search($('#id_courses_input_keyword').val());
			result.forEach((item) => {
				buffer.push(cache[item['ref']]);
			});
			instance.data['filtered'].set(buffer);
		} else {
			instance.data['filtered'].set(instance.data['course_db'].get());
		}
	},

	'click #id_courses_button_new': () => {
		window.location = '/courses/0';
	}

});

Template.courses.helpers({

	'filtered': () => {
		return Template.instance().data['filtered'].get();
	}

});
