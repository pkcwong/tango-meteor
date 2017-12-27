import { Template } from 'meteor/templating';

Router.route('/courses/:_id', function() {
	this.render('courses$_id', {
		data: {
			_id: this.params['_id']
		}
	});
});

Template.courses$_id.onCreated(function() {

});

Template.courses$_id.onRendered(function() {
	$("#id_courses\\$_id_document").val(this.data['_id']);
});

Template.courses$_id.events({

	'click #id_courses\\$_id_fetch': () => {
		Meteor.call('browser', {
			method: 'get',
			params: {
				url: $('#id_courses\\$_id_url').val()
			}
		}, (err, res) => {
			$('#id_courses\\$_id_raw').val(res);
			$('#id_courses\\$_id_trim').val(jQuery(res).text());
		});
	}
});
