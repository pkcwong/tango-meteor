import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Router.route('/courses/:_id', function() {
	this.render('courses$_id', {
		data: {
			_id: this.params['_id']
		}
	});
});

Template.courses$_id.onCreated(function() {
	this.words = new ReactiveVar([]);
});

Template.courses$_id.onRendered(function() {
	$("#id_courses\\$_id_document").val(this.data['_id']);
});

Template.courses$_id.events({

	'click #id_courses\\$_id_fetch': () => {

	}
});

Template.courses$_id.helpers({

	fetch: () => {
		return Template.instance().words.get();
	}

});
