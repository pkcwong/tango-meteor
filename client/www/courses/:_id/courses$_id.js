import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

const jsdiff = require('diff');

Router.route('/courses/:_id', function() {
	this.render('courses$_id', {
		data: {
			_id: this.params['_id']
		}
	});
});

Template.courses$_id.onCreated(function() {
	this.data['course'] = {
		trim: new ReactiveVar('')
	};
	this.data['checkout'] = {
		added: new ReactiveVar(0),
		removed: new ReactiveVar(0)
	};
});

Template.courses$_id.onRendered(function() {
	$("#id_courses\\$_id_segment_trim").popup({
		popup: $("#id_courses\\$_id_popup_checkout"),
		on: 'hover'
	});
	$("#id_courses\\$_id_input_document").val(this.data['_id']);
	if (this.data['_id'] !== '0') {
		$("#id_courses\\$_id_segment_raw").addClass('loading');
		$("#id_courses\\$_id_segment_trim").addClass('loading');
		$("#id_courses\\$_id_segment_fields").addClass('loading');
		Meteor.call('course', {
			method: 'query',
			params: {
				_id: this.data['_id']
			}
		}, (err, res) => {
			if (res) {
				this.data['course']['trim'].set(res['trim']);
				$("#id_courses\\$_id_input_url").val(res['url']);
				$("#id_courses\\$_id_input_programmeTitle").val(res['programmeTitle']);
				$("#id_courses\\$_id_input_institute").val(res['institute']);
				$("#id_courses\\$_id_input_applicationDeadline").val(res['applicationDeadline']);
				$("#id_courses\\$_id_textarea_raw").val(res['raw']);
				$("#id_courses\\$_id_textarea_trim").val(res['trim']);
				$("#id_courses\\$_id_segment_raw").removeClass('loading');
				$("#id_courses\\$_id_segment_trim").removeClass('loading');
				$("#id_courses\\$_id_segment_fields").removeClass('loading');
			} else {
				window.location = '/courses';
			}
		});
	}
});

Template.courses$_id.events({

	'click #id_courses\\$_id_button_fetch': () => {
		if (Meteor.user()) {
			const instance = Template.instance();
			$("#id_courses\\$_id_segment_raw").addClass('loading');
			$("#id_courses\\$_id_segment_trim").addClass('loading');
			Meteor.call('browser', {
				method: 'get',
				params: {
					url: $("#id_courses\\$_id_input_url").val()
				}
			}, (err, res) => {
				if (!err) {
					$("#id_courses\\$_id_textarea_raw").val(res);
					let buffer = document.createElement('div');
					buffer.innerHTML = res;
					{
						let scripts = buffer.getElementsByTagName('script');
						let i = scripts.length;
						while (i--) {
							scripts[i].parentNode.removeChild(scripts[i]);
						}
					}
					{
						let styles = buffer.getElementsByTagName('style');
						let i = styles.length;
						while (i--) {
							styles[i].parentNode.removeChild(styles[i]);
						}
					}
					$("#id_courses\\$_id_textarea_trim").val(jQuery(buffer.innerHTML).text());
					$("#id_courses\\$_id_segment_raw").removeClass('loading');
					$("#id_courses\\$_id_segment_trim").removeClass('loading');
					checkout(instance);
				} else {
					console.error(err);
				}
			});
		} else {
			window.open($("#id_courses\\$_id_input_url").val());
		}
	},

	'input #id_courses\\$_id_textarea_trim': () => {
		checkout(Template.instance());
	},

	'click #id_courses\\$_id_button_push': () => {
		const instance = Template.instance();
		$("#id_courses\\$_id_button_push").addClass('loading');
		if (instance.data['_id'] !== '0') {
			Meteor.call('course', {
				method: 'update',
				params: {
					_id: instance.data['_id'],
					url: $("#id_courses\\$_id_input_url").val(),
					programmeTitle: $("#id_courses\\$_id_input_programmeTitle").val(),
					institute: $("#id_courses\\$_id_input_institute").val(),
					applicationDeadline: $("#id_courses\\$_id_input_applicationDeadline").val(),
					raw: $("#id_courses\\$_id_textarea_raw").val(),
					trim: $("#id_courses\\$_id_textarea_trim").val()
				}
			}, (err, res) => {
				if (!err) {
					window.location = '/courses';
				}
			});
		} else {
			Meteor.call('course', {
				method: 'put',
				params: {
					url: $("#id_courses\\$_id_input_url").val(),
					programmeTitle: $("#id_courses\\$_id_input_programmeTitle").val(),
					institute: $("#id_courses\\$_id_input_institute").val(),
					applicationDeadline: $("#id_courses\\$_id_input_applicationDeadline").val(),
					raw: $("#id_courses\\$_id_textarea_raw").val(),
					trim: $("#id_courses\\$_id_textarea_trim").val()
				}
			}, (err, res) => {
				if (!err) {
					window.location = '/courses';
				}
			});
		}
	},

	'click #id_courses\\$_id_button_delete': () => {
		const instance = Template.instance();
		$("#id_courses\\$_id_button_delete").addClass('loading');
		Meteor.call('course', {
			method: 'delete',
			params: {
				_id: instance.data['_id']
			}
		}, (err, res) => {
			if (!err) {
				window.location = '/courses';
			}
		});
	}

});

Template.courses$_id.helpers({

	'added': () => {
		return Template.instance().data['checkout']['added'].get();
	},

	'removed': () => {
		return Template.instance().data['checkout']['removed'].get();
	}

});

function checkout(instance) {
	let added = 0;
	let removed = 0;
	jsdiff.diffTrimmedLines(instance.data['course']['trim'].get(), $("#id_courses\\$_id_textarea_trim").val()).forEach((item) => {
		if (item['added']) {
			added += item['count'];
		}
		if (item['removed']) {
			removed += item['count'];
		}
	});
	instance.data['checkout']['added'].set(added);
	instance.data['checkout']['removed'].set(removed);
}
