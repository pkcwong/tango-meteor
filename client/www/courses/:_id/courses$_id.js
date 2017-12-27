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
	$("#id_courses\\$_id_input_document").val(this.data['_id']);
});

Template.courses$_id.events({

	'click #id_courses\\$_id_button_fetch': () => {
		$('#id_courses\\$_id_segment_raw').addClass('loading');
		$('#id_courses\\$_id_segment_trim').addClass('loading');
		Meteor.call('browser', {
			method: 'get',
			params: {
				url: $('#id_courses\\$_id_input_url').val()
			}
		}, (err, res) => {
			$('#id_courses\\$_id_textarea_raw').val(res);
			$('#id_courses\\$_id_textarea_trim').val(jQuery(res).remove('script').text());
			$('#id_courses\\$_id_segment_raw').removeClass('loading');
			$('#id_courses\\$_id_segment_trim').removeClass('loading');
		});
	}
});
